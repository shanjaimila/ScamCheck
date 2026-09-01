import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RiskMeterProps {
  score: number;
  riskLevel: string;
  confidenceScore: number;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, riskLevel, confidenceScore }) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return '#ef4444';
    if (s >= 60) return '#f97316';
    if (s >= 30) return '#f59e0b';
    return '#10b981';
  };

  const getRiskIcon = () => {
    if (score >= 80) return <AlertOctagon size={28} color="#ef4444" />;
    if (score >= 60) return <ShieldAlert size={28} color="#f97316" />;
    if (score >= 30) return <AlertTriangle size={28} color="#f59e0b" />;
    return <CheckCircle2 size={28} color="#10b981" />;
  };

  const getBadgeClass = () => {
    if (score >= 80) return 'badge-high';
    if (score >= 60) return 'badge-medium-high';
    if (score >= 30) return 'badge-moderate';
    return 'badge-low';
  };

  const color = getScoreColor(score);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
            Decision Threat Score
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
            Risk Score Gauge
          </h3>
        </div>
        {getRiskIcon()}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        marginBottom: '0.75rem'
      }}>
        <span style={{ fontSize: '3.5rem', fontWeight: 900, color: color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)', fontWeight: 700 }}>
          / 100
        </span>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <span className={`badge ${getBadgeClass()}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
          {riskLevel}
        </span>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
          <span>Confidence Rating</span>
          <span style={{ color: 'var(--accent-teal)' }}>{confidenceScore}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(5, 12, 16, 0.8)',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{
            width: `${confidenceScore}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00e599 0%, #06b6d4 100%)',
            borderRadius: '4px',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
      </div>
    </div>
  );
};
