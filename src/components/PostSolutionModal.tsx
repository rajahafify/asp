import React, { useState } from 'react';
import { CorporateChallenge, Deal } from '../types/deals';
import { UserProfile } from '../types/deals';
import { ShieldCheck, Sparkles, Send, X, CheckCircle2, Building, DollarSign } from 'lucide-react';

interface PostSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: CorporateChallenge[];
  initialChallenge?: CorporateChallenge | null;
  userProfile: UserProfile;
  onSubmitSolution: (newDeal: Deal) => void;
}

export const PostSolutionModal: React.FC<PostSolutionModalProps> = ({
  isOpen,
  onClose,
  challenges,
  initialChallenge,
  userProfile,
  onSubmitSolution,
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    initialChallenge?.id || (challenges[0]?.id ?? '')
  );
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [pricing, setPricing] = useState('USD 250,000');
  const [timeline, setTimeline] = useState('8-week pilot + 6-month scale');
  const [attachEkyb, setAttachEkyb] = useState(true);

  if (!isOpen) return null;

  const currentChallenge = challenges.find((c) => c.id === selectedChallengeId) || initialChallenge || challenges[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      challengeId: currentChallenge?.id || 'open-innovation',
      corporateName: currentChallenge?.corporateName || 'Enterprise Partner',
      corporateLogo: currentChallenge?.corporateLogo || 'grab',
      challengeTitle: currentChallenge?.title || title,
      currentStage: 'proposal_submitted',
      matchScore: currentChallenge?.aiMatchScore || 95,
      dealValue: pricing,
      dealValueNumeric: parseInt(pricing.replace(/[^0-9]/g, '')) || 250000,
      leadDate: new Date().toISOString().split('T')[0],
      submittedProposal: {
        title,
        summary,
        pricingTier: pricing,
        timeline,
        ekybVerified: attachEkyb,
        submissionDate: new Date().toISOString().split('T')[0],
      },
      pocMilestones: [
        { title: 'Technical Architecture & API Review', status: 'in_progress', targetDate: 'In 2 weeks' },
        { title: 'Pilot Demonstration & Sandbox Testing', status: 'pending', targetDate: 'In 4 weeks' },
      ],
    };

    onSubmitSolution(newDeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Step 3 & 4: Solution Proposal & eKYB Gate</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Post Your Business Solution
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Submit your proposal to regional enterprises with verified ASEAN eKYB pre-clearance to fast-track deal review.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Pick Challenge */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Challenge / Corporate Partner
            </label>
            <select
              value={selectedChallengeId}
              onChange={(e) => setSelectedChallengeId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {challenges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.corporateName} ({c.country}) — {c.title} [{c.budget}]
                </option>
              ))}
            </select>
          </div>

          {/* Solution Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Solution Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Autonomous AI Logistics Batching & Real-Time Carbon Telematics"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Pitch & Approach */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Executive Proposal & Technical Approach
            </label>
            <textarea
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Explain how your technology solves the corporate's challenge, your integration timeline, and expected ROI..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Pricing & Timeline Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Proposed Pricing / Pilot Value
              </label>
              <input
                type="text"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                placeholder="e.g. USD 350,000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pilot Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g. 8-week pilot + 6-month scale"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Step 4: KYB Verification Gate */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="attach-ekyb"
                  checked={attachEkyb}
                  onChange={(e) => setAttachEkyb(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor="attach-ekyb" className="text-xs font-bold text-slate-900 cursor-pointer flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-indigo-600" />
                    <span>Attach Verified ASEAN Startup Passport (eKYB)</span>
                  </label>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Automatically certifies UEN: {userProfile.uenOrRegNumber}, AIRS Score: {userProfile.airsScore}/1000, and unrolled natural person UBOs. Pre-clears compliance checks for enterprise buyers!
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                Pre-Cleared
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Post Solution & Track Deal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
