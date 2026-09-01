package com.scamcheck.dto;

import java.time.Instant;
import java.util.List;

public class AnalysisResponse {
    private String caseId;
    private Instant timestamp;
    private int overallScore;
    private String riskLevel;
    private int confidenceScore;
    private ExtractedOpportunityDto extractedOpportunity;
    private IocCollectionDto iocCollection;
    private List<IndicatorDto> indicators;
    private List<WebsiteIntelligenceDto> websiteIntelligence;
    private EvidenceSummaryDto evidenceSummary;
    private List<AttackPathStepDto> attackPath;
    private List<ProtectionAdviceDto> protectionAdvice;

    public AnalysisResponse() {}

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public int getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(int confidenceScore) { this.confidenceScore = confidenceScore; }

    public ExtractedOpportunityDto getExtractedOpportunity() { return extractedOpportunity; }
    public void setExtractedOpportunity(ExtractedOpportunityDto extractedOpportunity) { this.extractedOpportunity = extractedOpportunity; }

    public IocCollectionDto getIocCollection() { return iocCollection; }
    public void setIocCollection(IocCollectionDto iocCollection) { this.iocCollection = iocCollection; }

    public List<IndicatorDto> getIndicators() { return indicators; }
    public void setIndicators(List<IndicatorDto> indicators) { this.indicators = indicators; }

    public List<WebsiteIntelligenceDto> getWebsiteIntelligence() { return websiteIntelligence; }
    public void setWebsiteIntelligence(List<WebsiteIntelligenceDto> websiteIntelligence) { this.websiteIntelligence = websiteIntelligence; }

    public EvidenceSummaryDto getEvidenceSummary() { return evidenceSummary; }
    public void setEvidenceSummary(EvidenceSummaryDto evidenceSummary) { this.evidenceSummary = evidenceSummary; }

    public List<AttackPathStepDto> getAttackPath() { return attackPath; }
    public void setAttackPath(List<AttackPathStepDto> attackPath) { this.attackPath = attackPath; }

    public List<ProtectionAdviceDto> getProtectionAdvice() { return protectionAdvice; }
    public void setProtectionAdvice(List<ProtectionAdviceDto> protectionAdvice) { this.protectionAdvice = protectionAdvice; }
}
