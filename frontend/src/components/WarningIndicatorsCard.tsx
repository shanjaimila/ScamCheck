import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Indicator } from '../types/scamcheck';

interface WarningIndicatorsCardProps {
  indicators: Indicator[];
}

export const WarningIndicatorsCard: React.FC<WarningIndicatorsCardProps> = ({ indicators }) => {
  const [showUnfired, setShowUnfired] = useState(false);

  const firedIndicators = indicators.filter(i => i.fired);
  const unfiredIndicators = indicators.filter(i => !i.fired);

  const getSeverityBadge = (sev: string) => {
    if (sev === 'HIGH') return <span className="badge badge-high">HIGH SEVERITY</span>;
    if (sev === 'MEDIUM') return <span className="badge badge-moderate">MEDIUM SEVERITY</span>;
    return <span className="badge badge-low">LOW SEVERITY</span>;
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} color="var(--accent-crimson)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            Risk Indicators Breakdown ({firedIndicators.length} Fired)
          </h3>
        </div>

        <button
          onClick={() => setShowUnfired(!showUnfired)}
          className="btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
        >
          <span>{showUnfired ? 'Hide Clean Rules' : `Show Passed Checks (${unfiredIndicators.length})`}</span>
          {showUnfired ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {firedIndicators.map((ind) => (
          <div key={ind.code} style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#ef4444" />
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                  {ind.name}
                </span>
                {getSeverityBadge(ind.severity)}
              </div>
              <span style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid rgba(239, 68, 68, 0.4)'
              }}>
                +{ind.impactScore} IMPACT
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              {ind.description}
            </p>

            {ind.evidenceSnippets.length > 0 && (
              <div style={{
                background: 'rgba(5, 12, 16, 0.8)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                borderRadius: '6px',
                padding: '0.6rem 0.8rem',
                marginTop: '0.4rem'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Concrete Evidence Snippets:
                </span>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', marginTop: '0.3rem' }}>
                  {ind.evidenceSnippets.map((snippet, sIdx) => (
                    <li key={sIdx} className="font-mono" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                      {snippet}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {showUnfired && unfiredIndicators.map((ind) => (
          <div key={ind.code} style={{
            background: 'rgba(16, 185, 129, 0.04)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            opacity: 0.8
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {ind.name}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                CHECK PASSED (0 IMPACT)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
