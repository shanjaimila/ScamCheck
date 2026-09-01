import React from 'react';
import { Building2, User, DollarSign, AlertCircle, MessageSquare } from 'lucide-react';
import { ExtractedOpportunity } from '../types/scamcheck';

interface ExtractedOpportunityCardProps {
  opportunity: ExtractedOpportunity;
}

export const ExtractedOpportunityCard: React.FC<ExtractedOpportunityCardProps> = ({ opportunity }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', height: '100%' }}>
      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
        Opportunity Entity Extraction
      </span>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem', marginBottom: '1rem' }}>
        Extracted Offer Profile
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'rgba(5, 12, 16, 0.5)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            <Building2 size={14} color="var(--accent-teal)" />
            <span>Target Company</span>
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
            {opportunity.companyName}
          </span>
        </div>

        <div style={{ background: 'rgba(5, 12, 16, 0.5)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            <User size={14} color="var(--accent-teal)" />
            <span>Stated Recruiter / Sender</span>
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', wordBreak: 'break-all' }}>
            {opportunity.recruiterName}
          </span>
        </div>

        <div style={{ background: 'rgba(5, 12, 16, 0.5)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            <DollarSign size={14} color="var(--accent-emerald)" />
            <span>Offered Compensation</span>
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
            {opportunity.compensation}
          </span>
        </div>

        <div style={{
          background: opportunity.upfrontFees !== 'None Detected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(5, 12, 16, 0.5)',
          padding: '0.75rem',
          borderRadius: '8px',
          border: opportunity.upfrontFees !== 'None Detected' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: opportunity.upfrontFees !== 'None Detected' ? '#fca5a5' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            <AlertCircle size={14} color={opportunity.upfrontFees !== 'None Detected' ? '#ef4444' : 'var(--text-muted)'} />
            <span>Upfront Fee / Deposit</span>
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: opportunity.upfrontFees !== 'None Detected' ? '#ef4444' : '#fff' }}>
            {opportunity.upfrontFees}
          </span>
        </div>
      </div>

      <div style={{ marginTop: '1rem', background: 'rgba(5, 12, 16, 0.5)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
          <MessageSquare size={14} color="var(--accent-teal)" />
          <span>Messaging & Outreach Channels</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {opportunity.messagingChannels.map((ch, idx) => (
            <span key={idx} style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(0, 229, 153, 0.1)',
              color: 'var(--accent-teal)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(0, 229, 153, 0.2)'
            }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
