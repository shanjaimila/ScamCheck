package com.scamcheck.service;

import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

@Service
public class DomainSimilarityService {

    private static final List<String> PROTECTED_BRANDS = Arrays.asList(
            "paypal", "google", "microsoft", "apple", "amazon",
            "facebook", "netflix", "linkedin", "meta", "binance",
            "coinbase", "telegram"
    );

    private final LevenshteinDistance levenshtein = new LevenshteinDistance();

    public String extractHost(String rawUrl) {
        if (rawUrl == null || rawUrl.isBlank()) {
            return "";
        }
        try {
            String uriStr = rawUrl.trim();
            if (!uriStr.startsWith("http://") && !uriStr.startsWith("https://")) {
                uriStr = "https://" + uriStr;
            }
            URI uri = new URI(uriStr);
            String host = uri.getHost();
            return host != null ? host.toLowerCase() : "";
        } catch (Exception e) {
            // Fallback parsing
            String clean = rawUrl.replaceFirst("(?i)^https?://", "");
            int slashIdx = clean.indexOf('/');
            if (slashIdx != -1) {
                clean = clean.substring(0, slashIdx);
            }
            int portIdx = clean.indexOf(':');
            if (portIdx != -1) {
                clean = clean.substring(0, portIdx);
            }
            return clean.toLowerCase();
        }
    }

    public String normalizeLeetspeak(String input) {
        if (input == null) return "";
        return input.toLowerCase()
                .replace('1', 'l')
                .replace('0', 'o')
                .replace('3', 'e')
                .replace('@', 'a')
                .replace('5', 's');
    }

    public String extractDomainCore(String host) {
        if (host == null || host.isBlank()) return "";
        String clean = host.toLowerCase();
        // Remove www.
        if (clean.startsWith("www.")) {
            clean = clean.substring(4);
        }
        // Split by dots to handle TLD
        String[] parts = clean.split("\\.");
        if (parts.length == 0) return clean;
        
        // Take second level domain if possible (e.g. paypa1-login from paypa1-login.com)
        if (parts.length >= 2) {
            // Ignore standard multi-part TLDs like co.uk or com.au simple heuristic
            return parts[parts.length - 2];
        }
        return parts[0];
    }

    public boolean isAuthenticBrandDomain(String host, String brand) {
        if (host == null || brand == null) return false;
        String cleanHost = host.toLowerCase();
        return cleanHost.equals(brand + ".com") ||
               cleanHost.equals("www." + brand + ".com") ||
               cleanHost.endsWith("." + brand + ".com");
    }

    public boolean checkTyposquatting(String rawUrl, String brand) {
        String host = extractHost(rawUrl);
        if (host.isBlank()) return false;
        if (isAuthenticBrandDomain(host, brand)) return false;

        String domainCore = extractDomainCore(host);
        String normalizedCore = normalizeLeetspeak(domainCore).replaceAll("[-_]", "");
        String normalizedHost = normalizeLeetspeak(host).replaceAll("[-_]", "");

        // 1. Check if normalized host/core contains brand while host is not authentic
        if (normalizedCore.contains(brand) || normalizedHost.contains(brand)) {
            return true;
        }

        // 2. Check Levenshtein distance on core
        int distance = levenshtein.apply(normalizedCore, brand);
        if (distance > 0 && distance <= 2) {
            return true;
        }

        return false;
    }

    public String detectImpersonatedBrand(String rawUrl) {
        String host = extractHost(rawUrl);
        if (host.isBlank()) return null;

        for (String brand : PROTECTED_BRANDS) {
            if (checkTyposquatting(rawUrl, brand)) {
                return brand;
            }
        }
        return null;
    }
}
