package com.scamcheck;

import com.scamcheck.dto.*;
import com.scamcheck.service.DomainSimilarityService;
import com.scamcheck.service.RiskService;
import com.scamcheck.service.WebsiteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class RiskServiceTest {

    private RiskService riskService;

    @BeforeEach
    void setUp() {
        DomainSimilarityService domainSimilarityService = new DomainSimilarityService();
        WebsiteService websiteService = new WebsiteService(domainSimilarityService);
        riskService = new RiskService(domainSimilarityService, websiteService);
    }

    @Test
    void testUpfrontPaymentAndCredentialRequestFired() {
        AnalysisRequest req = new AnalysisRequest("Pay $150 registration fee and submit password and OTP", null, "scammer@gmail.com");
        IocCollectionDto iocs = new IocCollectionDto(new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        ExtractedOpportunityDto opp = new ExtractedOpportunityDto("Unknown", "scammer@gmail.com", "Not Mentioned", "$150 registration fee", List.of("Telegram"));
        List<WebsiteIntelligenceDto> websites = new ArrayList<>();

        List<IndicatorDto> indicators = riskService.evaluateIndicators(req, iocs, opp, websites);

        boolean upfrontFired = indicators.stream().anyMatch(i -> "UPFRONT_PAYMENT".equals(i.getCode()) && i.isFired());
        boolean credFired = indicators.stream().anyMatch(i -> "CREDENTIAL_REQUEST".equals(i.getCode()) && i.isFired());

        assertThat(upfrontFired).isTrue();
        assertThat(credFired).isTrue();

        int score = riskService.calculateOverallScore(indicators);
        assertThat(score).isGreaterThanOrEqualTo(75);
    }

    @Test
    void testScoreClampingAt100() {
        // Trigger multiple high-impact rules to push sum > 100
        List<IndicatorDto> indicators = List.of(
                new IndicatorDto("RULE1", "R1", "", "CAT", "HIGH", 40, true, List.of()),
                new IndicatorDto("RULE2", "R2", "", "CAT", "HIGH", 35, true, List.of()),
                new IndicatorDto("RULE3", "R3", "", "CAT", "HIGH", 30, true, List.of()),
                new IndicatorDto("RULE4", "R4", "", "CAT", "HIGH", 25, true, List.of())
        );

        int score = riskService.calculateOverallScore(indicators);
        assertThat(score).isEqualTo(100);
    }

    @Test
    void testRiskLevelAssignment() {
        assertThat(riskService.determineRiskLevel(85, 90)).isEqualTo("HIGH RISK");
        assertThat(riskService.determineRiskLevel(65, 80)).isEqualTo("MEDIUM-HIGH RISK");
        assertThat(riskService.determineRiskLevel(45, 70)).isEqualTo("LOW-MODERATE RISK");
        assertThat(riskService.determineRiskLevel(15, 60)).isEqualTo("LOW RISK");
        assertThat(riskService.determineRiskLevel(0, 20)).isEqualTo("NEEDS VERIFICATION");
    }
}
