import React from 'react';
import { useLanguage } from '../i18n';
import { UserProfile, CorporateChallenge, Deal } from '../types/deals';
import { CorporateLogoBadge } from './BrandLogos';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Building2,
  ExternalLink,
  Sparkles,
  MapPin,
  Check
} from 'lucide-react';

interface MyProfileViewProps {
  profile: UserProfile;
  recommendedChallenges: CorporateChallenge[];
  activeDeal: Deal;
  onApplyChallenge: (challenge: CorporateChallenge) => void;
  onViewAllChallenges: () => void;
  onViewDealsTracker: () => void;
  onViewEkybPassport: () => void;
  onToggleChecklistItem: (id: string) => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  profile,
  recommendedChallenges,
  activeDeal,
  onApplyChallenge,
  onViewAllChallenges,
  onViewDealsTracker,
  onViewEkybPassport,
  onToggleChecklistItem,
}) => {
  const { t } = useLanguage();
  // Stepper helper for "Your Deal Progress"
  const dealStages = [
    { key: 'ai_matched', label: 'Matched', icon: CheckCircle2 },
    { key: 'meeting_scheduled', label: 'Meeting', icon: Calendar },
    { key: 'proposal_submitted', label: 'Proposal', icon: FileText },
    { key: 'deal_closed', label: 'Closed', icon: CheckCircle2 },
  ];

  const getStageIndex = (stage: string) => {
    switch (stage) {
      case 'ai_matched':
        return 0;
      case 'meeting_scheduled':
        return 1;
      case 'proposal_submitted':
      case 'negotiation':
      case 'poc_pilot':
        return 2;
      case 'deal_closed':
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = getStageIndex(activeDeal.currentStage);

  return (
    <div className="space-y-6">
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Welcome back, {profile.name.split(' ')[0]}</span>
          <span className="text-2xl">👋</span>
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Your ASEAN startup opportunities
        </p>
      </div>

      {/* Complete Your Startup Profile Banner matching Image 1 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ececff] via-[#f2f0ff] to-[#ebe8ff] p-5 sm:p-6 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          {/* Radial Circular Progress Meter */}
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              {/* Background Circle */}
              <path
                className="text-indigo-200/60"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress Circle */}
              <path
                className="text-indigo-600 transition-all duration-1000 ease-out"
                strokeDasharray={`${profile.profileCompletionPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-base font-extrabold text-indigo-700 font-mono">
                {profile.profileCompletionPercent}%
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Complete Your Startup Profile
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-md">
              Add more details to get better matches with regional investors and enterprises.
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs">
              <span className="font-semibold text-indigo-600 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                eKYB Passport {profile.airsScore}/1000
              </span>
              <span className="text-slate-400">·</span>
              <button
                onClick={onViewEkybPassport}
                className="text-slate-600 hover:text-indigo-600 underline font-medium"
              >
                View W3C Credential
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onViewEkybPassport}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all shrink-0"
        >
          <span>{t('Update Profile')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Two Column Grid matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Recommended Challenges */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t('Recommended Challenges')}</h3>
              </div>
              <button
                onClick={onViewAllChallenges}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>{t('See All')}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendedChallenges.slice(0, 2).map((ch) => (
                <div
                  key={ch.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:border-indigo-200 hover:bg-white hover:shadow-md flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <CorporateLogoBadge type={ch.corporateLogo} name={ch.corporateName} size="sm" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {ch.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {ch.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                        <span className="p-1 rounded bg-slate-200/60 text-[10px]">
                          💼 {ch.budget}
                        </span>
                        <span className="text-indigo-600 font-sans text-[11px]">
                          {ch.aiMatchScore}% AI Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyChallenge(ch)}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors shrink-0"
                  >
                    <span>{t('Apply')}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Your Deal Progress */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t('Your Deal Progress')}</h3>
              </div>
              <button
                onClick={onViewDealsTracker}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>{t('Track Deals')}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Active deal info banner */}
            <div className="mb-6 rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <CorporateLogoBadge type={activeDeal.corporateLogo} name={activeDeal.corporateName} size="sm" />
                <div>
                  <span className="font-bold text-slate-900 block">{activeDeal.corporateName}</span>
                  <span className="text-slate-500 text-[11px] truncate block max-w-xs">{activeDeal.challengeTitle}</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                {activeDeal.dealValue}
              </span>
            </div>

            {/* Stepper with icons matching Image 1 */}
            <div className="relative py-4 px-2">
              {/* Stepper connecting background track */}
              <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
              {/* Active filled track */}
              <div
                className="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-indigo-600 -z-0 transition-all duration-500"
                style={{ width: `${(currentStep / (dealStages.length - 1)) * 80}%` }}
              />

              <div className="relative z-10 flex items-center justify-between">
                {dealStages.map((stg, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={stg.key} className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm ${
                          isDone
                            ? 'bg-indigo-600 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <stg.icon className="h-4 w-4" />
                      </div>
                      <span
                        className={`mt-2 text-xs font-semibold ${
                          isCurrent ? 'text-indigo-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {stg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{t('Next Action: Partner discovery meeting scheduled')}</span>
            <button
              onClick={onViewDealsTracker}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Manage Appointment →
            </button>
          </div>
        </div>
      </div>

      {/* Startup Profile Details & Checklist */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-indigo-600" />
              <span>{profile.companyName}</span>
              <span className="text-xs font-normal text-slate-500">({profile.companyCountry})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{profile.bio}</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold font-mono">
              eKYB Verified: {profile.uenOrRegNumber}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Readiness & Match Optimization Checklist
            </h4>
            <div className="space-y-2">
              {profile.checklist.map((item) => (
                <label
                  key={item.id}
                  onClick={() => onToggleChecklistItem(item.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors text-xs"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className={`flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                    {item.task}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-600">
                    +{item.points}%
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Regional Expansion Markets & Tech */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target ASEAN Markets
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.targetAseanMarkets.map((m, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Core Capabilities & Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
