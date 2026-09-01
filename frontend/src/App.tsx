import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InvestigationPanel } from './components/InvestigationPanel';
import { ResultsDashboard } from './components/ResultsDashboard';
import { HistoryModal } from './components/HistoryModal';
import { CyberBackground3D } from './components/CyberBackground3D';
import { AnalysisRequest, AnalysisResponse, CaseSummary } from './types/scamcheck';
import { analyzeOpportunity, fetchHistory, fetchCaseById, checkHealth, deleteCase, clearAllHistory } from './services/api';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [historyCases, setHistoryCases] = useState<CaseSummary[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  const [healthOk, setHealthOk] = useState<boolean>(true);

  useEffect(() => {
    checkHealth()
      .then(() => setHealthOk(true))
      .catch(() => setHealthOk(false));
  }, []);

  const handleAnalyze = async (req: AnalysisRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeOpportunity(req);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Threat analysis failed to complete.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenHistory = async () => {
    setHistoryOpen(true);
    setHistoryLoading(true);
    try {
      const cases = await fetchHistory();
      setHistoryCases(cases);
    } catch (err) {
      console.error('Failed to load history', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSelectHistoryCase = async (caseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const caseData = await fetchCaseById(caseId);
      setAnalysisResult(caseData);
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve case details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCase = async (caseId: string) => {
    try {
      await deleteCase(caseId);
      setHistoryCases(prev => prev.filter(c => c.caseId !== caseId));
    } catch (err) {
      console.error('Failed to delete case', err);
    }
  };

  const handleClearAllHistory = async () => {
    try {
      await clearAllHistory();
      setHistoryCases([]);
    } catch (err) {
      console.error('Failed to clear history', err);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#070a0f', color: '#f1f5f9', overflowX: 'hidden' }}>
      {/* Interactive 3D Cyber Background Canvas */}
      <CyberBackground3D />

      {/* Main UI Content Layer */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onOpenHistory={handleOpenHistory} healthOk={healthOk} />

        <main style={{ flex: 1, padding: '1rem' }}>
          <Hero />

          <InvestigationPanel onAnalyze={handleAnalyze} loading={loading} />

          {error && (
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto 1.5rem auto',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              padding: '1rem',
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <AlertCircle size={20} color="#ef4444" />
              <div>
                <span style={{ fontWeight: 700, display: 'block' }}>Investigation Error</span>
                <span style={{ fontSize: '0.875rem' }}>{error}</span>
              </div>
            </div>
          )}

          {analysisResult && <ResultsDashboard response={analysisResult} />}
        </main>

        <footer style={{
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(11, 15, 20, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '1.5rem',
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '0.8rem'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>SCAMCHECK — recruitment threat intelligence pipeline</span>
            <span>Deterministic Java 17 / Spring Boot 3.4.x Engine</span>
          </div>
        </footer>

        <HistoryModal
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          cases={historyCases}
          onSelectCase={handleSelectHistoryCase}
          onDeleteCase={handleDeleteCase}
          onClearAllHistory={handleClearAllHistory}
          loading={historyLoading}
        />
      </div>
    </div>
  );
};

export default App;
