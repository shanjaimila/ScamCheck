package com.scamcheck.dto;

public class AttackPathStepDto {
    private int stepNumber;
    private String stage; // INITIAL_CONTACT, LURE_VERIFICATION, EXPLOITATION_PAYMENT
    private String title;
    private String description;

    public AttackPathStepDto() {}

    public AttackPathStepDto(int stepNumber, String stage, String title, String description) {
        this.stepNumber = stepNumber;
        this.stage = stage;
        this.title = title;
        this.description = description;
    }

    public int getStepNumber() { return stepNumber; }
    public void setStepNumber(int stepNumber) { this.stepNumber = stepNumber; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
