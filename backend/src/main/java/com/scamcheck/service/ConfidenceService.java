package com.scamcheck.service;

import com.scamcheck.dto.AnalysisRequest;
import com.scamcheck.dto.IocCollectionDto;
import com.scamcheck.dto.WebsiteIntelligenceDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfidenceService {

    public int calculateConfidence(AnalysisRequest request, IocCollectionDto iocs, List<WebsiteIntelligenceDto> websites) {
        int confidence = 10; // Base score for any request

        String text = request.getText() != null ? request.getText().trim() : "";
        if (text.length() > 300) {
            confidence += 35;
        } else if (text.length() > 100) {
            confidence += 25;
        } else if (text.length() > 30) {
            confidence += 15;
        }

        int totalIocs = iocs.getUrls().size() + iocs.getEmails().size() +
                        iocs.getIpv4Addresses().size() + iocs.getSha256Hashes().size();

        if (totalIocs >= 4) {
            confidence += 35;
        } else if (totalIocs >= 2) {
            confidence += 25;
        } else if (totalIocs >= 1) {
            confidence += 15;
        }

        if (request.getSender() != null && !request.getSender().isBlank()) {
            confidence += 10;
        }

        if (!websites.isEmpty()) {
            confidence += 10;
        }

        return Math.min(100, Math.max(0, confidence));
    }
}
