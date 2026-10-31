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

export type DealType =
  | 'cross_border_poc'
  | 'investment'
  | 'commercial_partnership'
  | 'market_expansion';

export interface DealStageInfo {
  stage: DealStage;
  stepNumber: number;
  label: string;
  description: string;
}

// Dynamic stage definitions based on deal type
export function getStagesForDealType(dealType: DealType = 'cross_border_poc'): DealStageInfo[] {
  switch (dealType) {
    case 'investment':
      return [
        {
          stage: 'ai_matched',
          stepNumber: 1,
          label: 'AI Matched',
          description: 'Investor discovered through AI thesis matching & ESG/sustainability mandate.',
        },
        {
          stage: 'meeting_scheduled',
          stepNumber: 2,
          label: 'Meeting Scheduled',
          description: '30-minute investment introduction & partner thesis alignment call.',
        },
        {
          stage: 'proposal_submitted',
          stepNumber: 3,
          label: 'Pitch Submitted',
          description: 'Pitch deck, funding request, business model, financial projections & expansion plan.',
        },
        {
          stage: 'negotiation',
          stepNumber: 4,
          label: 'Term Sheet & Negotiation',
          description: 'Investor reviews cap table, financial auditability, customer traction & proposed valuation.',
        },
        {
          stage: 'poc_pilot',
          stepNumber: 5,
          label: 'Due Diligence',
          description: 'Comprehensive financial, IP hygiene, eKYB corporate registry & data sovereignty diligence.',
        },
        {
          stage: 'deal_closed',
          stepNumber: 6,
          label: 'Investment Closed',
          description: 'Seed investment agreement executed with funds earmarked for regional expansion.',
        },
      ];

    case 'market_expansion':
      return [
        {
          stage: 'ai_matched',
          stepNumber: 1,
          label: 'AI Matched',
          description: 'Regional distribution channel discovered through AI market expansion matching.',
        },
        {
          stage: 'meeting_scheduled',
          stepNumber: 2,
          label: 'Introductory Meeting',
          description: 'Initial partnership meeting aligning on agricultural cooperative distribution channels.',
        },
        {
          stage: 'proposal_submitted',
          stepNumber: 3,
          label: 'Market Plan Submitted',
          description: 'Product specifications, local certification plan & Vietnamese commercial distribution framework.',
        },
        {
          stage: 'negotiation',
          stepNumber: 4,
          label: 'Commercial Negotiation',
          description: 'Agreement on territory exclusivity, margin splits, import duties & regulatory compliance.',
        },
        {
          stage: 'poc_pilot',
          stepNumber: 5,
          label: 'Market Entry Pilot',
          description: 'Small-scale pilot rollout with 5 local farming cooperatives to test adoption.',
        },
        {
          stage: 'deal_closed',
          stepNumber: 6,
          label: 'Partnership Closed',
          description: 'Nationwide distribution agreement executed across target ASEAN territory.',
        },
      ];

    case 'commercial_partnership':
      return [
        {
          stage: 'ai_matched',
          stepNumber: 1,
          label: 'AI Matched',
          description: 'Enterprise healthcare group matched with AI patient scheduling SaaS solution.',
        },
        {
          stage: 'meeting_scheduled',
          stepNumber: 2,
          label: 'Meeting Scheduled',
          description: 'Hospital COO & IT leadership discovery call on outpatient queue optimization.',
        },
        {
          stage: 'proposal_submitted',
          stepNumber: 3,
          label: 'Proposal Submitted',
          description: '12-week deployment proposal across two outpatient clinics with HIPAA/PDPA compliance.',
        },
        {
          stage: 'negotiation',
          stepNumber: 4,
          label: 'Negotiation',
          description: 'Enterprise SLA negotiations, clinic workflow integration terms & annual SaaS subscription.',
        },
        {
          stage: 'poc_pilot',
          stepNumber: 5,
          label: 'POC / Pilot Project',
          description: 'Live clinic pilot tracking queue latency reduction and outpatient satisfaction.',
        },
        {
          stage: 'deal_closed',
          stepNumber: 6,
          label: 'Deal Closed',
          description: 'Regional enterprise SaaS commercial contract signed for hospital network.',
        },
      ];

    case 'cross_border_poc':
    default:
      return [
        {
          stage: 'ai_matched',
          stepNumber: 1,
          label: 'AI Matched',
          description: 'RouteSense AI matched with Nusantara Express for cross-border logistics pilot.',
        },
        {
          stage: 'meeting_scheduled',
          stepNumber: 2,
          label: 'Meeting Scheduled',
          description: 'Technical discovery meeting scheduled to review Jakarta last-mile traffic constraints.',
        },
        {
          stage: 'proposal_submitted',
          stepNumber: 3,
          label: 'Proposal Submitted',
          description: '8-week pilot involving 50 delivery vehicles in Jakarta submitted with eKYB credentials.',
        },
        {
          stage: 'negotiation',
          stepNumber: 4,
          label: 'Negotiation',
          description: 'Both parties agree on pilot scope, telemetry data access, and KPI benchmarks.',
        },
        {
          stage: 'poc_pilot',
          stepNumber: 5,
          label: 'POC / Pilot Project',
          description: '50-vehicle active pilot begins in Jakarta optimizing daily driver routes.',
        },
        {
          stage: 'deal_closed',
          stepNumber: 6,
          label: 'Deal Closed',
          description: 'Corporate approves commercial deployment after successful POC completion.',
        },
      ];
  }
}

export const DEAL_STAGES: DealStageInfo[] = getStagesForDealType('cross_border_poc');

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

export interface MeasurableKpi {
  label: string;
  target: string;
  currentStatus: string;
  isHypotheticalDemo?: boolean;
}

export interface Deal {
  id: string;
  caseNumber: number; // 1, 2, 3, 4
  dealType: DealType;
  challengeId: string;
  corporateName: string;
  corporateLogo: string;
  corporateCountry: string;
  challengeTitle: string;
  currentStage: DealStage;
  matchScore: number;
  recommendedOutcome: string;
  aiMatchReason: string;
  whyMatchedBullets: string[];
  dealValue: string;
  dealValueNumeric: number;
  leadDate: string;
  
  // Startup context for this case
  startupName: string;
  startupCountry: string;
  startupIndustry: string;
  startupStage: string;
  startupProduct: string;
  startupGoal: string;

  // Partner context
  partnerType: string;
  partnerFocusOrNeed: string;

  // Measurable KPIs
  measurableKpis?: MeasurableKpi[];

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
    deliverables?: string[];
  };
  negotiationTerms?: {
    contractType: string;
    proposedValue: string;
    ipOwnership: string;
    dataResidencyCompliance: string;
    requestedItems?: string[];
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
    finalOutcomeTitle: string;
    pathway: string;
    marketCorridor: string;
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
