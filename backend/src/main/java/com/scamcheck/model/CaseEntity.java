package com.scamcheck.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "cases")
public class CaseEntity {

    @Id
    @Column(name = "case_id", nullable = false, length = 64)
    private String caseId;

    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @Column(name = "overall_score", nullable = false)
    private int overallScore;

    @Column(name = "risk_level", nullable = false)
    private String riskLevel;

    @Lob
    @Column(name = "raw_text", columnDefinition = "CLOB")
    private String rawText;

    @Lob
    @Column(name = "response_json", columnDefinition = "CLOB")
    private String responseJson;

    public CaseEntity() {}

    public CaseEntity(String caseId, Instant timestamp, int overallScore, String riskLevel, String rawText, String responseJson) {
        this.caseId = caseId;
        this.timestamp = timestamp;
        this.overallScore = overallScore;
        this.riskLevel = riskLevel;
        this.rawText = rawText;
        this.responseJson = responseJson;
    }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getRawText() { return rawText; }
    public void setRawText(String rawText) { this.rawText = rawText; }

    public String getResponseJson() { return responseJson; }
    public void setResponseJson(String responseJson) { this.responseJson = responseJson; }
}
