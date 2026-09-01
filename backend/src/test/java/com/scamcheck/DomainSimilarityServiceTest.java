package com.scamcheck;

import com.scamcheck.service.DomainSimilarityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DomainSimilarityServiceTest {

    private DomainSimilarityService domainSimilarityService;

    @BeforeEach
    void setUp() {
        domainSimilarityService = new DomainSimilarityService();
    }

    @Test
    void testPaypa1LoginFlaggedAsTyposquatting() {
        String url = "https://paypa1-login.com/account";
        boolean isTyposquatted = domainSimilarityService.checkTyposquatting(url, "paypal");
        assertThat(isTyposquatted).isTrue();

        String brand = domainSimilarityService.detectImpersonatedBrand(url);
        assertThat(brand).isEqualTo("paypal");
    }

    @Test
    void testAuthenticPaypalDomainClean() {
        String url = "https://paypal.com/signin";
        boolean isTyposquatted = domainSimilarityService.checkTyposquatting(url, "paypal");
        assertThat(isTyposquatted).isFalse();

        String brand = domainSimilarityService.detectImpersonatedBrand(url);
        assertThat(brand).isNull();
    }

    @Test
    void testExampleDomainClean() {
        String url = "https://example.com/login";
        String brand = domainSimilarityService.detectImpersonatedBrand(url);
        assertThat(brand).isNull();
    }

    @Test
    void testLeetspeakNormalization() {
        String normalized = domainSimilarityService.normalizeLeetspeak("p@ypa1");
        assertThat(normalized).isEqualTo("paypal");
    }
}
