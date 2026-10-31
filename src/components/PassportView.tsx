import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { StartupDossier } from '../types/ekyb';
import { ASEAN_REGISTRIES } from '../data/mockDossiers';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  ExternalLink,
  QrCode,
  FileCheck2,
  Lock,
  Building,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PassportViewProps {
  dossier: StartupDossier;
  onOpenJsonModal: () => void;
  onNavigateToTab: (tab: 'extraction' | 'ubo' | 'airs' | 'copilot') => void;
}

export const PassportView: React.FC<PassportViewProps> = ({
  dossier,
  onOpenJsonModal,
  onNavigateToTab,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const registry = ASEAN_REGISTRIES[dossier.country];
  const { passport, airs, extraction } = dossier;

  const handleCopyDid = () => {
    navigator.clipboard.writeText(passport.did);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadVC = () => {
    const blob = new Blob([passport.rawVCJson || JSON.stringify(passport, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${passport.passportNumber}_W3C_Credential.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Overview Kicker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">{t('ASEAN Trust Network')}</span>
            <span>·</span>
            <span>W3C Verifiable Credential v1.1</span>
            <span>·</span>
            <span>{t('Gemma eKYB Audit Standard')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Digital Startup Passport
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Pre-cleared cross-border compliance identity verified across {registry.registryAcronym} ({registry.countryName}) and 10 ASEAN jurisdictions for frictionless banking, foreign investment, and enterprise procurement.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenJsonModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-850 hover:text-white rounded-lg border border-slate-700 transition-colors"
          >
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>W3C JSON-LD</span>
          </button>
          <button
            onClick={downloadVC}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>{t('Export Credential')}</span>
          </button>
        </div>
      </div>

      {/* The Passport Physical/Digital Card */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-925 to-slate-950 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40">
        {/* Subtle security mesh background watermark */}
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Top Diplomatic Header */}
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900 text-2xl">
                {registry.flag}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
                  ASSOCIATION OF SOUTHEAST ASIAN NATIONS
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{extraction.companyName}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {dossier.industry} · {dossier.stage}
              </p>
            </div>
          </div>

          {/* Passport ID & Readiness Seal */}
          <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span>{passport.passportNumber}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              VALID: {passport.issueDate} — {passport.expiryDate}
            </span>
          </div>
        </div>

        {/* Passport Body Grid */}
        <div className="relative mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 & 2: Core Verified Registry Data */}
          <div className="md:col-span-2 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  National Entity Identifier
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-slate-100 font-mono">
                  {extraction.registrationNumber}
                </span>
                <span className="text-xs text-slate-400">
                  Registry: {extraction.registrySource}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Legal Structure
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-slate-100">
                  {extraction.legalForm}
                </span>
                <span className="text-xs text-slate-400">
                  Incorp: {extraction.incorporationDate}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Paid-Up Capital (Audited)
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-emerald-400 font-mono">
                  {extraction.paidUpCapital.formatted}
                </span>
                <span className="text-xs text-slate-400">
                  100% matched against tax receipt
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Foreign Ownership Ratio
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-slate-100 font-mono">
                  {passport.foreignEquityRatio}% Foreign Equity
                </span>
                <span className="text-xs text-cyan-400">
                  Compliant with statutory sector cap
                </span>
              </div>
            </div>

            {/* Ultimate Beneficial Owners */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Verified Natural Person Beneficiaries (UBO)
                </span>
                <button
                  onClick={() => onNavigateToTab('ubo')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  <span>{t('View Full Cap Table')}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {passport.ultimateBeneficialOwners.map((ubo, idx) => (
                  <li key={idx} className="flex items-center justify-between border-b border-slate-800/60 py-1 last:border-none">
                    <span className="font-medium text-white">{ubo}</span>
                    <span className="font-mono text-[11px] text-emerald-400">{t('Sanctions Cleared')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Sovereignty & Hosting Badge */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-cyan-400" />
                <div>
                  <span className="font-semibold text-slate-200">Data Sovereignty Status: </span>
                  <span className="text-emerald-400 font-medium">{t('Local In-Region VPC Verified')}</span>
                </div>
              </div>
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                {registry.dataSovereigntyLaw}
              </span>
            </div>
          </div>

          {/* Column 3: The AIRS Score Badge & QR Hologram */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Readiness Score
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  {airs.tier.replace('_', ' ')}
                </span>
              </div>

              {/* Big Score Gauge */}
              <div className="text-center my-4">
                <div className="text-5xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                  {airs.totalScore}
                  <span className="text-lg text-slate-500 font-normal">/1000</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  ASEAN Investment & Enterprise Readiness Score (AIRS)
                </p>
              </div>

              {/* Mini Pillar bars */}
              <div className="space-y-2 mt-4 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('Governance & UBO')}</span>
                    <span className="text-slate-200">{airs.pillars.governanceAndUbo.score}/300</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${(airs.pillars.governanceAndUbo.score / 300) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('Financial Auditability')}</span>
                    <span className="text-slate-200">{airs.pillars.financialAuditability.score}/300</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${(airs.pillars.financialAuditability.score / 300) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('Cross-Border Compliance')}</span>
                    <span className="text-slate-200">{airs.pillars.crossBorderRegulatoryAndData.score}/250</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${(airs.pillars.crossBorderRegulatoryAndData.score / 250) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('ESG & Legitimacy')}</span>
                    <span className="text-slate-200">{airs.pillars.esgAndOperationalLegitimacy.score}/150</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${(airs.pillars.esgAndOperationalLegitimacy.score / 150) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code & DID Proof Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white text-slate-950">
                  <QrCode className="h-8 w-8" />
                </div>
                <div className="text-[10px] text-slate-400">
                  <span className="block font-semibold text-slate-200">{t('Zero-Knowledge Proof')}</span>
                  <span className="font-mono text-cyan-400">{t('ES256 ECDSA Signed')}</span>
                </div>
              </div>

              <button
                onClick={handleCopyDid}
                title={t('Copy Decentralized Identifier (DID)')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Cryptographic Footnote */}
        <div className="relative mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2 truncate max-w-xl">
            <span className="text-cyan-500 font-semibold">DID:</span>
            <span className="truncate">{passport.did}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{t('Merkle Leaf:')}</span>
            <span className="text-slate-400">{passport.proof.merkleRootHash.slice(0, 16)}...</span>
          </div>
        </div>
      </div>

      {/* Pre-Clearance Acceptance Strip for Regional Banks & VCs */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Building className="h-4 w-4 text-cyan-400" />
              Pre-Cleared Enterprise & Banking Partners
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Startups with an AIRS score &gt; 850 enjoy instant account onboarding and fast-tracked institutional diligence.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Zero Redundant Document Submissions
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 text-xs">
          {[
            { name: 'DBS Bank', region: 'Singapore / Regional', status: 'Pre-Cleared' },
            { name: 'Bank Mandiri', region: 'Indonesia', status: 'Pre-Cleared' },
            { name: 'Maybank', region: 'Malaysia / Regional', status: 'Pre-Cleared' },
            { name: 'East Ventures', region: 'Southeast Asia VC', status: 'Diligence Fast-Track' },
            { name: 'Vertex Ventures', region: 'Global / ASEAN', status: 'Diligence Fast-Track' },
          ].map((partner, i) => (
            <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <span className="block font-semibold text-slate-200">{partner.name}</span>
              <span className="text-[11px] text-slate-400 block">{partner.region}</span>
              <span className="mt-1.5 inline-block text-[10px] font-mono font-medium text-emerald-400">
                ✓ {partner.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Action Pillars to Explore */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateToTab('extraction')}
          className="text-left rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h4 className="font-semibold text-white text-sm">{t('Gemma Multilingual Extraction')}</h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Inspect raw multilingual legal filings (Thai, Vietnamese, Bahasa, English) side-by-side with Gemma's normalized JSON entity resolution.
          </p>
        </button>

        <button
          onClick={() => onNavigateToTab('ubo')}
          className="text-left rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Layers className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h4 className="font-semibold text-white text-sm">{t('Beneficial Ownership (UBO) Graph')}</h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Explore the multi-tier corporate shareholding tree unrolled to ultimate natural person controllers with real-time sanctions screening.
          </p>
        </button>

        <button
          onClick={() => onNavigateToTab('airs')}
          className="text-left rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h4 className="font-semibold text-white text-sm">{t('AIRS Score Simulator')}</h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Simulate how remediating IP assignment contracts, tax reconciliations, or local VPC hosting raises your enterprise readiness score.
          </p>
        </button>
      </div>
    </div>
  );
};
