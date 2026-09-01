import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { AnalysisRequest } from '../types/scamcheck';

interface InvestigationPanelProps {
  onAnalyze: (request: AnalysisRequest) => void;
  loading: boolean;
}

const DEMO_HIGH_RISK = `URGENT OFFER: PayPal Remote HR Compliance Associate

Dear Applicant,
Congratulations! You have been selected for an immediate position at PayPal.
Salary: $5,500 / month (Remote).

Please verify your credentials immediately at:
https://paypa1-login.com/account

Contact recruiter directly on Telegram: @PayPalHR_Admin
Download your employment contract archive: https://paypa1-login.com/contract.iso

Requirements:
1. Pay mandatory equipment setup & security deposit of $350 via USDT / Zelle before equipment dispatch.
2. Submit your SSN, banking PIN, and password for payroll verification.

File Hash: d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2`;

const DEMO_MEDIUM_RISK = `Opportunity Notice: Software Testing Internship

Hello,
We reviewed your profile for a software internship.
Pay rate: $35/hr.

Please confirm your interest by visiting our portal:
https://bit.ly/3xJobVerify or http://192.168.1.50/test-portal

Please message our hiring coordinator on WhatsApp to schedule an interview.
Sender contact: recruiter-team@gmail.com`;

const DEMO_LOW_RISK = `Official Internship Offer: Google Developer Relations

Hi Candidate,
Thank you for interviewing with Google. We are pleased to extend a summer software engineering internship offer.

Compensation: $55/hr
Official Portal: https://careers.google.com/jobs/results/12345

Please respond to security@google.com or admin@google.com with any questions.`;

export const InvestigationPanel: React.FC<InvestigationPanelProps> = ({ onAnalyze, loading }) => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [sender, setSender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAnalyze({ text: text.trim(), url: url.trim() || undefined, sender: sender.trim() || undefined });
  };

  const handleDemoSelect = (type: 'high' | 'medium' | 'low') => {
    if (type === 'high') {
      setText(DEMO_HIGH_RISK);
      setUrl('https://paypa1-login.com/account');
      setSender('hr-paypal-admin@gmail.com');
    } else if (type === 'medium') {
      setText(DEMO_MEDIUM_RISK);
      setUrl('http://192.168.1.50/test-portal');
      setSender('recruiter-team@gmail.com');
    } else {
      setText(DEMO_LOW_RISK);
      setUrl('https://careers.google.com/jobs/results/12345');
      setSender('recruitment@google.com');
    }
  };

  return (
    <section className="glass-card" style={{
      maxWidth: '1280px',
      margin: '0 auto 2.5rem auto',
      padding: '1.75rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={20} color="var(--accent-teal)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
            New Threat Investigation
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Load Sample Payload:
          </span>
          <button
            type="button"
            className="demo-badge demo-high"
            onClick={() => handleDemoSelect('high')}
          >
            🔥 High Risk (Scam)
          </button>
          <button
            type="button"
            className="demo-badge demo-medium"
            onClick={() => handleDemoSelect('medium')}
          >
            ⚠️ Medium Risk (Suspect)
          </button>
          <button
            type="button"
            className="demo-badge demo-low"
            onClick={() => handleDemoSelect('low')}
          >
            ✅ Low Risk (Clean)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '0.5rem'
          }}>
            Recruitment Communication / Offer Email / WhatsApp Text *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste raw email content, WhatsApp message, internship offer letter text, or candidate outreach here..."
            rows={7}
            required
            style={{
              width: '100%',
              background: 'rgba(5, 12, 16, 0.7)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              color: '#fff',
              fontSize: '0.925rem',
              fontFamily: 'var(--font-mono)',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '0.4rem'
            }}>
              Optional Target URL / Job Portal Link
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://paypa1-login.com/account"
              style={{
                width: '100%',
                background: 'rgba(5, 12, 16, 0.7)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.65rem 0.85rem',
                color: '#fff',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '0.4rem'
            }}>
              Optional Recruiter Sender Email / Contact
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g. hr-paypal-admin@gmail.com"
              style={{
                width: '100%',
                background: 'rgba(5, 12, 16, 0.7)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.65rem 0.85rem',
                color: '#fff',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !text.trim()}
            style={{ opacity: loading || !text.trim() ? 0.6 : 1 }}
          >
            {loading ? (
              <span>Analyzing Threat Pipeline...</span>
            ) : (
              <>
                <span>Investigate Opportunity</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};
