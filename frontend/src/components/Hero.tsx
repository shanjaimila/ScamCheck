import React from 'react';
import { Lock, FileSearch, ShieldAlert } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem 1.5rem 1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(0, 229, 153, 0.08)',
        border: '1px solid rgba(0, 229, 153, 0.25)',
        padding: '0.35rem 1rem',
        borderRadius: '30px',
        color: 'var(--accent-teal)',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1rem'
      }}>
        <Lock size={14} />
        <span>DETERMINISTIC THREAT ANALYSIS PIPELINE</span>
      </div>

      <h1 style={{
        fontSize: '2.75rem',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.2,
        color: '#ffffff',
        maxWidth: '850px',
        margin: '0 auto 1rem auto'
      }}>
        Verify before you <span style={{
          background: 'linear-gradient(135deg, #00e599 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>trust.</span>
      </h1>

      <p style={{
        fontSize: '1.05rem',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 1.5rem auto',
        lineHeight: 1.6
      }}>
        Explainable threat intelligence for job offers, recruitment emails, WhatsApp messages, and URLs.
        Paste suspicious communications to analyze indicators of fraud, domain typosquatting, and impersonation.
      </p>
    </section>
  );
};
