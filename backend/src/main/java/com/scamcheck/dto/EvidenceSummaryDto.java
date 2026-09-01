package com.scamcheck.dto;

public class EvidenceSummaryDto {
    private boolean brandMismatchDetected;
    private boolean senderMismatch;
    private int suspiciousDomainCount;
    private int totalIocCount;

    public EvidenceSummaryDto() {}

    public EvidenceSummaryDto(boolean brandMismatchDetected, boolean senderMismatch, int suspiciousDomainCount, int totalIocCount) {
        this.brandMismatchDetected = brandMismatchDetected;
        this.senderMismatch = senderMismatch;
        this.suspiciousDomainCount = suspiciousDomainCount;
        this.totalIocCount = totalIocCount;
    }

    public boolean isBrandMismatchDetected() { return brandMismatchDetected; }
    public void setBrandMismatchDetected(boolean brandMismatchDetected) { this.brandMismatchDetected = brandMismatchDetected; }

    public boolean isSenderMismatch() { return senderMismatch; }
    public void setSenderMismatch(boolean senderMismatch) { this.senderMismatch = senderMismatch; }

    public int getSuspiciousDomainCount() { return suspiciousDomainCount; }
    public void setSuspiciousDomainCount(int suspiciousDomainCount) { this.suspiciousDomainCount = suspiciousDomainCount; }

    public int getTotalIocCount() { return totalIocCount; }
    public void setTotalIocCount(int totalIocCount) { this.totalIocCount = totalIocCount; }
}
