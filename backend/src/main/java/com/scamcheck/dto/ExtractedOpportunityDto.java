package com.scamcheck.dto;

import java.util.List;

public class ExtractedOpportunityDto {
    private String companyName;
    private String recruiterName;
    private String compensation;
    private String upfrontFees;
    private List<String> messagingChannels;

    public ExtractedOpportunityDto() {}

    public ExtractedOpportunityDto(String companyName, String recruiterName, String compensation, String upfrontFees, List<String> messagingChannels) {
        this.companyName = companyName;
        this.recruiterName = recruiterName;
        this.compensation = compensation;
        this.upfrontFees = upfrontFees;
        this.messagingChannels = messagingChannels;
    }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getRecruiterName() { return recruiterName; }
    public void setRecruiterName(String recruiterName) { this.recruiterName = recruiterName; }

    public String getCompensation() { return compensation; }
    public void setCompensation(String compensation) { this.compensation = compensation; }

    public String getUpfrontFees() { return upfrontFees; }
    public void setUpfrontFees(String upfrontFees) { this.upfrontFees = upfrontFees; }

    public List<String> getMessagingChannels() { return messagingChannels; }
    public void setMessagingChannels(List<String> messagingChannels) { this.messagingChannels = messagingChannels; }
}
