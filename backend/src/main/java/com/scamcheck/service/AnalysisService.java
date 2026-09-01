package com.scamcheck.service;

import com.scamcheck.dto.*;
import com.scamcheck.exception.InvalidRequestException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AnalysisService {

    private final IOCExtractionService iocExtractionService;
    private final ExtractionService extractionService;
    private final WebsiteService websiteService;
    private final RiskService riskService;
    private final ConfidenceService confidenceService;
    private final AttackPathService attackPathService;
    private final ProtectionAdviceService protectionAdviceService;
    private final HistoryService historyService;

    public AnalysisService(
            IOCExtractionService iocExtractionService,
            ExtractionService extractionService,
            WebsiteService websiteService,
            RiskService riskService,
            ConfidenceService confidenceService,
            AttackPathService attackPathService,
            ProtectionAdviceService protectionAdviceService,
            HistoryService historyService) {
        this.iocExtractionService = iocExtractionService;
        this.extractionService = extractionService;
        this.websiteService = websiteService;
        this.riskService = riskService;
        this.confidenceService = confidenceService;
        this.attackPathService = attackPathService;
        this.protectionAdviceService = protectionAdviceService;
        this.historyService = historyService;
    }

    public AnalysisResponse analyze(AnalysisRequest request) {
        if (request == null || request.getText() == null || request.getText().isBlank()) {
            throw new InvalidRequestException("Analysis text must not be empty or blank.");
        }

        String caseId = UUID.randomUUID().toString();
        Instant timestamp = Instant.now();

        // 1. EXTRACTION: IOCs & Opportunity Metadata
        IocCollectionDto iocs = iocExtractionService.extractAll(request.getText(), request.getUrl());
        ExtractedOpportunityDto opportunity = extractionService.extractOpportunity(request.getText(), request.getSender());

        // 2. WEBSITE INTELLIGENCE: Evaluate ALL URLs
        List<String> allUrls = new ArrayList<>();
        for (IocItemDto item : iocs.getUrls()) {
            allUrls.add(item.getValue());
        }
        List<WebsiteIntelligenceDto> websiteIntelligence = websiteService.analyzeWebsites(allUrls);

        // 3. EVIDENCE & ANALYSIS: Risk Indicators
        List<IndicatorDto> indicators = riskService.evaluateIndicators(request, iocs, opportunity, websiteIntelligence);

        // 4. RISK SCORING & CONFIDENCE
        int overallScore = riskService.calculateOverallScore(indicators);
        int confidenceScore = confidenceService.calculateConfidence(request, iocs, websiteIntelligence);
        String riskLevel = riskService.determineRiskLevel(overallScore, confidenceScore);

        // 5. EVIDENCE SUMMARY
        boolean brandMismatch = indicators.stream().anyMatch(i -> i.isFired() && "BRAND_IDENTITY_MISMATCH".equals(i.getCode()));
        boolean senderMismatch = indicators.stream().anyMatch(i -> i.isFired() && "SUSPICIOUS_SENDER".equals(i.getCode()));
        int suspiciousDomains = (int) websiteIntelligence.stream().filter(w -> !w.getTriggers().isEmpty()).count();
        int totalIocs = iocs.getUrls().size() + iocs.getEmails().size() + iocs.getIpv4Addresses().size() + iocs.getSha256Hashes().size();

        EvidenceSummaryDto evidenceSummary = new EvidenceSummaryDto(
                brandMismatch,
                senderMismatch,
                suspiciousDomains,
                totalIocs
        );

        // 6. ATTACK PATH & PROTECTION ADVICE
        List<AttackPathStepDto> attackPath = attackPathService.buildAttackPath(indicators, overallScore);
        List<ProtectionAdviceDto> protectionAdvice = protectionAdviceService.generateAdvice(indicators, overallScore);

        // 7. EXPLAINABLE DTO ASSEMBLY
        AnalysisResponse response = new AnalysisResponse();
        response.setCaseId(caseId);
        response.setTimestamp(timestamp);
        response.setOverallScore(overallScore);
        response.setRiskLevel(riskLevel);
        response.setConfidenceScore(confidenceScore);
        response.setExtractedOpportunity(opportunity);
        response.setIocCollection(iocs);
        response.setIndicators(indicators);
        response.setWebsiteIntelligence(websiteIntelligence);
        response.setEvidenceSummary(evidenceSummary);
        response.setAttackPath(attackPath);
        response.setProtectionAdvice(protectionAdvice);

        // 8. PERSISTENCE
        historyService.saveCase(response, request.getText());

        return response;
    }
}
