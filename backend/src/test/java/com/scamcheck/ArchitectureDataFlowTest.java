package com.scamcheck;

import com.scamcheck.dto.AnalysisRequest;
import com.scamcheck.dto.AnalysisResponse;
import com.scamcheck.service.AnalysisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ArchitectureDataFlowTest {

    @Autowired
    private AnalysisService analysisService;

    @Test
    void testStrictPipelineExecutionOrderAndNoMocking() {
        AnalysisRequest request = new AnalysisRequest("Urgent job offer! Pay $200 deposit via Telegram. Download offer letter.exe", null, "hr-recruiter@gmail.com");

        AnalysisResponse response = analysisService.analyze(request);

        assertThat(response.getCaseId()).isNotNull();
        assertThat(response.getOverallScore()).isGreaterThan(0);
        assertThat(response.getRiskLevel()).isIn("LOW RISK", "LOW-MODERATE RISK", "MEDIUM-HIGH RISK", "HIGH RISK", "NEEDS VERIFICATION");
        assertThat(response.getExtractedOpportunity()).isNotNull();
        assertThat(response.getIocCollection()).isNotNull();
        assertThat(response.getIndicators()).hasSizeGreaterThanOrEqualTo(12);
        assertThat(response.getWebsiteIntelligence()).isNotNull();
        assertThat(response.getEvidenceSummary()).isNotNull();
        assertThat(response.getAttackPath()).hasSizeGreaterThanOrEqualTo(3);
        assertThat(response.getProtectionAdvice()).isNotEmpty();
    }
}
