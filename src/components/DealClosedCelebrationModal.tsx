import React from 'react';
import { useLanguage } from '../i18n';
import { Deal } from '../types/deals';
import { CorporateLogoBadge } from './BrandLogos';
import { Trophy, CheckCircle2, ShieldCheck, ArrowRight, X, Sparkles, Globe2, Handshake } from 'lucide-react';

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
  const { t } = useLanguage();
  if (!isOpen || !deal) return null;

  const isInvestment = deal.dealType === 'investment';
  const isMarketExpansion = deal.dealType === 'market_expansion';
  const isCrossBorderPoc = deal.dealType === 'cross_border_poc';

  const headingText = isInvestment
    ? '🎉 Investment Secured!'
    : isMarketExpansion
    ? '🎉 New ASEAN Market Entered!'
    : isCrossBorderPoc
    ? '🎉 New Corporate Client Secured!'
    : '🎉 Commercial Partnership Secured!';

  const subHeading = isInvestment
    ? `Investor: ${deal.corporateName} · Seed Equity Investment`
    : isMarketExpansion
    ? `Distribution Partner: ${deal.corporateName} (Vietnam)`
    : isCrossBorderPoc
    ? `Anchor Corporate Partner: ${deal.corporateName} (Indonesia)`
    : `Enterprise Healthcare Partner: ${deal.corporateName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center overflow-hidden border border-purple-100">
        {/* Decorative confetti gradient */}
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
            <span>
              {isInvestment ? 'Investment Round Executed' : isMarketExpansion ? 'Cross-Border Channel Finalized' : 'Commercial Agreement Signed'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {headingText}
          </h2>
          <p className="text-sm font-semibold text-slate-700">
            {subHeading}
          </p>
        </div>

        {/* Dynamic Result Screen Details matching Prompt Specification */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-left space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CorporateLogoBadge type={deal.corporateLogo} name={deal.corporateName} size="sm" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{deal.corporateName}</h4>
                <p className="text-xs text-slate-500">{deal.corporateCountry}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">
                {isInvestment ? 'Funding Secured' : 'Contract Value'}
              </span>
              <span className="text-base font-black text-emerald-600 font-mono">
                {deal.dealValue}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-slate-100">
              <span className="text-slate-400 block text-[10px]">{t('Outcome Type')}</span>
              <span className="font-bold text-slate-800 text-[11px] block mt-0.5">
                {deal.recommendedOutcome}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-100">
              <span className="text-slate-400 block text-[10px]">{t('Cross-Border Corridor')}</span>
              <span className="font-bold text-slate-800 text-[11px] block mt-0.5">
                {deal.startupCountry} → {deal.corporateCountry}
              </span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="font-semibold">
                {isInvestment ? 'Definitive SHA Signed' : isMarketExpansion ? 'Distribution Agreement Signed' : 'Commercial MSA Approved'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
              <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>{t('Gemma 4 eKYB Cleared')}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              onClose();
              onViewDeal(deal.id);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <span>{t('View Deal Journey in Tracker')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-[10px] text-slate-400 font-mono truncate">
          Certificate: {deal.dealClosedDetails?.certificateHash || '0x8892fbc19028abef18290142890acbd0918237e192a8370129bc48018274acde'}
        </p>
      </div>
    </div>
  );
};
