import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, AlertCircle, ArrowUpRight } from 'lucide-react';
import { ProtectionAdvice } from '../types/scamcheck';

interface ProtectionAdviceCardProps {
  advice: ProtectionAdvice[];
}

export const ProtectionAdviceCard: React.FC<ProtectionAdviceCardProps> = ({ advice }) => {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedState(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <ShieldCheck size={20} color="var(--accent-teal)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
          Personalized Candidate Protection Checklist
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {advice.map((item, idx) => {
          const isChecked = checkedState[idx] || false;
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              style={{
                background: isChecked ? 'rgba(16, 185, 129, 0.06)' : 'rgba(5, 12, 16, 0.6)',
                border: isChecked ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}
            >
              <div style={{ marginTop: '0.15rem' }}>
                {isChecked ? (
                  <CheckSquare size={20} color="var(--accent-emerald)" />
                ) : (
                  <Square size={20} color="var(--text-dim)" />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: isChecked ? 'var(--text-muted)' : '#fff',
                    textDecoration: isChecked ? 'line-through' : 'none'
                  }}>
                    {item.title}
                  </span>
                  <span className={`badge ${item.priority === 'HIGH' ? 'badge-high' : item.priority === 'MEDIUM' ? 'badge-moderate' : 'badge-low'}`}>
                    {item.priority} PRIORITY
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {item.detail}
                </p>

                <div style={{
                  background: 'rgba(0, 229, 153, 0.08)',
                  border: '1px solid rgba(0, 229, 153, 0.2)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.65rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent-teal)'
                }}>
                  <ArrowUpRight size={14} />
                  <span>Action: {item.actionableAction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
