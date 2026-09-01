import { AnalysisRequest, AnalysisResponse, CaseSummary, HealthStatus } from '../types/scamcheck';

const API_BASE = '/api';

export async function analyzeOpportunity(payload: AnalysisRequest): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: 'Analysis failed' }));
    throw new Error(errorBody.message || `API Error: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchHistory(): Promise<CaseSummary[]> {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }
  return res.json();
}

export async function fetchCaseById(caseId: string): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/history/${caseId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch case details');
  }
  return res.json();
}

export async function checkHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) {
    throw new Error('Health check failed');
  }
  return res.json();
}

export async function deleteCase(caseId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/history/${caseId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete case');
  }
}

export async function clearAllHistory(): Promise<void> {
  const res = await fetch(`${API_BASE}/history`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to clear history');
  }
}
