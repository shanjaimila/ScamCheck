import React, { useState } from 'react';
import { Database, Link, Mail, Server, Hash, Copy, Check } from 'lucide-react';
import { IocCollection, IocItem } from '../types/scamcheck';

interface IocLedgerCardProps {
  iocs: IocCollection;
}

export const IocLedgerCard: React.FC<IocLedgerCardProps> = ({ iocs }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedValue(val);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const renderCategory = (title: string, icon: React.ReactNode, items: IocItem[]) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
        {icon}
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          {title} ({items.length})
        </span>
      </div>

      {items.length === 0 ? (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic', padding: '0.5rem 0' }}>
          No {title.toLowerCase()} extracted.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {items.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(5, 12, 16, 0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.825rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden', marginRight: '0.5rem' }}>
                <span className="font-mono" style={{
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '450px'
                }}>
                  {item.value}
                </span>
                {item.status === 'SUSPICIOUS' && (
                  <span className="badge badge-high" style={{ fontSize: '0.65rem' }}>SUSPICIOUS</span>
                )}
                {item.status === 'CLEAN' && (
                  <span className="badge badge-low" style={{ fontSize: '0.65rem' }}>CLEAN</span>
                )}
              </div>

              <button
                onClick={() => handleCopy(item.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: copiedValue === item.value ? 'var(--accent-teal)' : 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Copy Indicator"
              >
                {copiedValue === item.value ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Database size={20} color="var(--accent-teal)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
          Indicators of Compromise (IOC) Ledger
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          {renderCategory('Extracted URLs', <Link size={16} color="var(--accent-teal)" />, iocs.urls)}
          {renderCategory('Email Addresses', <Mail size={16} color="var(--accent-cyan)" />, iocs.emails)}
        </div>
        <div>
          {renderCategory('IPv4 Addresses', <Server size={16} color="var(--accent-amber)" />, iocs.ipv4Addresses)}
          {renderCategory('SHA-256 Hashes', <Hash size={16} color="var(--accent-emerald)" />, iocs.sha256Hashes)}
        </div>
      </div>
    </div>
  );
};
