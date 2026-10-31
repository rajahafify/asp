/**
 * Simplified eKYB Types: Company Profile + 3 Core Documents
 * (Business Registration SSM, IC/Passport Identification, Address with Video)
 */

export interface CompanyKybProfile {
  legalName: string;
  tradeName?: string;
  ssmRegistrationNumber: string;
  country: string;
  countryFlag: string;
  incorporationDate: string;
  entityType: string;
  paidUpCapital: string;
  registeredAddress: string;
  primaryActivity: string;
  status: 'verified' | 'pending' | 'review';
}

export interface BusinessRegistrationDoc {
  docName: string;
  ssmNumber: string;
  photoUrl: string;
  uploadedAt: string;
  fileSize: string;
  status: 'verified' | 'pending';
  aiExtracted: {
    verifiedCompanyName: string;
    verifiedSsmNumber: string;
    incorporationDate: string;
    paidUpCapital: string;
    sealDetected: boolean;
  };
}

export interface IdentificationDoc {
  idType: 'IC' | 'Passport';
  fullName: string;
  idNumber: string;
  nationality: string;
  photoUrl: string;
  uploadedAt: string;
  status: 'verified' | 'pending';
  aiExtracted: {
    fullName: string;
    idNumber: string;
    nationality: string;
    faceMatchScore: number;
    livenessPassed: boolean;
  };
}

export interface AddressVideoDoc {
  addressLine: string;
  videoUrl: string;
  duration: string;
  gpsLocation: string;
  uploadedAt: string;
  status: 'verified' | 'pending';
  aiExtracted: {
    detectedSignage: string;
    geoCoordinates: string;
    addressMatchScore: number;
    premisesLivenessPassed: boolean;
  };
}

export interface KybVerificationState {
  companyProfile: CompanyKybProfile;
  businessRegistration: BusinessRegistrationDoc;
  identification: IdentificationDoc;
  addressVideo: AddressVideoDoc;
  isAllVerified: boolean;
  overallScore: number; // 0 - 1000
  lastVerifiedAt: string;
  modelUsed: string;
  auditRemarks: string[];
}
