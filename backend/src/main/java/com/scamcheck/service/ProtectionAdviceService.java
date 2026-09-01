package com.scamcheck.service;

import com.scamcheck.dto.IndicatorDto;
import com.scamcheck.dto.ProtectionAdviceDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProtectionAdviceService {

    public List<ProtectionAdviceDto> generateAdvice(List<IndicatorDto> indicators, int overallScore) {
        List<ProtectionAdviceDto> adviceList = new ArrayList<>();

        boolean hasUpfront = indicators.stream().anyMatch(i -> i.isFired() && "UPFRONT_PAYMENT".equals(i.getCode()));
        boolean hasTyposquat = indicators.stream().anyMatch(i -> i.isFired() && "DOMAIN_SIMILARITY".equals(i.getCode()));
        boolean hasCreds = indicators.stream().anyMatch(i -> i.isFired() && "CREDENTIAL_REQUEST".equals(i.getCode()));
        boolean hasMsgApp = indicators.stream().anyMatch(i -> i.isFired() && "MESSAGING_APP_CONTACT".equals(i.getCode()));

        if (hasUpfront) {
            adviceList.add(new ProtectionAdviceDto(
                    "HIGH",
                    "Refuse All Upfront Payments & Fees",
                    "Legitimate employers never require job applicants to pay registration fees, equipment deposits, or crypto transfers.",
                    "Do NOT send money, gift cards, or crypto under any circumstances."
            ));
        }

        if (hasTyposquat) {
            adviceList.add(new ProtectionAdviceDto(
                    "HIGH",
                    "Verify Official Domain WHOIS & Corporate Site",
                    "The link host appears to impersonate an authentic brand. Always navigate directly to the company's official website.",
                    "Do NOT log in via the provided link. Type the official URL into your browser directly."
            ));
        }

        if (hasCreds) {
            adviceList.add(new ProtectionAdviceDto(
                    "HIGH",
                    "Protect Sensitive Financial & Personal Credentials",
                    "Asks for confidential credentials like passwords, OTPs, SSNs, or banking PINs.",
                    "Never disclose account credentials or OTP codes over email or messaging apps."
            ));
        }

        if (hasMsgApp) {
            adviceList.add(new ProtectionAdviceDto(
                    "MEDIUM",
                    "Verify Recruiter via Official Corporate Portal / LinkedIn",
                    "Recruiter exclusively communicates via off-platform chat channels like Telegram or WhatsApp.",
                    "Cross-check recruiter profile on LinkedIn and verify their corporate email domain."
            ));
        }

        // Default baseline advice
        if (adviceList.isEmpty()) {
            adviceList.add(new ProtectionAdviceDto(
                    "LOW",
                    "Standard Recruitment Verification",
                    "Always confirm job listings on the organization's official careers portal.",
                    "Verify recruiter email address matches the company's domain name."
            ));
        }

        return adviceList;
    }
}
