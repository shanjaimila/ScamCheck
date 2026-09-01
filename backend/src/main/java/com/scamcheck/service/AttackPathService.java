package com.scamcheck.service;

import com.scamcheck.dto.AttackPathStepDto;
import com.scamcheck.dto.IndicatorDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AttackPathService {

    public List<AttackPathStepDto> buildAttackPath(List<IndicatorDto> indicators, int overallScore) {
        List<AttackPathStepDto> steps = new ArrayList<>();

        boolean hasTyposquat = indicators.stream().anyMatch(i -> i.isFired() && "DOMAIN_SIMILARITY".equals(i.getCode()));
        boolean hasUpfront = indicators.stream().anyMatch(i -> i.isFired() && "UPFRONT_PAYMENT".equals(i.getCode()));
        boolean hasCreds = indicators.stream().anyMatch(i -> i.isFired() && "CREDENTIAL_REQUEST".equals(i.getCode()));
        boolean hasSender = indicators.stream().anyMatch(i -> i.isFired() && "SUSPICIOUS_SENDER".equals(i.getCode()));
        boolean hasMsgApp = indicators.stream().anyMatch(i -> i.isFired() && "MESSAGING_APP_CONTACT".equals(i.getCode()));

        // Step 1: Initial Contact / Reconnaissance
        String step1Title = hasSender || hasMsgApp ? "Unsolicited Outreach via Off-Platform Channel" : "Targeted Recruitment Lure";
        String step1Desc = hasMsgApp ?
                "Fraudster initiates contact via Telegram/WhatsApp using unverified free webmail to bypass corporate HR vetting." :
                "Threat actor distributes spoofed job offer email or message purporting to represent a reputable organization.";
        steps.add(new AttackPathStepDto(1, "INITIAL_CONTACT", step1Title, step1Desc));

        // Step 2: Verification / Fake Onboarding Lure
        String step2Title = hasTyposquat ? "Redirection to Typosquatted Brand Portal" : "Fake Interview & Identity Harvesting";
        String step2Desc = hasTyposquat ?
                "Candidate is instructed to click lookalike domain link designed to mimic official brand login infrastructure." :
                "Actor requests complete personal identification, background checks, or form submissions to establish authority.";
        steps.add(new AttackPathStepDto(2, "LURE_VERIFICATION", step2Title, step2Desc));

        // Step 3: Exploitation / Financial or Credential Compromise
        String step3Title = hasUpfront ? "Upfront Fee & Crypto Deposit Demands" : (hasCreds ? "Account Credential Takeover" : "Data Harvesting & Monetization");
        String step3Desc = hasUpfront ?
                "Scammer demands advance equipment deposit, registration payment, or crypto transfer under pretext of onboarding." :
                "Victim submits confidential passwords, OTPs, or banking PINs leading to immediate account compromise.";
        steps.add(new AttackPathStepDto(3, "EXPLOITATION_PAYMENT", step3Title, step3Desc));

        return steps;
    }
}
