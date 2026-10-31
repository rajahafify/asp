/**
 * Deals, Challenges, and Profile Types for ASEAN Startup Passport (ASP)
 */

export type DealStage =
  | 'ai_matched'
  | 'meeting_scheduled'
  | 'proposal_submitted'
  | 'negotiation'
  | 'poc_pilot'
  | 'deal_closed';

export interface DealStageInfo {
  stage: DealStage;
  stepNumber: number;
  label: string;
  description: string;
}

export const DEAL_STAGES: DealStageInfo[] = [
  {
    stage: 'ai_matched',
    stepNumber: 1,
    label: 'AI Matched',
    description: 'Startup is matched with a suitable investor or corporate partner based on eKYB profile and tech stack.',
  },
  {
    stage: 'meeting_scheduled',
    stepNumber: 2,
    label: 'Meeting Scheduled',
    description: 'Both parties agree to arrange a meeting to discuss the opportunity and align on scope.',
  },
  {
    stage: 'proposal_submitted',
    stepNumber: 3,
    label: 'Proposal Submitted',
    description: 'Startup submits its business proposal, architecture specs, and verified eKYB credentials.',
  },
  {
    stage: 'negotiation',
    stepNumber: 4,
    label: 'Negotiation',
    description: 'Both parties discuss pricing, SLA requirements, IP terms, and legal framework.',
  },
  {
    stage: 'poc_pilot',
    stepNumber: 5,
    label: 'POC / Pilot Project',
    description: 'Startup tests its solution through a real pilot deployment with defined milestones.',
  },
  {
    stage: 'deal_closed',
    stepNumber: 6,
    label: 'Deal Closed',
    description: 'Both parties successfully confirm and execute the commercial agreement.',
  },
];

export interface CorporateChallenge {
  id: string;
  corporateName: string;
  corporateLogo: string; // brand styling
  country: string;
  category: 'Technology' | 'Sustainability' | 'Healthcare' | 'Finance' | 'Retail' | 'Others';
  title: string;
  description: string;
  tags: string[];
  budget: string;
  rawBudgetAmount: number;
  currency: string;
  deadline: string;
  statusTag: 'High Priority' | 'Open' | 'Featured';
  aiMatchScore: number;
  fullRequirements?: string[];
  contactPerson: string;
}

export interface Deal {
  id: string;
  challengeId: string;
  corporateName: string;
  corporateLogo: string;
  challengeTitle: string;
  currentStage: DealStage;
  matchScore: number;
  dealValue: string;
  dealValueNumeric: number;
  leadDate: string;
  scheduledMeeting?: {
    date: string;
    time: string;
    location: string;
    meetingUrl: string;
    attendees: string[];
  };
  submittedProposal?: {
    title: string;
    summary: string;
    pricingTier: string;
    timeline: string;
    ekybVerified: boolean;
    submissionDate: string;
  };
  negotiationTerms?: {
    contractType: string;
    proposedValue: string;
    ipOwnership: string;
    dataResidencyCompliance: string;
  };
  pocMilestones?: Array<{
    title: string;
    status: 'completed' | 'in_progress' | 'pending';
    targetDate: string;
  }>;
  dealClosedDetails?: {
    closedDate: string;
    contractDuration: string;
    finalContractValue: string;
    clientContact: string;
    certificateHash: string;
  };
}

export interface UserProfile {
  name: string;
  title: string;
  avatarUrl: string;
  companyName: string;
  companyCountry: string;
  industry: string;
  stage: string;
  foundedYear: number;
  uenOrRegNumber: string;
  ekybPassportNumber: string;
  airsScore: number;
  profileCompletionPercent: number;
  bio: string;
  targetAseanMarkets: string[];
  techStack: string[];
  website: string;
  headquarters: string;
  checklist: Array<{
    id: string;
    task: string;
    completed: boolean;
    points: number;
  }>;
}

export interface AppNotification {
  id: string;
  type: 'deal' | 'meeting' | 'match' | 'kyb' | 'system' | 'challenge';
  category: 'Matches' | 'Challenges' | 'Deals' | 'System';
  badgeLabel: 'AI Match' | 'Challenge' | 'Deal Tracker' | 'System';
  iconType: 'handshake' | 'trophy' | 'calendar' | 'document' | 'megaphone';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTab?: string;
  dealId?: string;
  challengeId?: string;
}
