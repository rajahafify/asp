import { StartupDossier, CountryRegistryMeta } from '../types/ekyb';

export const ASEAN_REGISTRIES: Record<string, CountryRegistryMeta> = {
  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    flag: '🇸🇬',
    registryName: 'Accounting and Corporate Regulatory Authority',
    registryAcronym: 'ACRA',
    primaryLanguage: 'English',
    coreDocuments: ['Bizfile Electronic Profile', 'Register of Registrable Controllers (RORC)', 'Financial Statements (XBRL)'],
    foreignOwnershipCapDefault: '100% Foreign Allowed (Most sectors)',
    dataSovereigntyLaw: 'Singapore Personal Data Protection Act (PDPA)',
  },
  MY: {
    countryCode: 'MY',
    countryName: 'Malaysia',
    flag: '🇲🇾',
    registryName: 'Suruhanjaya Syarikat Malaysia',
    registryAcronym: 'SSM',
    primaryLanguage: 'English / Bahasa Melayu',
    coreDocuments: ['Section 14/17 Incorporation Cert', 'Beneficial Ownership Statutory Guideline', 'Audited Accounts Form 55'],
    foreignOwnershipCapDefault: 'Up to 100% in MSC/Digital Status, 70% in selected services',
    dataSovereigntyLaw: 'Malaysia PDPA 2010 & Digital Economy Framework',
  },
  ID: {
    countryCode: 'ID',
    countryName: 'Indonesia',
    flag: '🇮🇩',
    registryName: 'Administrasi Hukum Umum & Online Single Submission',
    registryAcronym: 'AHU / OSS',
    primaryLanguage: 'Bahasa Indonesia',
    coreDocuments: ['Akta Pendirian Notaris', 'SK Pengesahan Menkumham', 'Nomor Induk Berusaha (NIB) RBA'],
    foreignOwnershipCapDefault: 'PT PMA min IDR 10B investment; Negative List (Perpres 49/2021)',
    dataSovereigntyLaw: 'Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022)',
  },
  TH: {
    countryCode: 'TH',
    countryName: 'Thailand',
    flag: '🇹🇭',
    registryName: 'Department of Business Development',
    registryAcronym: 'DBD',
    primaryLanguage: 'Thai',
    coreDocuments: ['Affidavit (หนังสือรับรอง)', 'Shareholder List (BorOrJor. 5)', 'BOI Certificate'],
    foreignOwnershipCapDefault: 'Foreign Business Act (Max 49% without BOI/FBL approval)',
    dataSovereigntyLaw: 'Thailand Personal Data Protection Act (PDPA B.E. 2562)',
  },
  VN: {
    countryCode: 'VN',
    countryName: 'Vietnam',
    flag: '🇻🇳',
    registryName: 'National Business Registration Portal / DPI',
    registryAcronym: 'NBP / ERC',
    primaryLanguage: 'Vietnamese',
    coreDocuments: ['Enterprise Registration Certificate (ERC)', 'Investment Registration Certificate (IRC)', 'Charter of Association'],
    foreignOwnershipCapDefault: 'WTO Schedule of Commitments; 100% in software, capped in telecommunications',
    dataSovereigntyLaw: 'Vietnam Decree 13/2023/ND-CP on Personal Data Protection',
  },
  PH: {
    countryCode: 'PH',
    countryName: 'Philippines',
    flag: '🇵🇭',
    registryName: 'Securities and Exchange Commission',
    registryAcronym: 'SEC',
    primaryLanguage: 'English / Tagalog',
    coreDocuments: ['General Information Sheet (GIS)', 'Certificate of Incorporation', 'BIR 1702 Tax Return'],
    foreignOwnershipCapDefault: 'Foreign Investment Act (Negative List Annex A & B)',
    dataSovereigntyLaw: 'Data Privacy Act of 2012 (RA 10173)',
  },
};

