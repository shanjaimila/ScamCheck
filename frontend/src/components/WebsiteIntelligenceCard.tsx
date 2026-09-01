import React from 'react';
import { Globe, Lock, Unlock, AlertCircle } from 'lucide-react';
import { WebsiteIntelligence } from '../types/scamcheck';

interface WebsiteIntelligenceCardProps {
  websites: WebsiteIntelligence[];
}

export const WebsiteIntelligenceCard: React.FC<WebsiteIntelligenceCardProps> = ({ websites }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Globe size={20} color="var(--accent-teal)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
          Complete Website Intelligence Table ({websites.length} Processed)
        </h3>
      </div>

      {websites.length === 0 ? (
        <div style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontStyle: 'italic', padding: '1rem 0' }}>
          No target URLs or domain references found in communication.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.85rem',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                fontWeight: 700
              }}>
                <th style={{ padding: '0.6rem 0.8rem' }}>Target URL</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Host Domain</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Security</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>TLD</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Intelligence Flags</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((w, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  background: idx % 2 === 0 ? 'rgba(5, 12, 16, 0.3)' : 'transparent'
                }}>
                  <td style={{ padding: '0.6rem 0.8rem', maxWidth: '300px' }}>
                    <span className="font-mono" style={{ color: '#fff', wordBreak: 'break-all' }}>
                      {w.url}
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem 0.8rem' }}>
                    <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {w.host}
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem 0.8rem' }}>
                    {w.isHttps ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        <Lock size={14} /> HTTPS
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-crimson)', fontWeight: 600 }}>
                        <Unlock size={14} /> HTTP
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.6rem 0.8rem' }}>
                    <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                      {w.tld || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem 0.8rem' }}>
                    {w.triggers.length === 0 ? (
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Clean Domain</span>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {w.triggers.map((t, tIdx) => (
                          <span key={tIdx} style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '4px',
                            padding: '0.15rem 0.4rem',
                            fontSize: '0.725rem',
                            fontWeight: 700
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
