import React from 'react';
import { GitCommit, ArrowRight, ShieldAlert, KeyRound, DollarSign } from 'lucide-react';
import { AttackPathStep } from '../types/scamcheck';

interface AttackPathCardProps {
  attackPath: AttackPathStep[];
}

export const AttackPathCard: React.FC<AttackPathCardProps> = ({ attackPath }) => {
  const getStageIcon = (stage: string) => {
    if (stage === 'INITIAL_CONTACT') return <GitCommit size={18} color="var(--accent-cyan)" />;
    if (stage === 'LURE_VERIFICATION') return <KeyRound size={18} color="var(--accent-amber)" />;
    return <DollarSign size={18} color="#ef4444" />;
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <ShieldAlert size={20} color="var(--accent-teal)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
          Threat Attack-Path Timeline Scenario
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        position: 'relative'
      }}>
        {attackPath.map((step, idx) => (
          <div key={step.stepNumber} style={{
            background: 'rgba(5, 12, 16, 0.7)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  background: 'rgba(0, 229, 153, 0.15)',
                  color: 'var(--accent-teal)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 229, 153, 0.3)'
                }}>
                  STEP {step.stepNumber}
                </span>
                {getStageIcon(step.stage)}
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {step.description}
              </p>
            </div>

            {idx < attackPath.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <ArrowRight size={16} color="var(--accent-teal)" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
