import React from 'react';
import { ShieldCheck, History, Activity } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  healthOk: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, healthOk }) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(11, 15, 20, 0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #00e599 0%, #10b981 100%)',
            padding: '0.5rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0, 229, 153, 0.3)'
          }}>
            <ShieldCheck size={26} color="#051014" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                SCAM<span style={{ color: 'var(--accent-teal)' }}>CHECK</span>
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                background: 'rgba(0, 229, 153, 0.12)',
                color: 'var(--accent-teal)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(0, 229, 153, 0.3)',
                letterSpacing: '0.05em'
              }}>
                v2.0 PROT
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Recruitment Threat Intelligence Engine
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: healthOk ? 'var(--accent-emerald)' : 'var(--accent-crimson)',
            background: 'rgba(17, 26, 30, 0.6)',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            border: '1px solid var(--border-color)'
          }}>
            <Activity size={14} className={healthOk ? 'pulse' : ''} />
            <span>{healthOk ? 'SYSTEM ONLINE' : 'DISCONNECTED'}</span>
          </div>

          <button onClick={onOpenHistory} className="btn-secondary">
            <History size={16} />
            <span>History</span>
          </button>
        </div>
      </div>
    </header>
  );
};
