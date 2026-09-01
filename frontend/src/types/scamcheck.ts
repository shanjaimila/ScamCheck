export interface AnalysisRequest {
  text: string;
  url?: string;
  sender?: string;
}

export interface ExtractedOpportunity {
  companyName: string;
  recruiterName: string;
  compensation: string;
  upfrontFees: string;
  messagingChannels: string[];
}

export interface IocItem {
  type: 'URL' | 'EMAIL' | 'IPV4' | 'SHA256';
  value: string;
  status: 'SUSPICIOUS' | 'CLEAN' | 'PROCESSED' | 'ANALYZED' | 'UNKNOWN';
  detail: string;
}

export interface IocCollection {
  urls: IocItem[];
  emails: IocItem[];
  ipv4Addresses: IocItem[];
  sha256Hashes: IocItem[];
}

export interface Indicator {
  code: string;
  name: string;
  description: string;
  category: 'BRAND_IMPERSONATION' | 'FINANCIAL_FRAUD' | 'NETWORK_THREAT' | 'SOCIAL_ENGINEERING' | 'SECURITY_RISK';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  impactScore: number;
  fired: boolean;
  evidenceSnippets: string[];
}

export interface WebsiteIntelligence {
  url: string;
  host: string;
  scheme: string;
  isHttps: boolean;
  tld: string;
  triggers: string[];
}

export interface EvidenceSummary {
  brandMismatchDetected: boolean;
  senderMismatch: boolean;
  suspiciousDomainCount: number;
  totalIocCount: number;
}

export interface AttackPathStep {
  stepNumber: number;
  stage: 'INITIAL_CONTACT' | 'LURE_VERIFICATION' | 'EXPLOITATION_PAYMENT';
  title: string;
  description: string;
}

export interface ProtectionAdvice {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  detail: string;
  actionableAction: string;
}

export interface AnalysisResponse {
  caseId: string;
  timestamp: string;
  overallScore: number;
  riskLevel: 'LOW RISK' | 'LOW-MODERATE RISK' | 'MEDIUM-HIGH RISK' | 'HIGH RISK' | 'NEEDS VERIFICATION';
  confidenceScore: number;
  extractedOpportunity: ExtractedOpportunity;
  iocCollection: IocCollection;
  indicators: Indicator[];
  websiteIntelligence: WebsiteIntelligence[];
  evidenceSummary: EvidenceSummary;
  attackPath: AttackPathStep[];
  protectionAdvice: ProtectionAdvice[];
}

export interface CaseSummary {
  caseId: string;
  timestamp: string;
  overallScore: number;
  riskLevel: string;
  summaryText: string;
}

export interface HealthStatus {
  status: string;
  version: string;
  service: string;
}
