package com.scamcheck.dto;

import java.time.Instant;

public class CaseSummaryDto {
    private String caseId;
    private Instant timestamp;
    private int overallScore;
    private String riskLevel;
    private String summaryText;

    public CaseSummaryDto() {}

    public CaseSummaryDto(String caseId, Instant timestamp, int overallScore, String riskLevel, String summaryText) {
        this.caseId = caseId;
        this.timestamp = timestamp;
        this.overallScore = overallScore;
        this.riskLevel = riskLevel;
        this.summaryText = summaryText;
    }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getSummaryText() { return summaryText; }
    public void setSummaryText(String summaryText) { this.summaryText = summaryText; }
}
