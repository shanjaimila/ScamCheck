package com.scamcheck.service;

import com.scamcheck.dto.WebsiteIntelligenceDto;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class WebsiteService {

    private static final List<String> SUSPICIOUS_TLDS = Arrays.asList(
            ".tk", ".ml", ".ga", ".cf", ".xyz", ".top", ".click"
    );

    private static final List<String> SHORTENERS = Arrays.asList(
            "bit.ly", "tinyurl.com", "is.gd", "t.co", "cutt.ly", "rb.gy", "ow.ly"
    );

    private final DomainSimilarityService domainSimilarityService;

    public WebsiteService(DomainSimilarityService domainSimilarityService) {
        this.domainSimilarityService = domainSimilarityService;
    }

    public List<WebsiteIntelligenceDto> analyzeWebsites(List<String> urls) {
        List<WebsiteIntelligenceDto> result = new ArrayList<>();
        if (urls == null) return result;

        for (String rawUrl : urls) {
            result.add(analyzeSingleWebsite(rawUrl));
        }
        return result;
    }

    public WebsiteIntelligenceDto analyzeSingleWebsite(String rawUrl) {
        String scheme = "http";
        String host = domainSimilarityService.extractHost(rawUrl);
        boolean isHttps = false;

        try {
            String tempUrl = rawUrl.trim();
            if (!tempUrl.startsWith("http://") && !tempUrl.startsWith("https://")) {
                tempUrl = "https://" + tempUrl;
            }
            URI uri = new URI(tempUrl);
            if (uri.getScheme() != null) {
                scheme = uri.getScheme().toLowerCase();
            }
            isHttps = "https".equalsIgnoreCase(scheme);
        } catch (Exception ignored) {
            if (rawUrl.toLowerCase().startsWith("https://")) {
                scheme = "https";
                isHttps = true;
            }
        }

        String tld = extractTld(host);
        List<String> triggers = new ArrayList<>();

        if (!isHttps) {
            triggers.add("INSECURE_HTTP");
        }

        if (isSuspiciousTld(tld)) {
            triggers.add("SUSPICIOUS_TLD");
        }

        if (isIpHost(host)) {
            triggers.add("IP_HOSTED_URL");
        }

        if (isUrlShortener(host)) {
            triggers.add("URL_SHORTENER");
        }

        String brand = domainSimilarityService.detectImpersonatedBrand(rawUrl);
        if (brand != null) {
            triggers.add("DOMAIN_SIMILARITY (" + brand.toUpperCase() + ")");
        }

        return new WebsiteIntelligenceDto(rawUrl, host, scheme, isHttps, tld, triggers);
    }

    private String extractTld(String host) {
        if (host == null || !host.contains(".")) return "";
        int lastDot = host.lastIndexOf('.');
        return host.substring(lastDot).toLowerCase();
    }

    public boolean isSuspiciousTld(String tld) {
        if (tld == null || tld.isBlank()) return false;
        return SUSPICIOUS_TLDS.contains(tld.toLowerCase());
    }

    public boolean isIpHost(String host) {
        if (host == null || host.isBlank()) return false;
        return host.matches("^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$");
    }

    public boolean isUrlShortener(String host) {
        if (host == null || host.isBlank()) return false;
        String lowerHost = host.toLowerCase();
        for (String shortener : SHORTENERS) {
            if (lowerHost.equals(shortener) || lowerHost.endsWith("." + shortener)) {
                return true;
            }
        }
        return false;
    }
}
