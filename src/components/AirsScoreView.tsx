import React, { useState } from 'react';
import { StartupDossier } from '../types/ekyb';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Server,
  Scale,
  Building2,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface AirsScoreViewProps {
  dossier: StartupDossier;
}

export const AirsScoreView: React.FC<AirsScoreViewProps> = ({ dossier }) => {
  const [activePillar, setActivePillar] = useState<'governance' | 'financial' | 'regulatory' | 'esg'>('governance');

  // Simulation toggle state
  const [remediations, setRemediations] = useState<{ [key: string]: boolean }>({
    ipAssignment: false,
    auditedFinancials: false,
    localVpcHosting: false,
    dpoAppointment: false,
  });

  const { airs } = dossier;

  // Calculate dynamic simulated score
  let bonus = 0;
  if (remediations.ipAssignment) bonus += 25;
  if (remediations.auditedFinancials) bonus += 35;
  if (remediations.localVpcHosting) bonus += 30;
  if (remediations.dpoAppointment) bonus += 20;

  const simulatedScore = Math.min(1000, airs.totalScore + bonus);
  const simulatedTier =
    simulatedScore >= 880
      ? 'ENTERPRISE_READY'
      : simulatedScore >= 750
      ? 'QUALIFIED_INVESTABLE'
      : 'PROVISIONAL';

  const toggleRemediation = (key: string) => {
    setRemediations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetSimulation = () => {
    setRemediations({
      ipAssignment: false,
      auditedFinancials: false,
      localVpcHosting: false,
      dpoAppointment: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">Automated Diligence Audit</span>
            <span>·</span>
            <span>AIRS Framework (0–1000)</span>
            <span>·</span>
            <span>Cross-Border Due Diligence Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Enterprise & Investment Readiness Score
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            A standardized, quantifiable 4-pillar audit evaluating IP hygiene, data localization compliance, ESG legitimacy, and corporate transparency.
          </p>
        </div>

        {/* Big Overall Composite Gauge */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-lg shadow-cyan-950/20 shrink-0">
          <div className="text-right">
            <span className="block text-[11px] text-slate-400 uppercase font-mono">
              Composite Readiness Score
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {simulatedScore}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 1000</span>
              {bonus > 0 && (
                <span className="text-xs font-mono text-emerald-400 ml-1">
                  (+{bonus})
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase">
              {simulatedTier.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <button
          onClick={() => setActivePillar('governance')}
          className={`text-left rounded-xl p-4 transition-all border ${
            activePillar === 'governance'
              ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-950'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400">Pillar 1 (30%)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              OPTIMAL
            </span>
          </div>
          <h4 className="font-semibold text-sm text-white">Governance & UBO Hygiene</h4>
          <div className="mt-3 flex items-baseline justify-between font-mono">
            <span className="text-xl font-bold text-cyan-300">
              {airs.pillars.governanceAndUbo.score}
            </span>
            <span className="text-xs text-slate-500">/ 300 pts</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${(airs.pillars.governanceAndUbo.score / 300) * 100}%` }}
            />
          </div>
        </button>

        {/* Pillar 2 */}
        <button
          onClick={() => setActivePillar('financial')}
          className={`text-left rounded-xl p-4 transition-all border ${
            activePillar === 'financial'
              ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-950'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400">Pillar 2 (30%)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              OPTIMAL
            </span>
          </div>
          <h4 className="font-semibold text-sm text-white">Financial & Tax Audit</h4>
          <div className="mt-3 flex items-baseline justify-between font-mono">
            <span className="text-xl font-bold text-cyan-300">
              {airs.pillars.financialAuditability.score + (remediations.auditedFinancials ? 35 : 0)}
            </span>
            <span className="text-xs text-slate-500">/ 300 pts</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{
                width: `${
                  ((airs.pillars.financialAuditability.score + (remediations.auditedFinancials ? 35 : 0)) / 300) * 100
                }%`,
              }}
            />
          </div>
        </button>

        {/* Pillar 3 */}
        <button
          onClick={() => setActivePillar('regulatory')}
          className={`text-left rounded-xl p-4 transition-all border ${
            activePillar === 'regulatory'
              ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-950'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400">Pillar 3 (25%)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              OPTIMAL
            </span>
          </div>
          <h4 className="font-semibold text-sm text-white">Data & Cross-Border</h4>
          <div className="mt-3 flex items-baseline justify-between font-mono">
            <span className="text-xl font-bold text-cyan-300">
              {airs.pillars.crossBorderRegulatoryAndData.score + (remediations.localVpcHosting ? 30 : 0) + (remediations.ipAssignment ? 25 : 0)}
            </span>
            <span className="text-xs text-slate-500">/ 250 pts</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{
                width: `${
                  ((airs.pillars.crossBorderRegulatoryAndData.score + (remediations.localVpcHosting ? 30 : 0) + (remediations.ipAssignment ? 25 : 0)) / 250) * 100
                }%`,
              }}
            />
          </div>
        </button>

        {/* Pillar 4 */}
        <button
          onClick={() => setActivePillar('esg')}
          className={`text-left rounded-xl p-4 transition-all border ${
            activePillar === 'esg'
              ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-950'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400">Pillar 4 (15%)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              OPTIMAL
            </span>
          </div>
          <h4 className="font-semibold text-sm text-white">ESG & Legitimacy</h4>
          <div className="mt-3 flex items-baseline justify-between font-mono">
            <span className="text-xl font-bold text-cyan-300">
              {airs.pillars.esgAndOperationalLegitimacy.score + (remediations.dpoAppointment ? 20 : 0)}
            </span>
            <span className="text-xs text-slate-500">/ 150 pts</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{
                width: `${
                  ((airs.pillars.esgAndOperationalLegitimacy.score + (remediations.dpoAppointment ? 20 : 0)) / 150) * 100
                }%`,
              }}
            />
          </div>
        </button>
      </div>

      {/* Main Audit Inspection & Simulation Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Selected Pillar Detailed Inspection (Left 2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Audited Findings for: {activePillar === 'governance' ? 'Governance & UBO' : activePillar === 'financial' ? 'Financial Auditability' : activePillar === 'regulatory' ? 'Cross-Border & Data Sovereignty' : 'ESG & Operational Legitimacy'}
              </span>
            </div>
          </div>

          {activePillar === 'governance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Natural Person Traceability</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.governanceAndUbo.breakdown.naturalPersonTraceability} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    All ultimate shareholders mapped through intermediate HoldCos.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Sanctions & PEP Screening</span>
                  <span className="text-base font-bold text-emerald-400">
                    {airs.pillars.governanceAndUbo.breakdown.sanctionsAndPEP} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Zero hits on OFAC, UN, MAS, or BNM registers.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Statutory Ownership Limits</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.governanceAndUbo.breakdown.statutoryOwnershipLimits} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Within domestic foreign investment negative list thresholds.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Board Governance & Independence</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.governanceAndUbo.breakdown.boardStructureIndependence} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Resident director and qualified secretary appointed.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40 text-xs">
                <span className="font-semibold text-slate-300 block mb-2">Auditor Diligence Notes:</span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {airs.pillars.governanceAndUbo.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activePillar === 'financial' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Registry vs Financial Match</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.financialAuditability.breakdown.registryVsFinancialMatch} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Capital declared on registry precisely equals audited balance sheet.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Auditor Standing</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.financialAuditability.breakdown.auditorReputation} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Statutory accounts audited by accredited regional Big 4 network.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Tax Clearance Receipts</span>
                  <span className="text-base font-bold text-emerald-400">
                    {airs.pillars.financialAuditability.breakdown.taxFilingReceipts} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Verified electronic tax receipts (SPT / BIR / CIT) on file.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Solvency & Runway Health</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.financialAuditability.breakdown.solvencyAndRatioHealth} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Positive working capital and healthy liquidity ratio.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40 text-xs">
                <span className="font-semibold text-slate-300 block mb-2">Auditor Diligence Notes:</span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {airs.pillars.financialAuditability.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activePillar === 'regulatory' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Data Localization (Decree 13 / PDP)</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.crossBorderRegulatoryAndData.breakdown.pdpaAndDataLocalization} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Core transaction logs and user PII stored within national VPC.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">IP Assignment Integrity</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.crossBorderRegulatoryAndData.breakdown.ipAssignmentIntegrity} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Full proprietary software IP assigned to corporate entity.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">DTAA Cross-Border Tax Treaty</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.crossBorderRegulatoryAndData.breakdown.crossBorderTaxTreatyPrep} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Prepared for reduced withholding tax on cross-border software licenses.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Foreign Investment Clearance</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.crossBorderRegulatoryAndData.breakdown.negativeListExemption} / 100
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Statutory approvals or BOI tech exemptions confirmed.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40 text-xs">
                <span className="font-semibold text-slate-300 block mb-2">Auditor Diligence Notes:</span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {airs.pillars.crossBorderRegulatoryAndData.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activePillar === 'esg' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Premises Physical Geo-Check</span>
                  <span className="text-base font-bold text-white">
                    {airs.pillars.esgAndOperationalLegitimacy.breakdown.physicalPremisesGeoCheck} / 50
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Registered office verified via lease deed and municipal business registry.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block text-[11px]">Regulatory Sandboxes & Licenses</span>
                  <span className="text-base font-bold text-emerald-400">
                    {airs.pillars.esgAndOperationalLegitimacy.breakdown.regulatoryLicensesSandboxes} / 50
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    FinTech sandbox admission or relevant operational license active.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40 text-xs">
                <span className="font-semibold text-slate-300 block mb-2">Auditor Diligence Notes:</span>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {airs.pillars.esgAndOperationalLegitimacy.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Remediation Simulator (Right 1 col) */}
        <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
              Remediation Simulator
            </span>
            {bonus > 0 && (
              <button
                onClick={resetSimulation}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Toggle proactive remediation items to simulate how compliance fixes uplift your AIRS score toward Enterprise Pre-Clearance (&gt; 880 pts).
          </p>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={remediations.ipAssignment}
                onChange={() => toggleRemediation('ipAssignment')}
                className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Execute Clean IP Assignment</span>
                  <span className="font-mono text-emerald-400 text-[11px]">+25 pts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Assign all founder-held patents & source code to the corporate operating entity.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={remediations.auditedFinancials}
                onChange={() => toggleRemediation('auditedFinancials')}
                className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Audit via Regional Tier-1 Firm</span>
                  <span className="font-mono text-emerald-400 text-[11px]">+35 pts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Submit unqualified clean opinion financial statements with full tax reconciliations.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={remediations.localVpcHosting}
                onChange={() => toggleRemediation('localVpcHosting')}
                className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">In-Country VPC Certification</span>
                  <span className="font-mono text-emerald-400 text-[11px]">+30 pts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Confirm domestic cloud VPC storage under Vietnam Decree 13 or Indonesia PDP Law.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={remediations.dpoAppointment}
                onChange={() => toggleRemediation('dpoAppointment')}
                className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Appoint Certified DPO</span>
                  <span className="font-mono text-emerald-400 text-[11px]">+20 pts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Register Data Protection Officer with national privacy authorities (PDPC / Kominfo).
                </p>
              </div>
            </label>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3.5 text-xs font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Baseline Score:</span>
              <span>{airs.totalScore}</span>
            </div>
            <div className="flex justify-between text-emerald-400 mt-1">
              <span>Remediation Uplift:</span>
              <span>+{bonus}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-sm mt-2 pt-2 border-t border-slate-800">
              <span>Projected AIRS Score:</span>
              <span>{simulatedScore} / 1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
