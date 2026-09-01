package com.scamcheck.dto;

import jakarta.validation.constraints.NotBlank;

public class AnalysisRequest {
    @NotBlank(message = "Analysis text must not be empty")
    private String text;
    private String url;
    private String sender;

    public AnalysisRequest() {}

    public AnalysisRequest(String text, String url, String sender) {
        this.text = text;
        this.url = url;
        this.sender = sender;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
}