export const SAMPLE_DOSSIERS: StartupDossier[] = [
  {
    id: 'dossier-id-01',
    name: 'FinNusantara Labs PT',
    country: 'ID',
    industry: 'Cross-Border B2B Payments & Open Banking API',
    foundedYear: 2022,
    stage: 'Series A',
    hqLocation: 'Sudirman Central Business District (SCBD), Jakarta, Indonesia',
    targetExpansionMarkets: ['SG', 'MY', 'VN'],
    overview: 'High-growth fintech API provider enabling cross-border clearing across ASEAN rails. Operating as an Indonesian PT PMA entity under OJK regulatory sandbox with foreign venture backing.',
    rawSampleDocuments: [
      {
        id: 'doc-ahu-01',
        name: 'Akta_Pendirian_No42_AHU_Menkumham.pdf',
        type: 'articles_of_association',
        language: 'Bahasa Indonesia',
        rawText: `REPUBLIK INDONESIA
KEMENTERIAN HUKUM DAN HAK ASASI MANUSIA
DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM (AHU)
NOMOR: AHU-0048192.AH.01.01.TAHUN 2022

PENGESAHAN PENDIRIAN BADAN HUKUM PERSEROAN TERBATAS
PT FINNUSANTARA LABS INDONESIA (PENANAMAN MODAL ASING)

Akta Notaris: Dr. Bambang Sutanto, S.H., M.Kn., Nomor 42 tertanggal 14 April 2022.
Nomor Induk Berusaha (NIB): 2404220089123 (KBLI 62012 - Pengembangan Aplikasi Perdagangan Elektronik)
Kedudukan: Menara Sudirman Lt. 18, Jl. Jend. Sudirman Kav. 60, Jakarta Selatan 12190.

MODAL DAN SAHAM:
Modal Dasar: Rp 40.000.000.000 (Empat Puluh Miliar Rupiah) terbagi atas 40.000 lembar saham @ Rp 1.000.000.
Modal Ditempatkan dan Disetor Penuh: Rp 12.500.000.000 (Dua Belas Koma Lima Miliar Rupiah).

SUSUNAN PEMEGANG SAHAM:
1. FinNusantara Global Pte. Ltd. (Singapura - Reg 202199841K): 8.750 lembar saham (70%) - Total Rp 8.750.000.000
2. Ir. Reza Aditya Pratama (WNI - NIK 3171051203890001): 2.500 lembar saham (20%) - Total Rp 2.500.000.000
3. PT Nusantara Digital Investama (Indonesia): 1.250 lembar saham (10%) - Total Rp 1.250.000.000

SUSUNAN DIREKSI DAN DEWAN KOMISARIS:
Direktur Utama: Ir. Reza Aditya Pratama (WNI)
Direktur: Marcus Alexander Tan (Warga Negara Singapura)
Komisaris Utama: Siti Nurhaliza Lubis (WNI)

SURAT KETERANGAN KELAYAKAN DATA:
Sistem elektronik terdaftar pada Kementerian Komunikasi dan Digital (PSE Terdaftar: 009214.01/DJAI.PSE/10/2023).
Penyimpanan data keuangan nasabah menggunakan Local VPC Google Cloud Platform Region Jakarta (asia-southeast2).`,
        notes: 'Notarized PT PMA deed with foreign shareholding cap compliance under Perpres 49/2021. Local server hosting verified.',
      },
      {
        id: 'doc-tax-id-02',
        name: 'Bukti_Penerimaan_Elektronik_SPT_Badan_2024.pdf',
        type: 'tax_filing',
        language: 'Bahasa Indonesia',
        rawText: `DIREKTORAT JENDERAL PAJAK - KPP PRATAMA JAKARTA SETIABUDI TIGA
BUKTI PENERIMAAN ELEKTRONIK (BPE)
NPWP: 42.891.402.1-018.000
NAMA WAJIB PAJAK: PT FINNUSANTARA LABS INDONESIA
TAHUN PAJAK: 2024 | PEMBETULAN: 0
STATUS SPT: KURANG BAYAR (DILUNASI NTPN: 89AB1293041289EF)
PEREDARAN BRUTO: Rp 28.450.210.000
LABA BERSIH SEBELUM PAJAK: Rp 4.120.500.000
AKUNTAN PUBLIK: KAP Purwantoro, Sungkoro & Surja (EY Network) - Opini Wajar Tanpa Pengecualian (WTP)`,
        notes: 'Audited financial statements by Big 4 affiliate with clean unqualified opinion and complete tax clearance.',
      },
    ],
    extraction: {
      companyName: 'PT FinNusantara Labs Indonesia',
      registrationNumber: 'AHU-0048192.AH.01.01.TAHUN 2022',
      registrySource: 'Direktorat Jenderal AHU & OSS (Indonesia)',
      incorporationDate: '2022-04-14',
      legalForm: 'Perseroan Terbatas Penanaman Modal Asing (PT PMA)',
      registeredAddress: 'Menara Sudirman Lt. 18, Jl. Jend. Sudirman Kav. 60, Jakarta Selatan 12190',
      paidUpCapital: {
        amount: 12500000000,
        currency: 'IDR',
        formatted: 'IDR 12,500,000,000 (~USD 780,000)',
      },
      authorizedCapital: {
        amount: 40000000000,
        currency: 'IDR',
        formatted: 'IDR 40,000,000,000',
      },
      directors: [
        { name: 'Ir. Reza Aditya Pratama', nationality: 'Indonesian (WNI)', role: 'President Director', appointmentDate: '2022-04-14', isResident: true },
        { name: 'Marcus Alexander Tan', nationality: 'Singaporean', role: 'Director', appointmentDate: '2022-04-14', isResident: false },
        { name: 'Siti Nurhaliza Lubis', nationality: 'Indonesian (WNI)', role: 'President Commissioner', appointmentDate: '2022-04-14', isResident: true },
      ],
      shareholders: [
        { name: 'FinNusantara Global Pte. Ltd.', shares: 8750, percentage: 70, country: 'SG', entityType: 'Corporate Holding Co' },
        { name: 'Ir. Reza Aditya Pratama', shares: 2500, percentage: 20, country: 'ID', entityType: 'Natural Person (Founder)' },
        { name: 'PT Nusantara Digital Investama', shares: 1250, percentage: 10, country: 'ID', entityType: 'Local Investment Vehicle' },
      ],
      statutoryCharges: [
        { chargeNumber: 'CHG-ID-2023-009', chargeHolder: 'Bank Mandiri (Persero) Tbk', amountSecured: 'IDR 5,000,000,000 Working Capital', status: 'OUTSTANDING' },
      ],
      complianceFlags: [
        {
          severity: 'verified',
          category: 'foreign_equity',
          code: 'PMA_CAP_VALID',
          title: 'PT PMA Capital Threshold Compliant',
          description: 'Paid-up capital exceeds the IDR 10B statutory threshold mandated by BKPM/OSS for foreign investment entities.',
        },
        {
          severity: 'verified',
          category: 'data_sovereignty',
          code: 'UU_PDP_LOCAL_VPC',
          title: 'Indonesia PDP Law Data Residency Passed',
          description: 'Verified PSE registration and deployment on GCP Jakarta region with localized transaction processing logs.',
        },
        {
          severity: 'warning',
          category: 'sanction',
          code: 'UBO_TIER_HOLDCO_AUDIT',
          title: 'Tier-2 Singapore Holding Company Audit',
          description: 'Singapore HoldCo ownership must be fully resolved to natural persons to satisfy DBS/Mandiri cross-border remittance diligence.',
          remediationAction: 'Cross-verify FinNusantara Global Pte. Ltd. via ACRA Bizfile integration.',
        },
      ],
      gemmaParsingConfidence: 0.98,
      sourceLanguage: 'Bahasa Indonesia',
    },
    uboTree: {
      id: 'node-pt-id',
      name: 'PT FinNusantara Labs Indonesia',
      type: 'corporate_entity',
      jurisdiction: 'Indonesia (AHU/OSS)',
      ownershipPercentage: 100,
      votingRightsPercentage: 100,
      isUBO: false,
      sanctionWatchlistStatus: 'CLEARED',
      children: [
        {
          id: 'node-reza-direct',
          name: 'Ir. Reza Aditya Pratama',
          type: 'natural_person',
          jurisdiction: 'Indonesia',
          ownershipPercentage: 20,
          votingRightsPercentage: 20,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
          tinOrRegistration: 'NIK 3171051203890001',
          notes: 'Founder & President Director. Holds additional 31.5% indirect equity via SG HoldCo.',
        },
        {
          id: 'node-nusantara-invest',
          name: 'PT Nusantara Digital Investama',
          type: 'corporate_entity',
          jurisdiction: 'Indonesia',
          ownershipPercentage: 10,
          votingRightsPercentage: 10,
          isUBO: false,
          sanctionWatchlistStatus: 'CLEARED',
          children: [
            {
              id: 'node-andi-santoso',
              name: 'Andi Santoso',
              type: 'natural_person',
              jurisdiction: 'Indonesia',
              ownershipPercentage: 8,
              votingRightsPercentage: 8,
              isUBO: true,
              sanctionWatchlistStatus: 'CLEARED',
            },
          ],
        },
        {
          id: 'node-sg-holdco',
          name: 'FinNusantara Global Pte. Ltd.',
          type: 'corporate_entity',
          jurisdiction: 'Singapore (ACRA Reg 202199841K)',
          ownershipPercentage: 70,
          votingRightsPercentage: 70,
          isUBO: false,
          sanctionWatchlistStatus: 'CLEARED',
          children: [
            {
              id: 'node-reza-indirect',
              name: 'Ir. Reza Aditya Pratama (via HoldCo)',
              type: 'natural_person',
              jurisdiction: 'Indonesia',
              ownershipPercentage: 31.5,
              votingRightsPercentage: 31.5,
              isUBO: true,
              sanctionWatchlistStatus: 'CLEARED',
              notes: 'Holds 45% of SG HoldCo = 31.5% effective operating entity equity.',
            },
            {
              id: 'node-marcus-tan',
              name: 'Marcus Alexander Tan',
              type: 'natural_person',
              jurisdiction: 'Singapore',
              ownershipPercentage: 21,
              votingRightsPercentage: 21,
              isUBO: true,
              sanctionWatchlistStatus: 'CLEARED',
              tinOrRegistration: 'NRIC S8819231H',
              notes: 'CTO & Co-founder. Holds 30% of SG HoldCo = 21% effective operating equity.',
            },
            {
              id: 'node-asean-vc',
              name: 'Venturra & East Horizon Fund IV (Cayman LP)',
              type: 'vc_fund',
              jurisdiction: 'Cayman Islands',
              ownershipPercentage: 17.5,
              votingRightsPercentage: 17.5,
              isUBO: false,
              sanctionWatchlistStatus: 'CLEARED',
              notes: 'Institutional venture fund. Holds 25% of SG HoldCo. GP natural persons verified.',
            },
          ],
        },
      ],
    },
    airs: {
      totalScore: 914,
      tier: 'ENTERPRISE_READY',
      calculatedAt: '2026-10-30T14:20:00Z',
      pillars: {
        governanceAndUbo: {
          score: 282,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: {
            naturalPersonTraceability: 96,
            sanctionsAndPEP: 100,
            statutoryOwnershipLimits: 92,
            boardStructureIndependence: 84,
          },
          notes: [
            '100% of cap table successfully unrolled to natural persons (Reza Pratama 51.5% combined, Marcus Tan 21%, East Horizon LPs).',
            'Zero PEP (Politically Exposed Persons) or OFAC/MAS sanctions hits across all directors and key beneficial owners.',
          ],
        },
        financialAuditability: {
          score: 278,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: {
            registryVsFinancialMatch: 98,
            auditorReputation: 95,
            taxFilingReceipts: 90,
            solvencyAndRatioHealth: 85,
          },
          notes: [
            'Registry declared paid-up capital of IDR 12.5B precisely matches audited balance sheet line item.',
            'Audited by Big 4 affiliate (KAP EY network) with unqualified clean opinion for consecutive fiscal periods.',
          ],
        },
        crossBorderRegulatoryAndData: {
          score: 224,
          maxScore: 250,
          status: 'OPTIMAL',
          breakdown: {
            pdpaAndDataLocalization: 95,
            ipAssignmentIntegrity: 88,
            crossBorderTaxTreatyPrep: 84,
            negativeListExemption: 92,
          },
          notes: [
            'Full compliance with Indonesia PDP Law (UU No. 27/2022) with local cloud VPC data residency.',
            'Double Tax Avoidance Agreement (DTAA) treaty documentation between Indonesia and Singapore pre-cleared for cross-border IP licensing royalties.',
          ],
        },
        esgAndOperationalLegitimacy: {
          score: 130,
          maxScore: 150,
          status: 'OPTIMAL',
          breakdown: {
            physicalPremisesGeoCheck: 48,
            regulatoryLicensesSandboxes: 50,
            esgDisclosures: 32,
          },
          notes: [
            'Physical leased premises at Menara Sudirman geo-verified via satellite and building management ledger.',
            'Active member of OJK FinTech Regulatory Sandbox (Record Reg S-291/MS.11/2023).',
          ],
        },
      },
    },
    passport: {
      id: 'pass-id-001',
      passportNumber: 'ASP-ID-2026-91402',
      did: 'did:asean:ekyb:id:ahu:0048192-2022',
      startupName: 'PT FinNusantara Labs Indonesia',
      country: 'ID',
      registrationNumber: 'AHU-0048192.AH.01.01.TAHUN 2022',
      incorporationDate: '2022-04-14',
      airsScore: {
        totalScore: 914,
        tier: 'ENTERPRISE_READY',
        calculatedAt: '2026-10-30T14:20:00Z',
        pillars: {
          governanceAndUbo: { score: 282, maxScore: 300, status: 'OPTIMAL', breakdown: { naturalPersonTraceability: 96, sanctionsAndPEP: 100, statutoryOwnershipLimits: 92, boardStructureIndependence: 84 }, notes: [] },
          financialAuditability: { score: 278, maxScore: 300, status: 'OPTIMAL', breakdown: { registryVsFinancialMatch: 98, auditorReputation: 95, taxFilingReceipts: 90, solvencyAndRatioHealth: 85 }, notes: [] },
          crossBorderRegulatoryAndData: { score: 224, maxScore: 250, status: 'OPTIMAL', breakdown: { pdpaAndDataLocalization: 95, ipAssignmentIntegrity: 88, crossBorderTaxTreatyPrep: 84, negativeListExemption: 92 }, notes: [] },
          esgAndOperationalLegitimacy: { score: 130, maxScore: 150, status: 'OPTIMAL', breakdown: { physicalPremisesGeoCheck: 48, regulatoryLicensesSandboxes: 50, esgDisclosures: 32 }, notes: [] },
        },
      },
      verifiedRegistry: 'AHU / OSS Ministry of Law and Human Rights Indonesia',
      foreignEquityRatio: 70,
      ultimateBeneficialOwners: ['Ir. Reza Aditya Pratama (51.5% Effective)', 'Marcus Alexander Tan (21.0% Effective)', 'Andi Santoso (8.0% Effective)'],
      dataLocalizationStatus: 'CERTIFIED_LOCAL_VPC',
      issueDate: '2026-10-30',
      expiryDate: '2027-10-30',
      issuer: {
        name: 'ASEAN Digital Economy Framework Trust Authority',
        acronym: 'DEFA-EKYB',
        did: 'did:asean:defa:trust-network',
        jurisdiction: 'ASEAN Secretariat Joint Trust Framework',
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-10-30T14:22:15Z',
        verificationMethod: 'did:asean:defa:trust-network#key-2026-gemma',
        proofPurpose: 'assertionMethod',
        proofValue: 'eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsic3ZsIl19..MEQCID7x8F3aK90bZ2vQ8J6n4P0vB7x6kL9s2WqZp4L1r0kTAiAjQ8mP9s7Y2k1L3m4N8p9Z0q1R2s3T4u5V6w7X8y9Z',
        merkleRootHash: '0x8f7d92c10b4412ef9012a4b889d123e4450198aa774bcf9213459800a7bc31d0',
      },
      rawVCJson: '',
      activeSanctionsCleared: true,
      tamperProofVerified: true,
    },
  },
  {
    id: 'dossier-sg-02',
    name: 'SingaLogistics Pte. Ltd.',
    country: 'SG',
    industry: 'Autonomous Cross-Border Freight & Customs API',
    foundedYear: 2021,
    stage: 'Series B',
    hqLocation: '71 Ayer Rajah Crescent, LaunchPad @ one-north, Singapore 139951',
    targetExpansionMarkets: ['MY', 'ID', 'TH', 'VN'],
    overview: 'Regional supply chain intelligence platform linking ASEAN port manifests and bonded warehouse declarations through unified customs microservices.',
    rawSampleDocuments: [
      {
        id: 'doc-acra-01',
        name: 'ACRA_Bizfile_Profile_202128910E.pdf',
        type: 'registry_profile',
        language: 'English',
        rawText: `ACCOUNTING AND CORPORATE REGULATORY AUTHORITY (ACRA)
BUSINESS PROFILE (COMPANY) - SINGAPORE
UEN: 202128910E
COMPANY NAME: SINGALOGISTICS PTE. LTD.
DATE OF INCORPORATION: 18 AUGUST 2021
COMPANY TYPE: EXEMPT PRIVATE COMPANY LIMITED BY SHARES
STATUS: LIVE COMPANY

PRINCIPAL ACTIVITIES:
1. FREIGHT TRANSPORT ARRANGEMENT (SSIC 52291)
2. SOFTWARE DEVELOPMENT FOR MARITIME CUSTOMS CLEARANCE (SSIC 62011)

CAPITAL STRUCTURE:
ISSUED & PAID-UP CAPITAL: SGD 4,500,000.00 (FOUR MILLION FIVE HUNDRED THOUSAND SINGAPORE DOLLARS)
NUMBER OF SHARES: 4,500,000 ORDINARY SHARES

OFFICERS / DIRECTORS:
1. CHEW WEI LING (NRIC S9102481A) - MANAGING DIRECTOR - SINGAPORE CITIZEN (RESIDENT)
2. DR. JOSHUA A. VANDERBILT (PASSPORT US 90812498) - EXECUTIVE DIRECTOR - US CITIZEN (EP HOLDER)
3. TAN KAI HENG (NRIC S8549102B) - COMPANY SECRETARY (QUALIFIED SECRETARY)

SHAREHOLDERS & BENEFICIAL CONTROLLERS (RORC):
- CHEW WEI LING: 1,800,000 SHARES (40.0%)
- SINGACAPITAL VENTURES FUND II LP: 1,350,000 SHARES (30.0%)
- DR. JOSHUA A. VANDERBILT: 900,000 SHARES (20.0%)
- EMPLOYEE SHARE TRUST (ESOP): 450,000 SHARES (10.0%)

REGISTER OF CHARGES:
CHARGE NO. 1: DBS BANK LTD - FIXED AND FLOATING CHARGE OVER TRADE RECEIVABLES (AMOUNT SGD 1,200,000). STATUS: OPEN.`,
        notes: 'ACRA Bizfile with live status, verified resident director, RORC controller registry, and clean charges register.',
      },
    ],
    extraction: {
      companyName: 'SingaLogistics Pte. Ltd.',
      registrationNumber: '202128910E',
      registrySource: 'ACRA (Singapore)',
      incorporationDate: '2021-08-18',
      legalForm: 'Private Company Limited by Shares',
      registeredAddress: '71 Ayer Rajah Crescent, #04-12, Singapore 139951',
      paidUpCapital: {
        amount: 4500000,
        currency: 'SGD',
        formatted: 'SGD 4,500,000 (~USD 3,420,000)',
      },
      directors: [
        { name: 'Chew Wei Ling', nationality: 'Singaporean', role: 'Managing Director', appointmentDate: '2021-08-18', isResident: true },
        { name: 'Dr. Joshua A. Vanderbilt', nationality: 'United States', role: 'Executive Director', appointmentDate: '2021-08-18', isResident: true },
      ],
      shareholders: [
        { name: 'Chew Wei Ling', shares: 1800000, percentage: 40, country: 'SG', entityType: 'Natural Person (Founder)' },
        { name: 'SingaCapital Ventures Fund II LP', shares: 1350000, percentage: 30, country: 'SG', entityType: 'MAS-Regulated VC Fund' },
        { name: 'Dr. Joshua A. Vanderbilt', shares: 900000, percentage: 20, country: 'US', entityType: 'Natural Person (Co-founder)' },
        { name: 'Employee Share Option Trust', shares: 450000, percentage: 10, country: 'SG', entityType: 'Employee Trust' },
      ],
      statutoryCharges: [
        { chargeNumber: 'CHG-SG-01-DBS', chargeHolder: 'DBS Bank Ltd', amountSecured: 'SGD 1,200,000 Working Capital Facility', status: 'OUTSTANDING' },
      ],
      complianceFlags: [
        {
          severity: 'verified',
          category: 'registry',
          code: 'ACRA_RESIDENT_DIRECTOR',
          title: 'Resident Director Requirement Fulfilled',
          description: 'Managing Director Chew Wei Ling is a Singapore citizen ordinary resident, fulfilling Section 145(1) Companies Act.',
        },
        {
          severity: 'verified',
          category: 'data_sovereignty',
          code: 'SG_PDPA_DATA_PROTECTION',
          title: 'Designated DPO on Public ACRA Register',
          description: 'Data Protection Officer appointed and compliant with Singapore Personal Data Protection Commission guidelines.',
        },
      ],
      gemmaParsingConfidence: 0.99,
      sourceLanguage: 'English',
    },
    uboTree: {
      id: 'node-sg-singa',
      name: 'SingaLogistics Pte. Ltd.',
      type: 'corporate_entity',
      jurisdiction: 'Singapore (ACRA)',
      ownershipPercentage: 100,
      votingRightsPercentage: 100,
      isUBO: false,
      sanctionWatchlistStatus: 'CLEARED',
      children: [
        {
          id: 'node-chew',
          name: 'Chew Wei Ling',
          type: 'natural_person',
          jurisdiction: 'Singapore',
          ownershipPercentage: 40,
          votingRightsPercentage: 40,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
          tinOrRegistration: 'NRIC S9102481A',
          notes: 'Founder & CEO. Beneficial controller.',
        },
        {
          id: 'node-joshua',
          name: 'Dr. Joshua A. Vanderbilt',
          type: 'natural_person',
          jurisdiction: 'United States',
          ownershipPercentage: 20,
          votingRightsPercentage: 20,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
          tinOrRegistration: 'Passport US 90812498',
          notes: 'Co-founder & CTO.',
        },
        {
          id: 'node-singacapital',
          name: 'SingaCapital Ventures Fund II LP',
          type: 'vc_fund',
          jurisdiction: 'Singapore (MAS CMS Licensed)',
          ownershipPercentage: 30,
          votingRightsPercentage: 30,
          isUBO: false,
          sanctionWatchlistStatus: 'CLEARED',
        },
        {
          id: 'node-esop',
          name: 'Employee Share Option Trust',
          type: 'nominee',
          jurisdiction: 'Singapore',
          ownershipPercentage: 10,
          votingRightsPercentage: 10,
          isUBO: false,
          sanctionWatchlistStatus: 'CLEARED',
        },
      ],
    },
    airs: {
      totalScore: 948,
      tier: 'ENTERPRISE_READY',
      calculatedAt: '2026-10-30T11:15:00Z',
      pillars: {
        governanceAndUbo: {
          score: 290,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: { naturalPersonTraceability: 98, sanctionsAndPEP: 100, statutoryOwnershipLimits: 96, boardStructureIndependence: 96 },
          notes: ['Clean ACRA RORC registers; Singapore-regulated VC anchor.'],
        },
        financialAuditability: {
          score: 288,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: { registryVsFinancialMatch: 100, auditorReputation: 98, taxFilingReceipts: 95, solvencyAndRatioHealth: 95 },
          notes: ['PwC audited XBRL statutory filings with positive working capital.'],
        },
        crossBorderRegulatoryAndData: {
          score: 235,
          maxScore: 250,
          status: 'OPTIMAL',
          breakdown: { pdpaAndDataLocalization: 96, ipAssignmentIntegrity: 95, crossBorderTaxTreatyPrep: 90, negativeListExemption: 94 },
          notes: ['IP registered at IPOS (Singapore Patent Registry) with comprehensive assignment agreements.'],
        },
        esgAndOperationalLegitimacy: {
          score: 135,
          maxScore: 150,
          status: 'OPTIMAL',
          breakdown: { physicalPremisesGeoCheck: 48, regulatoryLicensesSandboxes: 50, esgDisclosures: 37 },
          notes: ['Customs trade broker license verified with Singapore Customs.'],
        },
      },
    },
    passport: {
      id: 'pass-sg-002',
      passportNumber: 'ASP-SG-2026-94810',
      did: 'did:asean:ekyb:sg:acra:202128910e',
      startupName: 'SingaLogistics Pte. Ltd.',
      country: 'SG',
      registrationNumber: '202128910E',
      incorporationDate: '2021-08-18',
      airsScore: {
        totalScore: 948,
        tier: 'ENTERPRISE_READY',
        calculatedAt: '2026-10-30T11:15:00Z',
        pillars: {
          governanceAndUbo: { score: 290, maxScore: 300, status: 'OPTIMAL', breakdown: { naturalPersonTraceability: 98, sanctionsAndPEP: 100, statutoryOwnershipLimits: 96, boardStructureIndependence: 96 }, notes: [] },
          financialAuditability: { score: 288, maxScore: 300, status: 'OPTIMAL', breakdown: { registryVsFinancialMatch: 100, auditorReputation: 98, taxFilingReceipts: 95, solvencyAndRatioHealth: 95 }, notes: [] },
          crossBorderRegulatoryAndData: { score: 235, maxScore: 250, status: 'OPTIMAL', breakdown: { pdpaAndDataLocalization: 96, ipAssignmentIntegrity: 95, crossBorderTaxTreatyPrep: 90, negativeListExemption: 94 }, notes: [] },
          esgAndOperationalLegitimacy: { score: 135, maxScore: 150, status: 'OPTIMAL', breakdown: { physicalPremisesGeoCheck: 48, regulatoryLicensesSandboxes: 50, esgDisclosures: 37 }, notes: [] },
        },
      },
      verifiedRegistry: 'Accounting and Corporate Regulatory Authority (ACRA)',
      foreignEquityRatio: 50,
      ultimateBeneficialOwners: ['Chew Wei Ling (40.0%)', 'Dr. Joshua A. Vanderbilt (20.0%)'],
      dataLocalizationStatus: 'CERTIFIED_LOCAL_VPC',
      issueDate: '2026-10-30',
      expiryDate: '2027-10-30',
      issuer: {
        name: 'ASEAN Digital Economy Framework Trust Authority',
        acronym: 'DEFA-EKYB',
        did: 'did:asean:defa:trust-network',
        jurisdiction: 'ASEAN Secretariat Joint Trust Framework',
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-10-30T11:18:22Z',
        verificationMethod: 'did:asean:defa:trust-network#key-2026-gemma',
        proofPurpose: 'assertionMethod',
        proofValue: 'eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsic3ZsIl19..998aBcde8F3aK90bZ2vQ8J6n4P0vB7x6kL9s2WqZp4L1r0kTAiAjQ8mP9s7Y2k1L3m4N8p9Z0q1R2s3T4u5V6w7X8y9Z',
        merkleRootHash: '0x3a9e10f44bc19d28e770119280ab44ee198c439201a0984f1837bcda8890ff41',
      },
      rawVCJson: '',
      activeSanctionsCleared: true,
      tamperProofVerified: true,
    },
  },
  {
    id: 'dossier-th-03',
    name: 'SiamBioAgri Co., Ltd.',
    country: 'TH',
    industry: 'Agricultural Biotech & Carbon Farming Verification',
    foundedYear: 2023,
    stage: 'Seed / Pre-A',
    hqLocation: 'Khlong Toei, Bangkok, Thailand 10110',
    targetExpansionMarkets: ['SG', 'ID', 'VN'],
    overview: 'Precision climate-tech startup deploying drone remote sensing and bio-organic soil amendment verification across Southeast Asian rubber and palm concessions.',
    rawSampleDocuments: [
      {
        id: 'doc-dbd-01',
        name: 'DBD_Certificate_BorOrJor5_Shareholders.pdf',
        type: 'registry_profile',
        language: 'Thai',
        rawText: `กรมพัฒนาธุรกิจการค้า กระทรวงพาณิชย์ (DBD)
หนังสือรับรอง นิติบุคคล (Affidavit)
เลขทะเบียนนิติบุคคล: 0105566089124
ชื่อบริษัท: บริษัท สยามไบโอแอกริ จำกัด (SIAMBIOAGRI CO., LTD.)
จดทะเบียนจัดตั้งเมื่อ: 15 มีนาคม 2566
ที่ตั้งสำนักงานใหญ่: เลขที่ 98 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110

ทุนจดทะเบียน:
ทุนจดทะเบียน 25,000,000 บาท (ยี่สิบห้าล้านบาทถ้วน)
แบ่งออกเป็น 250,000 หุ้น มูลค่าหุ้นละ 100 บาท (ชำระเต็มมูลค่าแล้ว)

บัญชีรายชื่อผู้ถือหุ้น (บอจ. 5):
1. นายสมชาย วรปัญญา (สัญชาติไทย): ถือ 127,500 หุ้น (คิดเป็น 51.0%)
2. BioFuture Agritech Ventures Ltd. (สิงคโปร์): ถือ 97,500 หุ้น (คิดเป็น 39.0%)
3. ดร. นลินี จิตต์สมบูรณ์ (สัญชาติไทย): ถือ 25,000 หุ้น (คิดเป็น 10.0%)

กรรมการผู้มีอำนาจลงนามผูกพันบริษัท:
นายสมชาย วรปัญญา ลงลายมือชื่อร่วมกับ ดร. นลินี จิตต์สมบูรณ์ รวมเป็นสองคนและประทับตราสำคัญของบริษัท

การส่งเสริมการลงทุน (BOI):
ได้รับบัตรส่งเสริมการลงทุนจากสำนักงานคณะกรรมการส่งเสริมการลงทุน เลขที่ 66-0412-1-00-1-0 (กิจการพัฒนาเทคโนโลยีชีวภาพ ประเภท 5.6)
สิทธิประโยชน์: ยกเว้นข้อจำกัดสัดส่วนการถือหุ้นของคนต่างด้าวตามพระราชบัญญัติการประกอบธุรกิจของคนต่างด้าว พ.ศ. 2542 (FBA)`,
        notes: 'Official DBD Affidavit with BorOrJor. 5 shareholder roll in Thai script. BOI Section 5.6 technology promotion granted.',
      },
    ],
    extraction: {
      companyName: 'บริษัท สยามไบโอแอกริ จำกัด (SiamBioAgri Co., Ltd.)',
      registrationNumber: '0105566089124',
      registrySource: 'Department of Business Development (DBD, Thailand)',
      incorporationDate: '2023-03-15',
      legalForm: 'Private Limited Company (บริษัทจำกัด)',
      registeredAddress: '98 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand',
      paidUpCapital: {
        amount: 25000000,
        currency: 'THB',
        formatted: 'THB 25,000,000 (~USD 695,000)',
      },
      directors: [
        { name: 'นายสมชาย วรปัญญา (Somchai Vorapanya)', nationality: 'Thai', role: 'Authorized Director', appointmentDate: '2023-03-15', isResident: true },
        { name: 'ดร. นลินี จิตต์สมบูรณ์ (Dr. Nalinee Jitsomboon)', nationality: 'Thai', role: 'Authorized Director', appointmentDate: '2023-03-15', isResident: true },
      ],
      shareholders: [
        { name: 'นายสมชาย วรปัญญา (Somchai Vorapanya)', shares: 127500, percentage: 51, country: 'TH', entityType: 'Natural Person (Thai Founder)' },
        { name: 'BioFuture Agritech Ventures Ltd.', shares: 97500, percentage: 39, country: 'SG', entityType: 'Foreign Corporate Entity' },
        { name: 'ดร. นลินี จิตต์สมบูรณ์ (Dr. Nalinee Jitsomboon)', shares: 25000, percentage: 10, country: 'TH', entityType: 'Natural Person (Thai Scientist)' },
      ],
      statutoryCharges: [],
      complianceFlags: [
        {
          severity: 'verified',
          category: 'foreign_equity',
          code: 'TH_FBA_MAJORITY_HELD',
          title: 'Thai Majority Holding (51%) Confirmed',
          description: 'Shareholder list BorOrJor. 5 confirms Thai natural persons hold 61.0% in aggregate, exceeding statutory 51% threshold under FBA.',
        },
        {
          severity: 'verified',
          category: 'registry',
          code: 'TH_BOI_PROMOTED',
          title: 'BOI Tech Promotion Status Active',
          description: 'Board of Investment Certificate No. 66-0412-1-00-1-0 under Category 5.6 for biotechnology development.',
        },
      ],
      gemmaParsingConfidence: 0.97,
      sourceLanguage: 'Thai',
    },
    uboTree: {
      id: 'node-th-siambio',
      name: 'SiamBioAgri Co., Ltd.',
      type: 'corporate_entity',
      jurisdiction: 'Thailand (DBD)',
      ownershipPercentage: 100,
      votingRightsPercentage: 100,
      isUBO: false,
      sanctionWatchlistStatus: 'CLEARED',
      children: [
        {
          id: 'node-somchai',
          name: 'Somchai Vorapanya (นายสมชาย วรปัญญา)',
          type: 'natural_person',
          jurisdiction: 'Thailand',
          ownershipPercentage: 51,
          votingRightsPercentage: 51,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
        },
        {
          id: 'node-biofuture',
          name: 'BioFuture Agritech Ventures Ltd.',
          type: 'corporate_entity',
          jurisdiction: 'Singapore',
          ownershipPercentage: 39,
          votingRightsPercentage: 39,
          isUBO: false,
          sanctionWatchlistStatus: 'CLEARED',
        },
        {
          id: 'node-nalinee',
          name: 'Dr. Nalinee Jitsomboon (ดร. นลินี จิตต์สมบูรณ์)',
          type: 'natural_person',
          jurisdiction: 'Thailand',
          ownershipPercentage: 10,
          votingRightsPercentage: 10,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
        },
      ],
    },
    airs: {
      totalScore: 885,
      tier: 'ENTERPRISE_READY',
      calculatedAt: '2026-10-30T10:00:00Z',
      pillars: {
        governanceAndUbo: {
          score: 275,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: { naturalPersonTraceability: 94, sanctionsAndPEP: 100, statutoryOwnershipLimits: 95, boardStructureIndependence: 86 },
          notes: ['Majority domestic ownership structure with dual-signatory corporate seal protection.'],
        },
        financialAuditability: {
          score: 260,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: { registryVsFinancialMatch: 95, auditorReputation: 85, taxFilingReceipts: 90, solvencyAndRatioHealth: 90 },
          notes: ['Registered and fully paid capital matches DBD registered filings.'],
        },
        crossBorderRegulatoryAndData: {
          score: 220,
          maxScore: 250,
          status: 'OPTIMAL',
          breakdown: { pdpaAndDataLocalization: 90, ipAssignmentIntegrity: 92, crossBorderTaxTreatyPrep: 88, negativeListExemption: 90 },
          notes: ['Thailand PDPA B.E. 2562 compliance documented; biological seed patent transfer agreements verified.'],
        },
        esgAndOperationalLegitimacy: {
          score: 130,
          maxScore: 150,
          status: 'OPTIMAL',
          breakdown: { physicalPremisesGeoCheck: 45, regulatoryLicensesSandboxes: 50, esgDisclosures: 35 },
          notes: ['Certified carbon reduction methodology audited by TGO (Thailand Greenhouse Gas Management Organization).'],
        },
      },
    },
    passport: {
      id: 'pass-th-003',
      passportNumber: 'ASP-TH-2026-88501',
      did: 'did:asean:ekyb:th:dbd:0105566089124',
      startupName: 'SiamBioAgri Co., Ltd.',
      country: 'TH',
      registrationNumber: '0105566089124',
      incorporationDate: '2023-03-15',
      airsScore: {
        totalScore: 885,
        tier: 'ENTERPRISE_READY',
        calculatedAt: '2026-10-30T10:00:00Z',
        pillars: {
          governanceAndUbo: { score: 275, maxScore: 300, status: 'OPTIMAL', breakdown: { naturalPersonTraceability: 94, sanctionsAndPEP: 100, statutoryOwnershipLimits: 95, boardStructureIndependence: 86 }, notes: [] },
          financialAuditability: { score: 260, maxScore: 300, status: 'OPTIMAL', breakdown: { registryVsFinancialMatch: 95, auditorReputation: 85, taxFilingReceipts: 90, solvencyAndRatioHealth: 90 }, notes: [] },
          crossBorderRegulatoryAndData: { score: 220, maxScore: 250, status: 'OPTIMAL', breakdown: { pdpaAndDataLocalization: 90, ipAssignmentIntegrity: 92, crossBorderTaxTreatyPrep: 88, negativeListExemption: 90 }, notes: [] },
          esgAndOperationalLegitimacy: { score: 130, maxScore: 150, status: 'OPTIMAL', breakdown: { physicalPremisesGeoCheck: 45, regulatoryLicensesSandboxes: 50, esgDisclosures: 35 }, notes: [] },
        },
      },
      verifiedRegistry: 'Department of Business Development (DBD, Thailand)',
      foreignEquityRatio: 39,
      ultimateBeneficialOwners: ['Somchai Vorapanya (51.0%)', 'Dr. Nalinee Jitsomboon (10.0%)'],
      dataLocalizationStatus: 'CERTIFIED_LOCAL_VPC',
      issueDate: '2026-10-30',
      expiryDate: '2027-10-30',
      issuer: {
        name: 'ASEAN Digital Economy Framework Trust Authority',
        acronym: 'DEFA-EKYB',
        did: 'did:asean:defa:trust-network',
        jurisdiction: 'ASEAN Secretariat Joint Trust Framework',
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-10-30T10:05:40Z',
        verificationMethod: 'did:asean:defa:trust-network#key-2026-gemma',
        proofPurpose: 'assertionMethod',
        proofValue: 'eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsic3ZsIl19..TH88910bZ2vQ8J6n4P0vB7x6kL9s2WqZp4L1r0kTAiAjQ8mP9s7Y2k1L3m4N8p9Z0q1R2s3T4u5V6w7X8y9Z',
        merkleRootHash: '0x12a9bc8301fa9901de4451992019ab00918237e192a8370129bc48018274acde',
      },
      rawVCJson: '',
      activeSanctionsCleared: true,
      tamperProofVerified: true,
    },
  },
  {
    id: 'dossier-vn-04',
    name: 'SaigonData Cloud JSC',
    country: 'VN',
    industry: 'Enterprise Sovereign AI Infrastructure & Private Cloud',
    foundedYear: 2022,
    stage: 'Series A',
    hqLocation: 'District 1, Ho Chi Minh City, Vietnam',
    targetExpansionMarkets: ['SG', 'TH', 'ID'],
    overview: 'High-performance cloud virtualization and local AI inference cluster provider compliant with Vietnam Decree 13/2023 on data localization.',
    rawSampleDocuments: [
      {
        id: 'doc-erc-01',
        name: 'Giay_Chung_Nhan_Dang_Ky_Doanh_Nghiep_ERC.pdf',
        type: 'registry_profile',
        language: 'Vietnamese',
        rawText: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
SỞ KẾ HOẠCH VÀ ĐẦU TƯ THÀNH PHỐ HỒ CHÍ MINH
PHÒNG ĐĂNG KÝ KINH DOANH

GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP
CÔNG TY CỔ PHẦN (ERC)
Mã số doanh nghiệp: 0317892140
Đăng ký lần đầu: ngày 12 tháng 09 năm 2022

1. Tên công ty:
Tên công ty viết bằng tiếng Việt: CÔNG TY CỔ PHẦN ĐIỆN TOÁN ĐÁM MÂY SAIGONDATA
Tên công ty viết bằng tiếng nước ngoài: SAIGONDATA CLOUD JOINT STOCK COMPANY
Tên viết tắt: SAIGONDATA CLOUD JSC

2. Địa chỉ trụ sở chính:
Tầng 14, Tòa nhà Bitexco Financial Tower, số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam.

3. Vốn điều lệ:
Vốn điều lệ: 35.000.000.000 VNĐ (Ba mươi lăm tỷ đồng Việt Nam).
Mệnh giá cổ phần: 10.000 VNĐ.
Tổng số cổ phần: 3.500.000 cổ phần.
Vốn thực góp: 35.000.000.000 VNĐ (Đã góp đủ 100% trong thời hạn 90 ngày theo Điều 113 Luật Doanh nghiệp 2020).

4. Người đại diện theo pháp luật:
Họ và tên: NGUYỄN VĂN MINH
Chức danh: Tổng Giám đốc
Quốc tịch: Việt Nam | CCCD số: 079089012489
Nơi thường trú: Phường Tân Phong, Quận 7, TP. Hồ Chí Minh.

5. Tuân thủ Nghị định 13/2023/NĐ-CP:
Toàn bộ cụm máy chủ và dữ liệu nhật ký vận hành đặt tại Trung tâm Dữ liệu VNPT IDC Tân Thuận, TP. Hồ Chí Minh.
Hồ sơ đánh giá tác động xử lý dữ liệu cá nhân (DPIA) đã gửi Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05 - Bộ Công an).`,
        notes: 'Vietnamese ERC certificate. 100% contributed capital verified under Law on Enterprises 2020. Strict Decree 13 DPIA filing completed.',
      },
    ],
    extraction: {
      companyName: 'Công ty Cổ phần Điện toán Đám mây SaigonData (SaigonData Cloud JSC)',
      registrationNumber: '0317892140',
      registrySource: 'Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh (Vietnam DPI/ERC)',
      incorporationDate: '2022-09-12',
      legalForm: 'Joint Stock Company (Công ty Cổ phần)',
      registeredAddress: 'Bitexco Financial Tower, 2 Hai Trieu, Ben Nghe, District 1, Ho Chi Minh City, Vietnam',
      paidUpCapital: {
        amount: 35000000000,
        currency: 'VND',
        formatted: 'VND 35,000,000,000 (~USD 1,380,000)',
      },
      directors: [
        { name: 'Nguyễn Văn Minh', nationality: 'Vietnamese', role: 'General Director & Legal Representative', appointmentDate: '2022-09-12', isResident: true },
      ],
      shareholders: [
        { name: 'Nguyễn Văn Minh', shares: 1750000, percentage: 50, country: 'VN', entityType: 'Natural Person (Founder)' },
        { name: 'Trần Thị Thu Trang', shares: 875000, percentage: 25, country: 'VN', entityType: 'Natural Person (Co-founder)' },
        { name: 'Mekong Regional Tech Fund LP', shares: 875000, percentage: 25, country: 'SG', entityType: 'Foreign Investment Fund' },
      ],
      statutoryCharges: [],
      complianceFlags: [
        {
          severity: 'verified',
          category: 'data_sovereignty',
          code: 'VN_DECREE_13_COMPLIANT',
          title: 'Decree 13 Data Localization Certified',
          description: 'Data center hosting at VNPT IDC Tan Thuan, HCMC with DPIA submission receipt from A05 Ministry of Public Security.',
        },
        {
          severity: 'verified',
          category: 'registry',
          code: 'VN_CAPITAL_90_DAYS_PAID',
          title: 'Charter Capital Fully Contributed',
          description: 'VND 35B contributed in full within 90-day statutory window pursuant to Article 113 Law on Enterprises 2020.',
        },
      ],
      gemmaParsingConfidence: 0.98,
      sourceLanguage: 'Vietnamese',
    },
    uboTree: {
      id: 'node-vn-saigon',
      name: 'SaigonData Cloud JSC',
      type: 'corporate_entity',
      jurisdiction: 'Vietnam (DPI)',
      ownershipPercentage: 100,
      votingRightsPercentage: 100,
      isUBO: false,
      sanctionWatchlistStatus: 'CLEARED',
      children: [
        {
          id: 'node-nguyen-minh',
          name: 'Nguyễn Văn Minh',
          type: 'natural_person',
          jurisdiction: 'Vietnam',
          ownershipPercentage: 50,
          votingRightsPercentage: 50,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
        },
        {
          id: 'node-tran-trang',
          name: 'Trần Thị Thu Trang',
          type: 'natural_person',
          jurisdiction: 'Vietnam',
          ownershipPercentage: 25,
          votingRightsPercentage: 25,
          isUBO: true,
          sanctionWatchlistStatus: 'CLEARED',
        },
        {
          id: 'node-mekong-fund',
          name: 'Mekong Regional Tech Fund LP',
          type: 'vc_fund',
          jurisdiction: 'Singapore',
          ownershipPercentage: 25,
          votingRightsPercentage: 25,
          isUBO: false,
          sanctionWatchlistStatus: 'CLEARED',
        },
      ],
    },
    airs: {
      totalScore: 922,
      tier: 'ENTERPRISE_READY',
      calculatedAt: '2026-10-30T09:30:00Z',
      pillars: {
        governanceAndUbo: {
          score: 285,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: { naturalPersonTraceability: 96, sanctionsAndPEP: 100, statutoryOwnershipLimits: 94, boardStructureIndependence: 95 },
          notes: ['75% held directly by Vietnamese executive founders; single legal rep clearly empowered.'],
        },
        financialAuditability: {
          score: 275,
          maxScore: 300,
          status: 'OPTIMAL',
          breakdown: { registryVsFinancialMatch: 98, auditorReputation: 92, taxFilingReceipts: 92, solvencyAndRatioHealth: 88 },
          notes: ['Audited financial statements by KPMG Vietnam; VAT and Corporate Income Tax (CIT) clearance receipts verified.'],
        },
        crossBorderRegulatoryAndData: {
          score: 232,
          maxScore: 250,
          status: 'OPTIMAL',
          breakdown: { pdpaAndDataLocalization: 98, ipAssignmentIntegrity: 90, crossBorderTaxTreatyPrep: 88, negativeListExemption: 94 },
          notes: ['Exemplary Decree 13/2023/ND-CP compliance with cross-border data transfer impact assessment on file.'],
        },
        esgAndOperationalLegitimacy: {
          score: 130,
          maxScore: 150,
          status: 'OPTIMAL',
          breakdown: { physicalPremisesGeoCheck: 46, regulatoryLicensesSandboxes: 50, esgDisclosures: 34 },
          notes: ['Tier III data center compliance audit passed (Uptime Institute certified facility).'],
        },
      },
    },
    passport: {
      id: 'pass-vn-004',
      passportNumber: 'ASP-VN-2026-92214',
      did: 'did:asean:ekyb:vn:dpi:0317892140',
      startupName: 'SaigonData Cloud JSC',
      country: 'VN',
      registrationNumber: '0317892140',
      incorporationDate: '2022-09-12',
      airsScore: {
        totalScore: 922,
        tier: 'ENTERPRISE_READY',
        calculatedAt: '2026-10-30T09:30:00Z',
        pillars: {
          governanceAndUbo: { score: 285, maxScore: 300, status: 'OPTIMAL', breakdown: { naturalPersonTraceability: 96, sanctionsAndPEP: 100, statutoryOwnershipLimits: 94, boardStructureIndependence: 95 }, notes: [] },
          financialAuditability: { score: 275, maxScore: 300, status: 'OPTIMAL', breakdown: { registryVsFinancialMatch: 98, auditorReputation: 92, taxFilingReceipts: 92, solvencyAndRatioHealth: 88 }, notes: [] },
          crossBorderRegulatoryAndData: { score: 232, maxScore: 250, status: 'OPTIMAL', breakdown: { pdpaAndDataLocalization: 98, ipAssignmentIntegrity: 90, crossBorderTaxTreatyPrep: 88, negativeListExemption: 94 }, notes: [] },
          esgAndOperationalLegitimacy: { score: 130, maxScore: 150, status: 'OPTIMAL', breakdown: { physicalPremisesGeoCheck: 46, regulatoryLicensesSandboxes: 50, esgDisclosures: 34 }, notes: [] },
        },
      },
      verifiedRegistry: 'Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh (Vietnam DPI)',
      foreignEquityRatio: 25,
      ultimateBeneficialOwners: ['Nguyễn Văn Minh (50.0%)', 'Trần Thị Thu Trang (25.0%)'],
      dataLocalizationStatus: 'CERTIFIED_LOCAL_VPC',
      issueDate: '2026-10-30',
      expiryDate: '2027-10-30',
      issuer: {
        name: 'ASEAN Digital Economy Framework Trust Authority',
        acronym: 'DEFA-EKYB',
        did: 'did:asean:defa:trust-network',
        jurisdiction: 'ASEAN Secretariat Joint Trust Framework',
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-10-30T09:35:10Z',
        verificationMethod: 'did:asean:defa:trust-network#key-2026-gemma',
        proofPurpose: 'assertionMethod',
        proofValue: 'eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsic3ZsIl19..VN031789bZ2vQ8J6n4P0vB7x6kL9s2WqZp4L1r0kTAiAjQ8mP9s7Y2k1L3m4N8p9Z0q1R2s3T4u5V6w7X8y9Z',
        merkleRootHash: '0x448a901ceb3294191d84981290ab918237e192a8370129bc48018274acde4401',
      },
      rawVCJson: '',
      activeSanctionsCleared: true,
      tamperProofVerified: true,
    },
  },
];

// Helper to generate realistic raw W3C Verifiable Credential JSON string
export function generateW3CCredentialJSON(dossier: StartupDossier): string {
  const vc = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://schema.org',
      'https://asean.org/trust/ekyb/v1',
    ],
    id: `urn:uuid:${dossier.passport.passportNumber.toLowerCase()}`,
    type: ['VerifiableCredential', 'AseanStartupPassportCredential'],
    issuer: {
      id: dossier.passport.issuer.did,
      name: dossier.passport.issuer.name,
      jurisdiction: dossier.passport.issuer.jurisdiction,
    },
    issuanceDate: dossier.passport.issueDate + 'T00:00:00Z',
    expirationDate: dossier.passport.expiryDate + 'T23:59:59Z',
    credentialSubject: {
      id: dossier.passport.did,
      legalName: dossier.extraction.companyName,
      tradingName: dossier.name,
      countryCode: dossier.country,
      registrySource: dossier.extraction.registrySource,
      registrationNumber: dossier.extraction.registrationNumber,
      incorporationDate: dossier.extraction.incorporationDate,
      registeredAddress: dossier.extraction.registeredAddress,
      paidUpCapital: dossier.extraction.paidUpCapital,
      airsScore: {
        composite: dossier.airs.totalScore,
        tier: dossier.airs.tier,
        auditBreakdown: {
          governanceAndUbo: `${dossier.airs.pillars.governanceAndUbo.score}/300`,
          financialAuditability: `${dossier.airs.pillars.financialAuditability.score}/300`,
          crossBorderCompliance: `${dossier.airs.pillars.crossBorderRegulatoryAndData.score}/250`,
          esgOperational: `${dossier.airs.pillars.esgAndOperationalLegitimacy.score}/150`,
        },
      },
      ultimateBeneficialOwners: dossier.passport.ultimateBeneficialOwners,
      foreignEquityRatio: `${dossier.passport.foreignEquityRatio}%`,
      dataLocalizationCertified: dossier.passport.dataLocalizationStatus,
      sanctionsStatus: 'PASSED_OFAC_MAS_BNM_CLEARED',
    },
    evidence: [
      {
        id: `urn:evidence:registry:${dossier.country}`,
        type: ['DocumentVerification', 'GemmaMultilingualNER'],
        verifier: 'Gemma-2-9B-Asean-Legal-Model',
        parsingConfidence: `${Math.round(dossier.extraction.gemmaParsingConfidence * 100)}%`,
        documentsVerified: dossier.rawSampleDocuments.map(d => d.name),
      },
    ],
    proof: dossier.passport.proof,
  };

  return JSON.stringify(vc, null, 2);
}

// Populate rawVCJson for initial dossiers
SAMPLE_DOSSIERS.forEach(d => {
  d.passport.rawVCJson = generateW3CCredentialJSON(d);
});
