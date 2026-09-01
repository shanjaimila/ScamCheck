package com.scamcheck.dto;

import java.util.List;

public class IndicatorDto {
    private String code;
    private String name;
    private String description;
    private String category; // BRAND_IMPERSONATION, FINANCIAL_FRAUD, NETWORK_THREAT, SOCIAL_ENGINEERING, SECURITY_RISK
    private String severity; // HIGH, MEDIUM, LOW
    private int impactScore;
    private boolean fired;
    private List<String> evidenceSnippets;

    public IndicatorDto() {}

    public IndicatorDto(String code, String name, String description, String category, String severity, int impactScore, boolean fired, List<String> evidenceSnippets) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.category = category;
        this.severity = severity;
        this.impactScore = impactScore;
        this.fired = fired;
        this.evidenceSnippets = evidenceSnippets;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public int getImpactScore() { return impactScore; }
    public void setImpactScore(int impactScore) { this.impactScore = impactScore; }

    public boolean isFired() { return fired; }
    public void setFired(boolean fired) { this.fired = fired; }

    public List<String> getEvidenceSnippets() { return evidenceSnippets; }
    public void setEvidenceSnippets(List<String> evidenceSnippets) { this.evidenceSnippets = evidenceSnippets; }
}
