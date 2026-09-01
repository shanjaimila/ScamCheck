package com.scamcheck.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scamcheck.dto.AnalysisResponse;
import com.scamcheck.dto.CaseSummaryDto;
import com.scamcheck.exception.InvalidRequestException;
import com.scamcheck.model.CaseEntity;
import com.scamcheck.repository.CaseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryService {

    private final CaseRepository caseRepository;
    private final ObjectMapper objectMapper;

    public HistoryService(CaseRepository caseRepository, ObjectMapper objectMapper) {
        this.caseRepository = caseRepository;
        this.objectMapper = objectMapper;
    }

    public void saveCase(AnalysisResponse response, String rawText) {
        try {
            String json = objectMapper.writeValueAsString(response);
            CaseEntity entity = new CaseEntity(
                    response.getCaseId(),
                    response.getTimestamp(),
                    response.getOverallScore(),
                    response.getRiskLevel(),
                    rawText,
                    json
            );
            caseRepository.save(entity);
        } catch (Exception e) {
            // Log & rethrow or handle gracefully
            throw new RuntimeException("Failed to persist investigation case history", e);
        }
    }

    public List<CaseSummaryDto> getAllCases() {
        List<CaseEntity> entities = caseRepository.findAllByOrderByTimestampDesc();
        List<CaseSummaryDto> summaries = new ArrayList<>();
        for (CaseEntity entity : entities) {
            String snippet = entity.getRawText();
            if (snippet != null && snippet.length() > 80) {
                snippet = snippet.substring(0, 80) + "...";
            }
            summaries.add(new CaseSummaryDto(
                    entity.getCaseId(),
                    entity.getTimestamp(),
                    entity.getOverallScore(),
                    entity.getRiskLevel(),
                    snippet
            ));
        }
        return summaries;
    }

    public AnalysisResponse getCaseById(String caseId) {
        CaseEntity entity = caseRepository.findById(caseId)
                .orElseThrow(() -> new InvalidRequestException("Case with ID '" + caseId + "' not found"));
        try {
            return objectMapper.readValue(entity.getResponseJson(), AnalysisResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse stored case JSON payload", e);
        }
    }

    public void deleteCase(String caseId) {
        if (!caseRepository.existsById(caseId)) {
            throw new InvalidRequestException("Case with ID '" + caseId + "' not found");
        }
        caseRepository.deleteById(caseId);
    }

    public void clearAllHistory() {
        caseRepository.deleteAll();
    }
}
