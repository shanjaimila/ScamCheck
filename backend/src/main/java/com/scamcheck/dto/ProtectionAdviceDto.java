package com.scamcheck.dto;

public class ProtectionAdviceDto {
    private String priority; // HIGH, MEDIUM, LOW
    private String title;
    private String detail;
    private String actionableAction;

    public ProtectionAdviceDto() {}

    public ProtectionAdviceDto(String priority, String title, String detail, String actionableAction) {
        this.priority = priority;
        this.title = title;
        this.detail = detail;
        this.actionableAction = actionableAction;
    }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }

    public String getActionableAction() { return actionableAction; }
    public void setActionableAction(String actionableAction) { this.actionableAction = actionableAction; }
}
