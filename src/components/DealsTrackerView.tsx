import React, { useState } from 'react';
import { Deal, DealStage, getStagesForDealType } from '../types/deals';
import { CorporateLogoBadge } from './BrandLogos';
import {
  Handshake,
  Calendar,
  Clock,
  Video,
  FileText,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Trophy,
  Users,
  Building2,
  ExternalLink,
  Layers,
  Columns,
  Check,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface DealsTrackerViewProps {
  deals: Deal[];
  onAdvanceDealStage: (dealId: string, nextStage: DealStage) => void;
  onCloseDealCelebration: (deal: Deal) => void;
  onPostNewSolution: () => void;
  selectedDealId?: string | null;
}

export const DealsTrackerView: React.FC<DealsTrackerViewProps> = ({
  deals,
  onAdvanceDealStage,
  onCloseDealCelebration,
  onPostNewSolution,
  selectedDealId,
}) => {
  const [activeDealId, setActiveDealId] = useState<string>(
    selectedDealId || deals[0]?.id || ''
  );
  const [viewMode, setViewMode] = useState<'pipeline' | 'matrix'>('pipeline');

  const activeDeal = deals.find((d) => d.id === activeDealId) || deals[0];

  // Dynamic stages tailored to the current deal type!
  const dynamicStages = activeDeal ? getStagesForDealType(activeDeal.dealType) : [];

  const getStageIndex = (stage: DealStage) => {
    return dynamicStages.findIndex((s) => s.stage === stage);
  };

  const currentStageIndex = activeDeal ? getStageIndex(activeDeal.currentStage) : 0;

  const handleNextStage = () => {
    if (!activeDeal) return;
    const nextIdx = currentStageIndex + 1;
    if (nextIdx < dynamicStages.length) {
      const nextStage = dynamicStages[nextIdx].stage;
      onAdvanceDealStage(activeDeal.id, nextStage);
      if (nextStage === 'deal_closed') {
        onCloseDealCelebration({ ...activeDeal, currentStage: 'deal_closed' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header with Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <Handshake className="h-4 w-4" />
            <span>Deal Journey & Lifecycle Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Deals Tracker
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1 max-w-3xl">
            Adaptive 6-stage deal pipelines with dynamic Stage 5 (POC Pilot vs Due Diligence vs Market Entry Pilot) across all 4 ASEAN problem statement cases.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex p-1 bg-white border border-slate-200 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'pipeline'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Deal Pipeline</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Side-by-Side Matrix</span>
            </button>
          </div>

          <button
            onClick={onPostNewSolution}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Post Solution</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: SIDE-BY-SIDE 4-CASE COMPARISON MATRIX (PROMPT REQUEST) */}
      {/* ============================================================== */}
      {viewMode === 'matrix' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  4 ASEAN Ecosystem Test Cases Side-by-Side
                </h3>
                <p className="text-xs text-slate-500">
                  Comparing how the ASP platform adapts pipelines across corporate POCs, equity fundraising, SaaS contracts, and regional market expansion.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl">
                4 Outcome Typologies
              </span>
            </div>

            {/* Side-by-side comparative table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3.5">Dimension</th>
                    <th className="p-3.5 bg-indigo-50/50 text-indigo-900 border-l border-r border-indigo-100">
                      Case 1: Cross-Border POC
                    </th>
                    <th className="p-3.5">Case 2: Investment</th>
                    <th className="p-3.5">Case 3: Commercial SaaS</th>
                    <th className="p-3.5">Case 4: Market Expansion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">Startup</td>
                    <td className="p-3.5 font-bold text-slate-900 bg-indigo-50/20 border-l border-r border-indigo-100">
                      RouteSense AI
                      <span className="block text-[11px] text-slate-500 font-normal">Malaysia 🇲🇾 (Seed)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      EcoPack Labs
                      <span className="block text-[11px] text-slate-500 font-normal">Singapore 🇸🇬 (Seed)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      MedFlow Technologies
                      <span className="block text-[11px] text-slate-500 font-normal">Malaysia 🇲🇾 (Growth)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      AquaSense Innovations
                      <span className="block text-[11px] text-slate-500 font-normal">Thailand 🇹🇭 (Series A)</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">Partner</td>
                    <td className="p-3.5 font-bold text-slate-900 bg-indigo-50/20 border-l border-r border-indigo-100">
                      Nusantara Express Logistics
                      <span className="block text-[11px] text-slate-500 font-normal">Indonesia 🇮🇩 (Corporate)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      ASEAN Green Ventures
                      <span className="block text-[11px] text-slate-500 font-normal">Thailand 🇹🇭 (Venture Capital)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      PacificCare Hospitals
                      <span className="block text-[11px] text-slate-500 font-normal">Singapore 🇸🇬 (Healthcare Group)</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      VietAgri Distribution
                      <span className="block text-[11px] text-slate-500 font-normal">Vietnam 🇻🇳 (Distributor)</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">Core Need</td>
                    <td className="p-3.5 bg-indigo-50/20 border-l border-r border-indigo-100">
                      Market entry into Indonesia + Corporate pilot customer
                    </td>
                    <td className="p-3.5">
                      USD 1.2M seed funding for regional production expansion
                    </td>
                    <td className="p-3.5">
                      Regional healthcare enterprise customer for hospital SaaS
                    </td>
                    <td className="p-3.5">
                      National distribution network & cooperative access in Vietnam
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">AI Match Score</td>
                    <td className="p-3.5 font-bold text-indigo-700 bg-indigo-50/20 border-l border-r border-indigo-100">
                      94% AI Match
                      <span className="block text-[10px] text-emerald-600 font-mono">Cross-Border POC</span>
                    </td>
                    <td className="p-3.5 font-bold text-indigo-700">
                      91% AI Match
                      <span className="block text-[10px] text-emerald-600 font-mono">Investment Mandate</span>
                    </td>
                    <td className="p-3.5 font-bold text-indigo-700">
                      93% AI Match
                      <span className="block text-[10px] text-emerald-600 font-mono">Commercial SaaS</span>
                    </td>
                    <td className="p-3.5 font-bold text-indigo-700">
                      95% AI Match
                      <span className="block text-[10px] text-emerald-600 font-mono">Vietnam Market Entry</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">Custom Stage 3</td>
                    <td className="p-3.5 bg-indigo-50/20 border-l border-r border-indigo-100 font-semibold text-slate-800">
                      Proposal Submitted (8-wk pilot)
                    </td>
                    <td className="p-3.5 font-semibold text-indigo-600">
                      Pitch Submitted (Deck & Model)
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      Proposal Submitted (Clinic spec)
                    </td>
                    <td className="p-3.5 font-semibold text-indigo-600">
                      Market Plan Submitted
                    </td>
                  </tr>

                  <tr className="bg-amber-50/30">
                    <td className="p-3.5 font-bold text-amber-800 bg-amber-50/60">
                      Dynamic Stage 5 (Key Innovation)
                    </td>
                    <td className="p-3.5 font-bold text-amber-900 bg-amber-50/40 border-l border-r border-indigo-100">
                      POC / Pilot Project
                      <span className="block text-[10px] text-slate-500 font-normal">50 delivery vehicles in Jakarta</span>
                    </td>
                    <td className="p-3.5 font-bold text-amber-900">
                      Due Diligence
                      <span className="block text-[10px] text-slate-500 font-normal">Cap table, financial audit & IP</span>
                    </td>
                    <td className="p-3.5 font-bold text-amber-900">
                      POC / Pilot Project
                      <span className="block text-[10px] text-slate-500 font-normal">2 outpatient clinics testing</span>
                    </td>
                    <td className="p-3.5 font-bold text-amber-900">
                      Market Entry Pilot
                      <span className="block text-[10px] text-slate-500 font-normal">5 farming cooperatives in Mekong</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">Final Outcome</td>
                    <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/20 border-l border-r border-indigo-100">
                      🎉 Commercial Client Secured
                      <span className="block text-[10px] text-slate-500 font-mono">USD 350,000 Contract</span>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      🎉 Investment Secured
                      <span className="block text-[10px] text-slate-500 font-mono">USD 1,200,000 Seed Round</span>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      🎉 Commercial SaaS Partnership
                      <span className="block text-[10px] text-slate-500 font-mono">USD 280,000 ARR</span>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      🎉 New Market Entered
                      <span className="block text-[10px] text-slate-500 font-mono">USD 450,000 Master Order</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-400 bg-slate-50/40">Interactive Demo</td>
                    <td className="p-3.5 bg-indigo-50/20 border-l border-r border-indigo-100">
                      <button
                        onClick={() => {
                          setActiveDealId(deals[0].id);
                          setViewMode('pipeline');
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        Launch Case 1 Pipeline →
                      </button>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => {
                          setActiveDealId(deals[1].id);
                          setViewMode('pipeline');
                        }}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                      >
                        Inspect Case 2 →
                      </button>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => {
                          setActiveDealId(deals[2].id);
                          setViewMode('pipeline');
                        }}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                      >
                        Inspect Case 3 →
                      </button>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => {
                          setActiveDealId(deals[3].id);
                          setViewMode('pipeline');
                        }}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                      >
                        Inspect Case 4 →
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: INTERACTIVE DEAL PIPELINE (WITH DYNAMIC STAGE 5)       */}
      {/* ============================================================== */}
      {viewMode === 'pipeline' && (
        <div className="space-y-6">
          {/* Active Deals Horizontal Switcher */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            {deals.map((deal) => {
              const isSelected = deal.id === activeDeal?.id;
              const stages = getStagesForDealType(deal.dealType);
              const stageIdx = stages.findIndex((s) => s.stage === deal.currentStage);
              const isClosed = deal.currentStage === 'deal_closed';

              return (
                <button
                  key={deal.id}
                  onClick={() => setActiveDealId(deal.id)}
                  className={`flex items-center gap-3 rounded-2xl p-4 transition-all text-left border min-w-[280px] shrink-0 ${
                    isSelected
                      ? 'border-indigo-500 bg-white shadow-md shadow-indigo-100 ring-2 ring-indigo-100'
                      : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <CorporateLogoBadge type={deal.corporateLogo} name={deal.corporateName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-bold text-indigo-700 font-mono">
                          Case {deal.caseNumber}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 truncate">{deal.corporateName}</h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600">
                        {deal.dealValue}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{deal.recommendedOutcome}</p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px]">
                      <span className={`font-semibold ${isClosed ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {stages[stageIdx]?.label || 'Active'}
                      </span>
                      <span className="text-slate-400 font-mono">Stage {stageIdx + 1}/6</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {activeDeal && (
            <div className="space-y-6">
              {/* Main Stepper Card with Dynamic Stage 5 & Custom Stage Labels */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-4">
                    <CorporateLogoBadge type={activeDeal.corporateLogo} name={activeDeal.corporateName} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                          Mock Case {activeDeal.caseNumber} · {activeDeal.recommendedOutcome}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-mono font-bold text-emerald-600">
                          {activeDeal.matchScore}% AI Match
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">
                          {activeDeal.startupCountry} → {activeDeal.corporateCountry}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                        {activeDeal.startupName} & {activeDeal.corporateName}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-medium">
                        {activeDeal.dealType === 'investment' ? 'Target Capital' : 'Deal Value'}
                      </span>
                      <span className="text-lg font-black text-emerald-600 font-mono">
                        {activeDeal.dealValue}
                      </span>
                    </div>

                    {activeDeal.currentStage !== 'deal_closed' ? (
                      <button
                        onClick={handleNextStage}
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all"
                      >
                        <span>Advance to Next Stage</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onCloseDealCelebration(activeDeal)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                      >
                        <Trophy className="h-4 w-4" />
                        <span>View Final Outcome Screen</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 6-Step Visual Progress Bar with Dynamic Stage 5 Highlight */}
                <div className="relative pt-2 pb-2">
                  <div className="hidden lg:grid grid-cols-6 gap-2">
                    {dynamicStages.map((stg, idx) => {
                      const isDone = idx < currentStageIndex;
                      const isCurrent = idx === currentStageIndex;
                      const isStage5 = idx === 4;

                      return (
                        <div
                          key={stg.stage}
                          className={`relative rounded-2xl p-3.5 border transition-all text-left ${
                            isCurrent
                              ? 'border-indigo-500 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-200'
                              : isDone
                              ? 'border-emerald-200 bg-emerald-50/30'
                              : 'border-slate-100 bg-slate-50/40 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                                isDone
                                  ? 'bg-emerald-500 text-white'
                                  : isCurrent
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {isDone ? '✓' : stg.stepNumber}
                            </span>
                            {isStage5 && (
                              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                                Dynamic
                              </span>
                            )}
                          </div>
                          <h4
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-indigo-900 font-extrabold'
                                : isDone
                                ? 'text-slate-900'
                                : 'text-slate-500'
                            }`}
                          >
                            {stg.label}
                          </h4>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {stg.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Stepper */}
                  <div className="flex lg:hidden items-center justify-between text-xs font-bold">
                    <span className="text-indigo-600">
                      Current Stage: {dynamicStages[currentStageIndex]?.label} (Step {currentStageIndex + 1}/6)
                    </span>
                    <span className="text-slate-400 font-mono">
                      {Math.round(((currentStageIndex + 1) / 6) * 100)}% Complete
                    </span>
                  </div>
                </div>
              </div>

              {/* AI MATCH RATIONALE & EXPLANATION (PROMPT SPECIFICATION) */}
              <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/50 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Why the AI Matched Them ({activeDeal.matchScore}% Match Score)
                      </h3>
                      <p className="text-xs text-slate-600">
                        {activeDeal.aiMatchReason}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 font-mono shrink-0">
                    Recommended: {activeDeal.recommendedOutcome}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                  {activeDeal.whyMatchedBullets?.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-slate-100">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-700 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MEASURABLE POC / DEAL SUCCESS METRICS (CRITICAL FOR CASE 1) */}
              {activeDeal.measurableKpis && activeDeal.measurableKpis.length > 0 && (
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Measurable Outcome & POC Success Metrics
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                      Hypothetical Demo Benchmark
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Pre-agreed quantitative targets evaluated during the trial deployment to trigger commercial conversion.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {activeDeal.measurableKpis.map((kpi, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="text-[11px] font-bold text-slate-700 block line-clamp-1">{kpi.label}</span>
                        <div className="flex items-baseline justify-between pt-1">
                          <span className="text-xs text-slate-400 font-mono">Target:</span>
                          <span className="font-mono font-bold text-slate-800">{kpi.target}</span>
                        </div>
                        <div className="flex items-baseline justify-between text-emerald-600">
                          <span className="text-xs font-mono">Current:</span>
                          <span className="font-mono font-bold">{kpi.currentStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contextual Stage Detail Cards: Meetings, Proposal, Negotiations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Meeting Scheduled Card */}
                {activeDeal.scheduledMeeting && (
                  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stage 2</span>
                          <h3 className="text-sm font-bold text-slate-900">Scheduled Meeting Details</h3>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        Confirmed
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold">{activeDeal.scheduledMeeting.date} · {activeDeal.scheduledMeeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>{activeDeal.scheduledMeeting.location}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 block mb-1">Confirmed Attendees:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeDeal.scheduledMeeting.attendees.map((att, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-medium text-slate-700">
                              {att}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Proposal / Pitch Card */}
                {activeDeal.submittedProposal && (
                  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stage 3</span>
                          <h3 className="text-sm font-bold text-slate-900">
                            {activeDeal.dealType === 'investment' ? 'Pitch Deck & Terms' : 'Proposal Specs'}
                          </h3>
                        </div>
                      </div>
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        Gemma eKYB Cleared
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600">
                      <h4 className="font-bold text-slate-900">{activeDeal.submittedProposal.title}</h4>
                      <p className="leading-relaxed text-[11px] text-slate-500">
                        {activeDeal.submittedProposal.summary}
                      </p>
                      <div className="pt-2 flex justify-between font-mono text-[11px] border-t border-slate-100">
                        <span className="text-slate-400">Timeline:</span>
                        <span className="font-bold text-slate-800">{activeDeal.submittedProposal.timeline}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
