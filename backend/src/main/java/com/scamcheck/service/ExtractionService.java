package com.scamcheck.service;

import com.scamcheck.dto.ExtractedOpportunityDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ExtractionService {

    private static final Pattern COMPANY_PATTERN = Pattern.compile(
            "(?i)(?:at|company|client|organization|representing|brand|from)\\s+([A-Z][a-zA-Z0-9_.-]+(?:\\s+[A-Z][a-zA-Z0-9_.-]+)?)"
    );

    private static final Pattern RECRUITER_PATTERN = Pattern.compile(
            "(?i)(?:recruiter|contact|hiring manager|sender|from|agent|coordinator)\\s*:?\\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}|[A-Z][a-z]+\\s+[A-Z][a-z]+)"
    );

    private static final Pattern COMPENSATION_PATTERN = Pattern.compile(
            "(?i)(?:salary|compensation|pay|rate|earning|stipend|offering)\\s*:?\\s*(\\$?\\d+[,0-9]*(?:\\.\\d+)?(?:/hr|/mo|/month|/week|/yr|\\s*USD|\\s*EUR|\\s*USDT)?)"
    );

    private static final Pattern UPFRONT_FEE_PATTERN = Pattern.compile(
            "(?i)(?:fee|deposit|payment|registration|training fee|equipment charge|buy|purchase|crypto|wire|transfer)\\s*:?\\s*(\\$?\\d+[,0-9]*(?:\\.\\d+)?(?:\\s*USD|\\s*USDT)?)"
    );

    public ExtractedOpportunityDto extractOpportunity(String text, String sender) {
        if (text == null) text = "";

        String company = extractCompany(text);
        String recruiter = sender != null && !sender.isBlank() ? sender : extractRecruiter(text);
        String compensation = extractCompensation(text);
        String upfrontFee = extractUpfrontFees(text);
        List<String> channels = extractMessagingChannels(text);

        return new ExtractedOpportunityDto(company, recruiter, compensation, upfrontFee, channels);
    }

    private String extractCompany(String text) {
        Matcher m = COMPANY_PATTERN.matcher(text);
        if (m.find()) {
            return m.group(1).trim();
        }
        // Fallback brand detection if mentioned
        if (text.toLowerCase().contains("paypal")) return "PayPal";
        if (text.toLowerCase().contains("google")) return "Google";
        if (text.toLowerCase().contains("microsoft")) return "Microsoft";
        if (text.toLowerCase().contains("apple")) return "Apple";
        if (text.toLowerCase().contains("amazon")) return "Amazon";
        return "Unspecified / Undisclosed Entity";
    }

    private String extractRecruiter(String text) {
        Matcher m = RECRUITER_PATTERN.matcher(text);
        if (m.find()) {
            return m.group(1).trim();
        }
        return "Unknown Recruiter";
    }

    private String extractCompensation(String text) {
        Matcher m = COMPENSATION_PATTERN.matcher(text);
        if (m.find()) {
            return m.group(1).trim();
        }
        // Check dollar pattern
        Matcher m2 = Pattern.compile("\\$\\d+[,0-9]*").matcher(text);
        if (m2.find()) {
            return m2.group().trim();
        }
        return "Not Mentioned";
    }

    private String extractUpfrontFees(String text) {
        Matcher m = UPFRONT_FEE_PATTERN.matcher(text);
        if (m.find()) {
            return m.group().trim();
        }
        if (text.toLowerCase().contains("fee") || text.toLowerCase().contains("deposit") || text.toLowerCase().contains("payment")) {
            return "Upfront Deposit / Fee Detected";
        }
        return "None Detected";
    }

    private List<String> extractMessagingChannels(String text) {
        List<String> channels = new ArrayList<>();
        String lower = text.toLowerCase();
        if (lower.contains("telegram")) channels.add("Telegram");
        if (lower.contains("whatsapp")) channels.add("WhatsApp");
        if (lower.contains("signal")) channels.add("Signal");
        if (lower.contains("wire")) channels.add("Wire");
        if (channels.isEmpty()) {
            channels.add("Email / Web Portal");
        }
        return channels;
    }
}
