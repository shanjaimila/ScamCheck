import React from 'react';
import { AnalysisResponse } from '../types/scamcheck';
import { RiskMeter } from './RiskMeter';
import { ExtractedOpportunityCard } from './ExtractedOpportunityCard';
import { IocLedgerCard } from './IocLedgerCard';
import { WarningIndicatorsCard } from './WarningIndicatorsCard';
import { WebsiteIntelligenceCard } from './WebsiteIntelligenceCard';
import { IdentityRelationshipCard } from './IdentityRelationshipCard';
import { AttackPathCard } from './AttackPathCard';
import { ProtectionAdviceCard } from './ProtectionAdviceCard';
import { FileSpreadsheet, Calendar, Fingerprint } from 'lucide-react';

interface ResultsDashboardProps {
  response: AnalysisResponse;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ response }) => {
  const formattedTime = new Date(response.timestamp).toLocaleString();

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto 3rem auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Case Header Banner */}
      <div className="glass-card" style={{
        padding: '1.25rem 1.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(17, 26, 30, 0.9) 0%, rgba(11, 15, 20, 0.95) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'rgba(0, 229, 153, 0.15)',
            border: '1px solid rgba(0, 229, 153, 0.3)',
            padding: '0.6rem',
            borderRadius: '8px'
          }}>
            <Fingerprint size={24} color="var(--accent-teal)" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
              Investigation Audit Case ID
            </span>
            <h2 className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              {response.caseId}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <Calendar size={16} color="var(--accent-cyan)" />
            <span>{formattedTime}</span>
          </div>
          <div style={{
            background: 'rgba(0, 229, 153, 0.1)',
            color: 'var(--accent-teal)',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid rgba(0, 229, 153, 0.25)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            PIPELINE: DETERMINISTIC v2.0
          </div>
        </div>
      </div>

      {/* Top Grid: Risk Gauge + Extracted Opportunity + Identity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        <RiskMeter
          score={response.overallScore}
          riskLevel={response.riskLevel}
          confidenceScore={response.confidenceScore}
        />
        <ExtractedOpportunityCard opportunity={response.extractedOpportunity} />
      </div>

      {/* Identity & Consistency */}
      <IdentityRelationshipCard evidenceSummary={response.evidenceSummary} />

      {/* Risk Indicators Breakdown */}
      <WarningIndicatorsCard indicators={response.indicators} />

      {/* Website Intelligence Table */}
      <WebsiteIntelligenceCard websites={response.websiteIntelligence} />

      {/* IOC Ledger Card */}
      <IocLedgerCard iocs={response.iocCollection} />

      {/* Threat Attack Path */}
      <AttackPathCard attackPath={response.attackPath} />

      {/* Protection Advice Checklist */}
      <ProtectionAdviceCard advice={response.protectionAdvice} />
    </section>
  );
};
