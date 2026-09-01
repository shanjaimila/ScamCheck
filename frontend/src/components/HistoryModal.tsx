import React, { useState } from 'react';
import { X, Search, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { CaseSummary } from '../types/scamcheck';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cases: CaseSummary[];
  onSelectCase: (caseId: string) => void;
  onDeleteCase: (caseId: string) => void;
  onClearAllHistory: () => void;
  loading: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  cases,
  onSelectCase,
  onDeleteCase,
  onClearAllHistory,
  loading
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredCases = cases.filter(c =>
    c.caseId.toLowerCase().includes(search.toLowerCase()) ||
    c.summaryText.toLowerCase().includes(search.toLowerCase()) ||
    c.riskLevel.toLowerCase().includes(search.toLowerCase())
  );

  const getScoreBadge = (s: number) => {
    if (s >= 80) return 'badge-high';
    if (s >= 60) return 'badge-medium-high';
    if (s >= 30) return 'badge-moderate';
    return 'badge-low';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.75rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={22} color="var(--accent-teal)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
              Investigation History
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {cases.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete all investigation history?')) {
                    onClearAllHistory();
                  }
                }}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                <Trash2 size={14} color="#ef4444" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '1rem', position: 'relative' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history by Case ID, snippet, or risk level..."
            style={{
              width: '100%',
              background: 'rgba(5, 12, 16, 0.7)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem 0.65rem 2.4rem',
              color: '#fff',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.25rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              Loading investigation history...
            </div>
          ) : filteredCases.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              No investigation history records found matching query.
            </div>
          ) : (
            filteredCases.map((c) => (
              <div
                key={c.caseId}
                onClick={() => {
                  onSelectCase(c.caseId);
                  onClose();
                }}
                style={{
                  background: 'rgba(5, 12, 16, 0.6)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-teal)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              >
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
                      {c.caseId.substring(0, 18)}...
                    </span>
                    <span className={`badge ${getScoreBadge(c.overallScore)}`}>
                      {c.overallScore}/100 • {c.riskLevel}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.summaryText || 'No text snippet'}
                  </p>

                  <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
                    {new Date(c.timestamp).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    className="btn-secondary"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                  >
                    <span>Replay</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCase(c.caseId);
                    }}
                    title="Delete Case from History"
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      borderRadius: '6px',
                      padding: '0.45rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)')}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
