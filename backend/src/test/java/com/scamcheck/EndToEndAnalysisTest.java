package com.scamcheck;

import com.scamcheck.dto.AnalysisRequest;
import com.scamcheck.dto.AnalysisResponse;
import com.scamcheck.dto.IndicatorDto;
import com.scamcheck.service.AnalysisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class EndToEndAnalysisTest {

    @Autowired
    private AnalysisService analysisService;

    @Test
    void testMandatoryPayloadAnalysis() {
        String payloadText = "https://example.com/login\n" +
                "https://example.org/verify\n" +
                "https://paypa1-login.com/account\n\n" +
                "Contact admin@example.com or security@example.org.\n\n" +
                "Server: 192.168.1.50\n\n" +
                "File hash:\n" +
                "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2";

        AnalysisRequest request = new AnalysisRequest(payloadText, null, null);

        AnalysisResponse response = analysisService.analyze(request);

        assertThat(response).isNotNull();
        assertThat(response.getCaseId()).isNotBlank();
        assertThat(response.getTimestamp()).isNotNull();

        // 1. Assert IOC Extractions: 3 URLs, 2 emails, 1 IPv4, 1 SHA256
        assertThat(response.getIocCollection().getUrls()).hasSize(3);
        assertThat(response.getIocCollection().getEmails()).hasSize(2);
        assertThat(response.getIocCollection().getIpv4Addresses()).hasSize(1);
        assertThat(response.getIocCollection().getSha256Hashes()).hasSize(1);

        // 2. Assert paypa1-login.com flagged under DOMAIN_SIMILARITY
        IndicatorDto domainSimIndicator = response.getIndicators().stream()
                .filter(i -> "DOMAIN_SIMILARITY".equals(i.getCode()))
                .findFirst()
                .orElse(null);

        assertThat(domainSimIndicator).isNotNull();
        assertThat(domainSimIndicator.isFired()).isTrue();
        assertThat(domainSimIndicator.getImpactScore()).isEqualTo(30);
        assertThat(domainSimIndicator.getEvidenceSnippets()).anyMatch(s -> s.contains("paypa1-login.com") && s.contains("paypal"));

        // 3. Assert Overall Score includes +30 from DOMAIN_SIMILARITY
        assertThat(response.getOverallScore()).isGreaterThanOrEqualTo(30);

        // 4. Assert Confidence score computed
        assertThat(response.getConfidenceScore()).isGreaterThan(50);
    }
}
