import React from 'react';
import { Network, AlertTriangle, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { EvidenceSummary } from '../types/scamcheck';

interface IdentityRelationshipCardProps {
  evidenceSummary: EvidenceSummary;
}

export const IdentityRelationshipCard: React.FC<IdentityRelationshipCardProps> = ({ evidenceSummary }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Network size={20} color="var(--accent-teal)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
          Identity & Brand Consistency Analysis
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{
          background: evidenceSummary.brandMismatchDetected ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
          border: evidenceSummary.brandMismatchDetected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {evidenceSummary.brandMismatchDetected ? (
              <AlertTriangle size={20} color="#ef4444" />
            ) : (
              <CheckCircle2 size={20} color="var(--accent-emerald)" />
            )}
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                Brand & Link Host Consistency
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {evidenceSummary.brandMismatchDetected
                  ? 'Impersonation Warning: Link hosts do not match stated employer brand'
                  : 'Stated brand aligns with destination host domains'}
              </p>
            </div>
          </div>
          <span className={`badge ${evidenceSummary.brandMismatchDetected ? 'badge-high' : 'badge-low'}`}>
            {evidenceSummary.brandMismatchDetected ? 'MISMATCH DETECTED' : 'ALIGNED'}
          </span>
        </div>

        <div style={{
          background: evidenceSummary.senderMismatch ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
          border: evidenceSummary.senderMismatch ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {evidenceSummary.senderMismatch ? (
              <ArrowRightLeft size={20} color="#f59e0b" />
            ) : (
              <CheckCircle2 size={20} color="var(--accent-emerald)" />
            )}
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                Sender Email Domain Verification
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {evidenceSummary.senderMismatch
                  ? 'Recruiter uses unverified public free mail (@gmail/@yahoo) for enterprise outreach'
                  : 'Sender domain matches enterprise recruitment standards'}
              </p>
            </div>
          </div>
          <span className={`badge ${evidenceSummary.senderMismatch ? 'badge-moderate' : 'badge-low'}`}>
            {evidenceSummary.senderMismatch ? 'FREE MAIL USED' : 'VERIFIED DOMAIN'}
          </span>
        </div>

        <div style={{
          background: 'rgba(5, 12, 16, 0.6)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '0.85rem 1rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-teal)' }}>
              {evidenceSummary.suspiciousDomainCount}
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Suspicious Domains Flagged
            </p>
          </div>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {evidenceSummary.totalIocCount}
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Total IOCs Cataloged
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
