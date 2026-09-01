package com.scamcheck;

import com.scamcheck.dto.IocCollectionDto;
import com.scamcheck.service.IOCExtractionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class IOCExtractionServiceTest {

    private IOCExtractionService iocService;

    @BeforeEach
    void setUp() {
        iocService = new IOCExtractionService();
    }

    @Test
    void testUrlExtractionMultipleUrls() {
        String text = "Check out https://example.com/login and https://example.org/verify along with https://paypa1-login.com/account";
        List<String> urls = iocService.extractUrls(text);
        assertThat(urls).hasSize(3);
        assertThat(urls).containsExactly(
                "https://example.com/login",
                "https://example.org/verify",
                "https://paypa1-login.com/account"
        );
    }

    @Test
    void testEmailExtraction() {
        String text = "Contact admin@example.com or security@example.org for info.";
        List<String> emails = iocService.extractEmails(text);
        assertThat(emails).hasSize(2);
        assertThat(emails).containsExactly("admin@example.com", "security@example.org");
    }

    @Test
    void testIpV4ExtractionValidAndInvalid() {
        String text = "Server IP is 192.168.1.50 but invalid octets like 999.168.1.50 or 256.0.0.1 should be ignored.";
        List<String> ips = iocService.extractIpv4(text);
        assertThat(ips).hasSize(1);
        assertThat(ips).containsExactly("192.168.1.50");
    }

    @Test
    void testSha256ExtractionExactly64HexChars() {
        String validHash = "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2"; // 64 chars
        String invalidHash65 = "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2a"; // 65 chars

        String text = "File hash:\n" + validHash + "\nInvalid hash: " + invalidHash65;

        List<String> hashes = iocService.extractSha256(text);
        assertThat(hashes).hasSize(1);
        assertThat(hashes).containsExactly(validHash);
    }

    @Test
    void testExtractAllWithOptionalUrl() {
        String text = "Contact hr@company.com";
        String optionalUrl = "https://portal.company.com/jobs";

        IocCollectionDto iocs = iocService.extractAll(text, optionalUrl);
        assertThat(iocs.getUrls()).hasSize(1);
        assertThat(iocs.getUrls().get(0).getValue()).isEqualTo(optionalUrl);
        assertThat(iocs.getEmails()).hasSize(1);
        assertThat(iocs.getEmails().get(0).getValue()).isEqualTo("hr@company.com");
    }
}
