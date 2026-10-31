import React from 'react';
import { Deal } from '../types/deals';
import { CorporateLogoBadge } from './BrandLogos';
import { Trophy, CheckCircle2, ShieldCheck, Download, ArrowRight, X, Sparkles, Building2 } from 'lucide-react';

interface DealClosedCelebrationModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDeal: (dealId: string) => void;
}

export const DealClosedCelebrationModal: React.FC<DealClosedCelebrationModalProps> = ({
  deal,
  isOpen,
  onClose,
  onViewDeal,
}) => {
  if (!isOpen || !deal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center overflow-hidden border border-purple-100">
        {/* Subtle decorative confetti gradient */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-br from-purple-200 to-indigo-100 opacity-60 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 opacity-60 blur-2xl" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Trophy Badge */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-xl shadow-amber-400/30 text-white animate-bounce duration-1000">
          <Trophy className="h-10 w-10 text-white" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 tracking-wider uppercase">
            <Sparkles className="h-4 w-4" />
            <span>Commercial Partnership Executed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Congratulations, Jane!
          </h2>
          <p className="text-base font-semibold text-slate-700">
            You have officially secured <span className="text-indigo-600">{deal.corporateName}</span> as your new enterprise client!
          </p>
        </div>

        {/* Deal Summary Card */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-left space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CorporateLogoBadge type={deal.corporateLogo} name={deal.corporateName} size="sm" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{deal.corporateName}</h4>
                <p className="text-xs text-slate-500">{deal.challengeTitle}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Contract Value</span>
              <span className="text-base font-black text-emerald-600 font-mono">
                {deal.dealValue}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>MSA & SLA Executed</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>eKYB Pre-Cleared</span>
            </div>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onViewDeal(deal.id);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <span>View Client in Deals Tracker</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Certificate Hash: {deal.dealClosedDetails?.certificateHash ? `${deal.dealClosedDetails.certificateHash.slice(0, 24)}...` : 'Verified via W3C VC Trust Layer'}
        </p>
      </div>
    </div>
  );
};
