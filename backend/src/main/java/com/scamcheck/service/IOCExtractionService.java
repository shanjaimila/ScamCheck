package com.scamcheck.service;

import com.scamcheck.dto.IocCollectionDto;
import com.scamcheck.dto.IocItemDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class IOCExtractionService {

    private static final Pattern URL_PATTERN = Pattern.compile(
            "(?i)\\bhttps?://[a-zA-Z0-9.-]+(?:\\.[a-zA-Z]{2,})(?::[0-9]+)?(?:/[^\\s]*)?"
    );

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
    );

    private static final Pattern IPV4_PATTERN = Pattern.compile(
            "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b"
    );

    private static final Pattern SHA256_PATTERN = Pattern.compile(
            "(?<![0-9a-fA-F])[0-9a-fA-F]{64}(?![0-9a-fA-F])"
    );

    public List<String> extractUrls(String text) {
        if (text == null || text.isBlank()) {
            return new ArrayList<>();
        }
        Set<String> urls = new LinkedHashSet<>();
        Matcher matcher = URL_PATTERN.matcher(text);
        while (matcher.find()) {
            String url = matcher.group();
            // Clean up trailing punctuation if any accidentally matched
            if (url.endsWith(".") || url.endsWith(",") || url.endsWith(")") || url.endsWith("]")) {
                url = url.substring(0, url.length() - 1);
            }
            urls.add(url);
        }
        return new ArrayList<>(urls);
    }

    public List<String> extractEmails(String text) {
        if (text == null || text.isBlank()) {
            return new ArrayList<>();
        }
        Set<String> emails = new LinkedHashSet<>();
        Matcher matcher = EMAIL_PATTERN.matcher(text);
        while (matcher.find()) {
            emails.add(matcher.group().toLowerCase());
        }
        return new ArrayList<>(emails);
    }

    public List<String> extractIpv4(String text) {
        if (text == null || text.isBlank()) {
            return new ArrayList<>();
        }
        Set<String> ips = new LinkedHashSet<>();
        Matcher matcher = IPV4_PATTERN.matcher(text);
        while (matcher.find()) {
            ips.add(matcher.group());
        }
        return new ArrayList<>(ips);
    }

    public List<String> extractSha256(String text) {
        if (text == null || text.isBlank()) {
            return new ArrayList<>();
        }
        Set<String> hashes = new LinkedHashSet<>();
        Matcher matcher = SHA256_PATTERN.matcher(text);
        while (matcher.find()) {
            hashes.add(matcher.group().toLowerCase());
        }
        return new ArrayList<>(hashes);
    }

    public IocCollectionDto extractAll(String text, String optionalUrl) {
        List<String> rawUrls = extractUrls(text);
        if (optionalUrl != null && !optionalUrl.isBlank()) {
            String trimmed = optionalUrl.trim();
            if (!rawUrls.contains(trimmed)) {
                rawUrls.add(0, trimmed);
            }
        }

        List<String> rawEmails = extractEmails(text);
        List<String> rawIps = extractIpv4(text);
        List<String> rawHashes = extractSha256(text);

        List<IocItemDto> urlItems = new ArrayList<>();
        for (String url : rawUrls) {
            urlItems.add(new IocItemDto("URL", url, "PROCESSED", "Extracted URL indicator"));
        }

        List<IocItemDto> emailItems = new ArrayList<>();
        for (String email : rawEmails) {
            boolean isFreeMail = email.endsWith("@gmail.com") || email.endsWith("@yahoo.com") || email.endsWith("@hotmail.com") || email.endsWith("@outlook.com");
            String status = isFreeMail ? "SUSPICIOUS" : "CLEAN";
            String detail = isFreeMail ? "Public free webmail address used for recruitment" : "Domain webmail indicator";
            emailItems.add(new IocItemDto("EMAIL", email, status, detail));
        }

        List<IocItemDto> ipItems = new ArrayList<>();
        for (String ip : rawIps) {
            ipItems.add(new IocItemDto("IPV4", ip, "SUSPICIOUS", "Direct IPv4 reference found in recruitment text"));
        }

        List<IocItemDto> hashItems = new ArrayList<>();
        for (String hash : rawHashes) {
            hashItems.add(new IocItemDto("SHA256", hash, "ANALYZED", "SHA-256 binary file hash indicator"));
        }

        return new IocCollectionDto(urlItems, emailItems, ipItems, hashItems);
    }
}
