import React, { useState } from 'react';
import { CorporateChallenge } from '../types/deals';
import { CorporateLogoBadge } from './BrandLogos';
import {
  Search,
  ArrowRight,
  Briefcase,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  X
} from 'lucide-react';

interface CorporateChallengesViewProps {
  challenges: CorporateChallenge[];
  onApplyChallenge: (challenge: CorporateChallenge) => void;
  searchQuery?: string;
}

export const CorporateChallengesView: React.FC<CorporateChallengesViewProps> = ({
  challenges,
  onApplyChallenge,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Challenges');
  const [sortBy, setSortBy] = useState<'relevant' | 'budget' | 'deadline'>('relevant');
  const [activeChallengeDetail, setActiveChallengeDetail] = useState<CorporateChallenge | null>(null);

  const categories = [
    'All Challenges',
    'Technology',
    'Sustainability',
    'Healthcare',
    'Finance',
    'Retail',
    'Others',
  ];

  // Filter challenges
  let filtered = challenges.filter((c) => {
    const matchesCat =
      selectedCategory === 'All Challenges' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.corporateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort
  if (sortBy === 'budget') {
    filtered.sort((a, b) => b.rawBudgetAmount - a.rawBudgetAmount);
  } else if (sortBy === 'deadline') {
    filtered.sort((a, b) => a.deadline.localeCompare(b.deadline));
  } else {
    filtered.sort((a, b) => b.aiMatchScore - a.aiMatchScore);
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle matching Image 2 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Corporate Challenges
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Real business problems. Real budgets. Real opportunities.
        </p>
      </div>

      {/* Filter Categories and Sort Dropdown matching Image 2 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Horizontal Category Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="relevant">Most Relevant</option>
            <option value="budget">Highest Budget</option>
            <option value="deadline">Nearest Deadline</option>
          </select>
        </div>
      </div>

      {/* Challenges List matching Image 2 exactly */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const getStatusBadge = () => {
            switch (item.statusTag) {
              case 'High Priority':
                return (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-100">
                    High Priority
                  </span>
                );
              case 'Featured':
                return (
                  <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-600 border border-purple-100">
                    Featured
                  </span>
                );
              default:
                return (
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 border border-blue-100">
                    Open
                  </span>
                );
            }
          };

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Zone: Logo + Details */}
              <div className="flex items-start gap-4 sm:gap-6 flex-1">
                <div className="shrink-0">
                  <CorporateLogoBadge type={item.corporateLogo} name={item.corporateName} size="md" />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.corporateName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {item.country}
                    </span>
                    <span className="ml-auto lg:hidden">{getStatusBadge()}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-indigo-50/70 px-2.5 py-1 text-[11px] font-semibold text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-[11px] font-mono font-bold text-emerald-600 ml-2">
                      ⚡ {item.aiMatchScore}% AI Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Zone: Budget, Deadline, Status & Action Button */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="hidden lg:block mb-1">
                  {getStatusBadge()}
                </div>

                <div className="space-y-1 text-left lg:text-right">
                  <div className="flex items-center lg:justify-end gap-1.5 text-xs text-slate-500">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <span>Budget:</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">{item.budget}</span>
                  </div>

                  <div className="flex items-center lg:justify-end gap-1.5 text-xs text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Deadline:</span>
                    <span className="font-semibold text-slate-700">{item.deadline}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveChallengeDetail(item)}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all whitespace-nowrap"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge Details Modal / Drawer */}
      {activeChallengeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveChallengeDetail(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <CorporateLogoBadge
                type={activeChallengeDetail.corporateLogo}
                name={activeChallengeDetail.corporateName}
                size="md"
              />
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {activeChallengeDetail.corporateName} · {activeChallengeDetail.country}
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {activeChallengeDetail.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs mb-5">
              <div>
                <span className="text-slate-400 block text-[11px]">Budget Allocation</span>
                <span className="font-bold text-slate-900 font-mono text-sm">{activeChallengeDetail.budget}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Submission Deadline</span>
                <span className="font-semibold text-slate-800">{activeChallengeDetail.deadline}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">AI Compatibility</span>
                <span className="font-bold text-emerald-600 font-mono text-sm">{activeChallengeDetail.aiMatchScore}% Match</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Challenge Brief</h4>
                <p>{activeChallengeDetail.description}</p>
              </div>

              {activeChallengeDetail.fullRequirements && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Technical & Scope Requirements</h4>
                  <ul className="space-y-2 list-disc list-inside text-slate-600">
                    {activeChallengeDetail.fullRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                <div className="flex items-center gap-2 font-bold text-indigo-900 text-xs mb-1">
                  <ShieldCheck className="h-4 w-4 text-indigo-600" />
                  <span>eKYB Fast-Track Review Enabled</span>
                </div>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Startups applying with a verified ASEAN Startup Passport (AIRS &gt; 850) receive priority evaluation and guaranteed discovery meeting within 5 business days.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveChallengeDetail(null)}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const ch = activeChallengeDetail;
                  setActiveChallengeDetail(null);
                  onApplyChallenge(ch);
                }}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all"
              >
                <span>Apply & Post Solution</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
