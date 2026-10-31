/**
 * ASEAN Startup Passport & eKYB Type Definitions
 */

export type AseanCountry = 'SG' | 'MY' | 'ID' | 'TH' | 'VN' | 'PH';

export interface CountryRegistryMeta {
  countryCode: AseanCountry;
  countryName: string;
  flag: string;
  registryName: string;
  registryAcronym: string;
  primaryLanguage: string;
  coreDocuments: string[];
  foreignOwnershipCapDefault: string;
  dataSovereigntyLaw: string;
}

export interface ShareholderNode {
  id: string;
  name: string;
  type: 'natural_person' | 'corporate_entity' | 'vc_fund' | 'nominee';
  jurisdiction: string;
  ownershipPercentage: number;
  votingRightsPercentage: number;
  isUBO: boolean;
  sanctionWatchlistStatus: 'CLEARED' | 'FLAGGED' | 'MANUAL_REVIEW';
  children?: ShareholderNode[];
  tinOrRegistration?: string;
  notes?: string;
}

export interface RegistryExtractionResult {
  companyName: string;
  registrationNumber: string;
  registrySource: string;
  incorporationDate: string;
  legalForm: string;
  registeredAddress: string;
  paidUpCapital: {
    amount: number;
    currency: string;
    formatted: string;
  };
  authorizedCapital?: {
    amount: number;
    currency: string;
    formatted: string;
  };
  directors: Array<{
    name: string;
    nationality: string;
    role: string;
    appointmentDate: string;
    isResident: boolean;
  }>;
  shareholders: Array<{
    name: string;
    shares: number;
    percentage: number;
    country: string;
    entityType: string;
  }>;
  statutoryCharges: Array<{
    chargeNumber: string;
    chargeHolder: string;
    amountSecured: string;
    status: 'SATISFIED' | 'OUTSTANDING';
  }>;
  complianceFlags: Array<{
    severity: 'critical' | 'warning' | 'info' | 'verified';
    category: 'registry' | 'foreign_equity' | 'data_sovereignty' | 'tax' | 'sanction';
    code: string;
    title: string;
    description: string;
    remediationAction?: string;
  }>;
  gemmaParsingConfidence: number;
  sourceLanguage: string;
}

export interface AIRSScorecard {
  totalScore: number; // 0 - 1000
  tier: 'ENTERPRISE_READY' | 'QUALIFIED_INVESTABLE' | 'PROVISIONAL' | 'NON_COMPLIANT';
  calculatedAt: string;
  pillars: {
    governanceAndUbo: {
      score: number;
      maxScore: 300;
      status: 'OPTIMAL' | 'ACCEPTABLE' | 'ATTENTION_NEEDED';
      breakdown: {
        naturalPersonTraceability: number;
        sanctionsAndPEP: number;
        statutoryOwnershipLimits: number;
        boardStructureIndependence: number;
      };
      notes: string[];
    };
    financialAuditability: {
      score: number;
      maxScore: 300;
      status: 'OPTIMAL' | 'ACCEPTABLE' | 'ATTENTION_NEEDED';
      breakdown: {
        registryVsFinancialMatch: number;
        auditorReputation: number;
        taxFilingReceipts: number;
        solvencyAndRatioHealth: number;
      };
      notes: string[];
    };
    crossBorderRegulatoryAndData: {
      score: number;
      maxScore: 250;
      status: 'OPTIMAL' | 'ACCEPTABLE' | 'ATTENTION_NEEDED';
      breakdown: {
        pdpaAndDataLocalization: number;
        ipAssignmentIntegrity: number;
        crossBorderTaxTreatyPrep: number;
        negativeListExemption: number;
      };
      notes: string[];
    };
    esgAndOperationalLegitimacy: {
      score: number;
      maxScore: 150;
      status: 'OPTIMAL' | 'ACCEPTABLE' | 'ATTENTION_NEEDED';
      breakdown: {
        physicalPremisesGeoCheck: number;
        regulatoryLicensesSandboxes: number;
        esgDisclosures: number;
      };
      notes: string[];
    };
  };
}

export interface VerifiableCredentialProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
  merkleRootHash: string;
}

export interface AseanStartupPassport {
  id: string;
  passportNumber: string;
  did: string;
  startupName: string;
  country: AseanCountry;
  registrationNumber: string;
  incorporationDate: string;
  airsScore: AIRSScorecard;
  verifiedRegistry: string;
  foreignEquityRatio: number;
  ultimateBeneficialOwners: string[];
  dataLocalizationStatus: 'CERTIFIED_LOCAL_VPC' | 'HYBRID_APPROVED' | 'NON_LOCALIZED';
  issueDate: string;
  expiryDate: string;
  issuer: {
    name: string;
    acronym: string;
    did: string;
    jurisdiction: string;
  };
  proof: VerifiableCredentialProof;
  rawVCJson: string;
  activeSanctionsCleared: boolean;
  tamperProofVerified: boolean;
}

export interface StartupDossier {
  id: string;
  name: string;
  country: AseanCountry;
  industry: string;
  foundedYear: number;
  stage: string;
  hqLocation: string;
  targetExpansionMarkets: AseanCountry[];
  overview: string;
  rawSampleDocuments: Array<{
    id: string;
    name: string;
    type: 'registry_profile' | 'articles_of_association' | 'tax_filing' | 'cap_table' | 'ip_agreement';
    language: string;
    rawText: string;
    notes: string;
  }>;
  extraction: RegistryExtractionResult;
  uboTree: ShareholderNode;
  airs: AIRSScorecard;
  passport: AseanStartupPassport;
}
