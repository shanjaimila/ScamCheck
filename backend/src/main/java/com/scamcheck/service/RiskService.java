package com.scamcheck.service;

import com.scamcheck.dto.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class RiskService {

    private final DomainSimilarityService domainSimilarityService;
    private final WebsiteService websiteService;

    public RiskService(DomainSimilarityService domainSimilarityService, WebsiteService websiteService) {
        this.domainSimilarityService = domainSimilarityService;
        this.websiteService = websiteService;
    }

    public List<IndicatorDto> evaluateIndicators(AnalysisRequest request, IocCollectionDto iocs, ExtractedOpportunityDto opportunity, List<WebsiteIntelligenceDto> websites) {
        List<IndicatorDto> indicators = new ArrayList<>();
        String text = request.getText() != null ? request.getText() : "";
        String lowerText = text.toLowerCase();
        String sender = request.getSender() != null ? request.getSender().toLowerCase() : "";

        // 1. DOMAIN_SIMILARITY (+30)
        List<String> domainEvidence = new ArrayList<>();
        for (IocItemDto item : iocs.getUrls()) {
            String brand = domainSimilarityService.detectImpersonatedBrand(item.getValue());
            if (brand != null) {
                domainEvidence.add("URL '" + item.getValue() + "' impersonates brand '" + brand + "' via typosquatting / lookalike domain.");
            }
        }
        indicators.add(new IndicatorDto(
                "DOMAIN_SIMILARITY",
                "Brand Typosquatting / Domain Impersonation",
                "Lookalike or typo-squatted domain detected targeting a major brand",
                "BRAND_IMPERSONATION",
                "HIGH",
                30,
                !domainEvidence.isEmpty(),
                domainEvidence
        ));

        // 2. UPFRONT_PAYMENT (+35)
        List<String> paymentEvidence = new ArrayList<>();
        if (opportunity.getUpfrontFees() != null && !opportunity.getUpfrontFees().equals("None Detected")) {
            paymentEvidence.add("Demands upfront fee / deposit: " + opportunity.getUpfrontFees());
        }
        if (Pattern.compile("(?i)\\b(registration fee|equipment deposit|training fee|crypto|usdt|bitcoin|wire transfer|zelle|venmo)\\b").matcher(text).find()) {
            paymentEvidence.add("Text contains upfront financial payment / crypto deposit keywords.");
        }
        indicators.add(new IndicatorDto(
                "UPFRONT_PAYMENT",
                "Upfront Payment / Fee Demand",
                "Demands candidate pay advance registration fees, equipment deposits, or crypto transfers",
                "FINANCIAL_FRAUD",
                "HIGH",
                35,
                !paymentEvidence.isEmpty(),
                paymentEvidence
        ));

        // 3. CREDENTIAL_REQUEST (+40)
        List<String> credEvidence = new ArrayList<>();
        if (Pattern.compile("(?i)\\b(password|otp|verification code|ssn|social security|bank pin|credit card|cvv|private key|seed phrase)\\b").matcher(text).find()) {
            credEvidence.add("Requests sensitive credentials, SSN, OTP, or banking PINs.");
        }
        indicators.add(new IndicatorDto(
                "CREDENTIAL_REQUEST",
                "Sensitive Credential / PII Harvest",
                "Asks for passwords, OTPs, Social Security Numbers, or banking details",
                "SECURITY_RISK",
                "HIGH",
                40,
                !credEvidence.isEmpty(),
                credEvidence
        ));

        // 4. SUSPICIOUS_TLD (+15)
        List<String> tldEvidence = new ArrayList<>();
        for (WebsiteIntelligenceDto w : websites) {
            if (websiteService.isSuspiciousTld(w.getTld())) {
                tldEvidence.add("URL host '" + w.getHost() + "' uses suspicious TLD '" + w.getTld() + "'");
            }
        }
        indicators.add(new IndicatorDto(
                "SUSPICIOUS_TLD",
                "High-Risk Top-Level Domain (TLD)",
                "Domain uses TLD often associated with disposable phishing infrastructure (.tk, .xyz, .top, etc.)",
                "NETWORK_THREAT",
                "MEDIUM",
                15,
                !tldEvidence.isEmpty(),
                tldEvidence
        ));

        // 5. IP_HOSTED_URL (+25)
        List<String> ipHostEvidence = new ArrayList<>();
        for (WebsiteIntelligenceDto w : websites) {
            if (websiteService.isIpHost(w.getHost())) {
                ipHostEvidence.add("URL '" + w.getUrl() + "' points directly to IP address '" + w.getHost() + "'");
            }
        }
        if (!iocs.getIpv4Addresses().isEmpty()) {
            for (IocItemDto ip : iocs.getIpv4Addresses()) {
                ipHostEvidence.add("Explicit IPv4 indicator found: " + ip.getValue());
            }
        }
        indicators.add(new IndicatorDto(
                "IP_HOSTED_URL",
                "Raw IP Address Host",
                "URL host uses a raw IPv4 address instead of a registered domain name",
                "NETWORK_THREAT",
                "HIGH",
                25,
                !ipHostEvidence.isEmpty(),
                ipHostEvidence
        ));

        // 6. URL_SHORTENER (+15)
        List<String> shortenerEvidence = new ArrayList<>();
        for (WebsiteIntelligenceDto w : websites) {
            if (websiteService.isUrlShortener(w.getHost())) {
                shortenerEvidence.add("URL '" + w.getUrl() + "' uses shortener service host '" + w.getHost() + "'");
            }
        }
        indicators.add(new IndicatorDto(
                "URL_SHORTENER",
                "URL Shortener Obfuscation",
                "Employs link shortener (e.g. bit.ly, tinyurl) to obscure destination URL",
                "NETWORK_THREAT",
                "MEDIUM",
                15,
                !shortenerEvidence.isEmpty(),
                shortenerEvidence
        ));

        // 7. URGENT_LANGUAGE (+15)
        List<String> urgentEvidence = new ArrayList<>();
        if (Pattern.compile("(?i)\\b(immediate|urgent|act now|expires in|limited time|offer ends|today only|last chance|instant hiring)\\b").matcher(text).find()) {
            urgentEvidence.add("High-pressure high-urgency language detected in communication.");
        }
        indicators.add(new IndicatorDto(
                "URGENT_LANGUAGE",
                "Urgent / High-Pressure Phrasing",
                "Uses coercive time pressure to force rapid victim action before verification",
                "SOCIAL_ENGINEERING",
                "MEDIUM",
                15,
                !urgentEvidence.isEmpty(),
                urgentEvidence
        ));

        // 8. SUSPICIOUS_SENDER (+15)
        List<String> senderEvidence = new ArrayList<>();
        if (!sender.isBlank()) {
            if (sender.contains("@gmail.com") || sender.contains("@yahoo.com") || sender.contains("@hotmail.com")) {
                senderEvidence.add("Sender email '" + sender + "' uses public free Webmail instead of official corporate domain");
            }
        }
        for (IocItemDto email : iocs.getEmails()) {
            if ("SUSPICIOUS".equals(email.getStatus())) {
                senderEvidence.add("Extracted recruiter email '" + email.getValue() + "' uses public free webmail.");
            }
        }
        indicators.add(new IndicatorDto(
                "SUSPICIOUS_SENDER",
                "Unverified Free Webmail Sender",
                "Recruiter uses free webmail (@gmail, @yahoo) while claiming enterprise affiliation",
                "SOCIAL_ENGINEERING",
                "MEDIUM",
                15,
                !senderEvidence.isEmpty(),
                senderEvidence
        ));

        // 9. INSECURE_HTTP (+10)
        List<String> httpEvidence = new ArrayList<>();
        for (WebsiteIntelligenceDto w : websites) {
            if (!w.isIsHttps()) {
                httpEvidence.add("Insecure plain HTTP link found: " + w.getUrl());
            }
        }
        indicators.add(new IndicatorDto(
                "INSECURE_HTTP",
                "Insecure HTTP Protocol",
                "Uses unencrypted HTTP protocol lacking TLS/SSL certificate",
                "SECURITY_RISK",
                "LOW",
                10,
                !httpEvidence.isEmpty(),
                httpEvidence
        ));

        // 10. MESSAGING_APP_CONTACT (+15)
        List<String> msgEvidence = new ArrayList<>();
        if (opportunity.getMessagingChannels() != null) {
            for (String ch : opportunity.getMessagingChannels()) {
                if (Arrays.asList("Telegram", "WhatsApp", "Signal", "Wire").contains(ch)) {
                    msgEvidence.add("Communication exclusively requests off-platform messaging via " + ch);
                }
            }
        }
        indicators.add(new IndicatorDto(
                "MESSAGING_APP_CONTACT",
                "Exclusive Chat Application Routing",
                "Directs candidate off corporate channels into encrypted messaging apps (Telegram/WhatsApp)",
                "SOCIAL_ENGINEERING",
                "MEDIUM",
                15,
                !msgEvidence.isEmpty(),
                msgEvidence
        ));

        // 11. SUSPICIOUS_ATTACHMENT (+20)
        List<String> attachEvidence = new ArrayList<>();
        if (Pattern.compile("(?i)\\b([a-zA-Z0-9_-]+\\.(exe|scr|iso|zip|rar|vbs|bat|ps1|js))\\b").matcher(text).find() ||
            lowerText.contains("download offer letter.exe") || lowerText.contains("invoice.iso") || !iocs.getSha256Hashes().isEmpty()) {
            attachEvidence.add("Mentions executable/archive attachments (.exe, .zip, .iso) or provided SHA-256 payload hash");
        }
        indicators.add(new IndicatorDto(
                "SUSPICIOUS_ATTACHMENT",
                "Potentially Malicious File / Executable Payload",
                "References executable files, disk images, or unknown archive payloads disguised as job offers",
                "SECURITY_RISK",
                "HIGH",
                20,
                !attachEvidence.isEmpty(),
                attachEvidence
        ));

        // 12. BRAND_IDENTITY_MISMATCH (+20)
        List<String> mismatchEvidence = new ArrayList<>();
        String company = opportunity.getCompanyName();
        if (!"Unspecified / Undisclosed Entity".equalsIgnoreCase(company)) {
            String companyCore = company.toLowerCase().replaceAll("[^a-z0-9]", "");
            for (WebsiteIntelligenceDto w : websites) {
                String hostCore = domainSimilarityService.extractDomainCore(w.getHost()).replaceAll("[^a-z0-9]", "");
                if (!hostCore.isBlank() && !companyCore.isBlank() && !hostCore.contains(companyCore) && !companyCore.contains(hostCore)) {
                    // Check if host is not a standard shortener
                    if (!websiteService.isUrlShortener(w.getHost())) {
                        mismatchEvidence.add("Stated company '" + company + "' domain mismatch with link host '" + w.getHost() + "'");
                    }
                }
            }
        }
        indicators.add(new IndicatorDto(
                "BRAND_IDENTITY_MISMATCH",
                "Brand Identity & Infrastructure Mismatch",
                "Claimed company brand does not match host domain in destination links",
                "BRAND_IMPERSONATION",
                "HIGH",
                20,
                !mismatchEvidence.isEmpty(),
                mismatchEvidence
        ));

        return indicators;
    }

    public int calculateOverallScore(List<IndicatorDto> indicators) {
        int score = 0;
        for (IndicatorDto ind : indicators) {
            if (ind.isFired()) {
                score += ind.getImpactScore();
            }
        }
        return Math.min(100, Math.max(0, score));
    }

    public String determineRiskLevel(int overallScore, int confidenceScore) {
        if (overallScore >= 80) {
            return "HIGH RISK";
        } else if (overallScore >= 60) {
            return "MEDIUM-HIGH RISK";
        } else if (overallScore >= 30) {
            return "LOW-MODERATE RISK";
        } else {
            if (confidenceScore < 40 && overallScore == 0) {
                return "NEEDS VERIFICATION";
            }
            return "LOW RISK";
        }
    }
}
