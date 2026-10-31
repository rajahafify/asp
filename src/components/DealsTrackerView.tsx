import React, { useState } from 'react';
import { Deal, DEAL_STAGES, DealStage } from '../types/deals';
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
  ExternalLink
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

  const activeDeal = deals.find((d) => d.id === activeDealId) || deals[0];

  const getStageIndex = (stage: DealStage) => {
    return DEAL_STAGES.findIndex((s) => s.stage === stage);
  };

  const currentStageIndex = activeDeal ? getStageIndex(activeDeal.currentStage) : 0;

  const handleNextStage = () => {
    if (!activeDeal) return;
    const nextIdx = currentStageIndex + 1;
    if (nextIdx < DEAL_STAGES.length) {
      const nextStage = DEAL_STAGES[nextIdx].stage;
      onAdvanceDealStage(activeDeal.id, nextStage);
      if (nextStage === 'deal_closed') {
        onCloseDealCelebration({ ...activeDeal, currentStage: 'deal_closed' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <Handshake className="h-4 w-4" />
            <span>Step 6: Deal Progress & Appointments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Deals Tracker
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1 max-w-3xl">
            Track meetings, review proposal submissions, monitor POC pilots, and close enterprise partnerships across ASEAN.
          </p>
        </div>

        <button
          onClick={onPostNewSolution}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all shrink-0"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Post New Solution</span>
        </button>
      </div>

      {/* Active Deals Horizontal Switcher */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        {deals.map((deal) => {
          const isSelected = deal.id === activeDeal?.id;
          const stageIdx = getStageIndex(deal.currentStage);
          const isClosed = deal.currentStage === 'deal_closed';

          return (
            <button
              key={deal.id}
              onClick={() => setActiveDealId(deal.id)}
              className={`flex items-center gap-3 rounded-2xl p-4 transition-all text-left border min-w-[260px] shrink-0 ${
                isSelected
                  ? 'border-indigo-500 bg-white shadow-md shadow-indigo-100 ring-2 ring-indigo-100'
                  : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
              }`}
            >
              <CorporateLogoBadge type={deal.corporateLogo} name={deal.corporateName} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{deal.corporateName}</h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-600">
                    {deal.dealValue}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{deal.challengeTitle}</p>
                <div className="mt-1.5 flex items-center justify-between text-[10px]">
                  <span className={`font-semibold ${isClosed ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    {DEAL_STAGES[stageIdx]?.label}
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
          {/* Main 6-Stage Progress Stepper Card */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                <CorporateLogoBadge type={activeDeal.corporateLogo} name={activeDeal.corporateName} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Enterprise Lead · {activeDeal.leadDate}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-mono font-bold text-indigo-600">
                      {activeDeal.matchScore}% AI Match
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    {activeDeal.corporateName} — {activeDeal.challengeTitle}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Estimated Value</span>
                  <span className="text-lg font-black text-emerald-600 font-mono">{activeDeal.dealValue}</span>
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
                    <span>View Client Celebration</span>
                  </button>
                )}
              </div>
            </div>

            {/* 6-Step Visual Progress Bar */}
            <div className="relative pt-4 pb-2">
              <div className="hidden lg:grid grid-cols-6 gap-2">
                {DEAL_STAGES.map((stg, idx) => {
                  const isDone = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div
                      key={stg.stage}
                      className={`relative rounded-2xl p-3.5 border transition-all text-left ${
                        isCurrent
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-sm'
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
                        <span className="text-[10px] font-mono text-slate-400">Step {stg.stepNumber}</span>
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
                  Current Stage: {DEAL_STAGES[currentStageIndex]?.label} (Step {currentStageIndex + 1}/6)
                </span>
                <span className="text-slate-400 font-mono">
                  {Math.round(((currentStageIndex + 1) / 6) * 100)}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Contextual Stage Detail Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Stage 2 Detail: Meeting Scheduled & Appointments */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Step 2: Meeting & Discovery Appointment
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600">
                  Confirmed
                </span>
              </div>

              {activeDeal.scheduledMeeting ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date & Time</span>
                      <span className="font-bold text-slate-900 block mt-0.5 font-mono">
                        {activeDeal.scheduledMeeting.date}
                      </span>
                      <span className="text-slate-600">{activeDeal.scheduledMeeting.time}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Location / Link</span>
                      <span className="font-semibold text-slate-800 block mt-0.5 truncate">
                        {activeDeal.scheduledMeeting.location}
                      </span>
                      <a
                        href={activeDeal.scheduledMeeting.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold mt-0.5"
                      >
                        <Video className="h-3 w-3" />
                        <span>Join Call Link</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider mb-2">
                      Confirmed Attendees ({activeDeal.scheduledMeeting.attendees.length})
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {activeDeal.scheduledMeeting.attendees.map((att, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                          <span>{att}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => alert(`Calendar invite sent for ${activeDeal.scheduledMeeting?.date}!`)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Add to Google Calendar
                    </button>
                    <button
                      onClick={() => alert('Reschedule request sent to corporate partner.')}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Reschedule Meeting
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  Meeting scheduling in progress. Both parties are coordinating calendar availability.
                </div>
              )}
            </div>

            {/* Stage 3 & 4 Detail: Proposal Submitted & Negotiation Terms */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Step 3 & 4: Submitted Proposal & Term Sheet
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>eKYB Certified</span>
                </div>
              </div>

              {activeDeal.submittedProposal ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Proposal Title</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                      {activeDeal.submittedProposal.title}
                    </h4>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {activeDeal.submittedProposal.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Commercial Value</span>
                      <span className="font-bold text-emerald-600 text-xs">
                        {activeDeal.submittedProposal.pricingTier}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Estimated Timeline</span>
                      <span className="font-semibold text-slate-800 text-xs">
                        {activeDeal.submittedProposal.timeline}
                      </span>
                    </div>
                  </div>

                  {activeDeal.negotiationTerms && (
                    <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 space-y-1.5 text-[11px]">
                      <span className="font-bold text-indigo-950 block">Negotiated SLA & Legal Framework:</span>
                      <p className="text-indigo-800">
                        • {activeDeal.negotiationTerms.contractType}
                      </p>
                      <p className="text-indigo-800">
                        • {activeDeal.negotiationTerms.ipOwnership}
                      </p>
                      <p className="text-indigo-800">
                        • {activeDeal.negotiationTerms.dataResidencyCompliance}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No proposal submitted yet. Use "Post Solution" to send your proposal.
                </div>
              )}
            </div>

            {/* Stage 5 Detail: POC / Pilot Project Milestones */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Step 5: POC / Pilot Project Milestones
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Real Project Testing
                </span>
              </div>

              {activeDeal.pocMilestones && activeDeal.pocMilestones.length > 0 ? (
                <div className="space-y-2.5">
                  {activeDeal.pocMilestones.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/60 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            m.status === 'completed'
                              ? 'bg-emerald-500'
                              : m.status === 'in_progress'
                              ? 'bg-indigo-600 animate-pulse'
                              : 'bg-slate-300'
                          }`}
                        />
                        <span className="font-semibold text-slate-800">{m.title}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-slate-400">{m.targetDate}</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : m.status === 'in_progress'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {m.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  POC milestones will be defined once proposal negotiations conclude.
                </div>
              )}
            </div>

            {/* Stage 6 & 7: Deal Closed & Client Confirmed */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Step 6 & 7: Partnership Approved & Client Secured
                  </h3>
                </div>
                {activeDeal.currentStage === 'deal_closed' ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                    Deal Closed 🎉
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      onAdvanceDealStage(activeDeal.id, 'deal_closed');
                      onCloseDealCelebration({ ...activeDeal, currentStage: 'deal_closed' });
                    }}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Simulate Client Approval →
                  </button>
                )}
              </div>

              {activeDeal.currentStage === 'deal_closed' ? (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Commercial Partnership Active</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    {activeDeal.corporateName} is now an active client of SingaLogistics. Annual Contract Value of {activeDeal.dealValue} confirmed under certified eKYB credentials.
                  </p>
                  <button
                    onClick={() => onCloseDealCelebration(activeDeal)}
                    className="mt-2 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>View Client Celebration Screen</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 leading-relaxed">
                  Upon completion of POC benchmarks and board approval, the contract is executed and {activeDeal.corporateName} becomes your official enterprise client!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
