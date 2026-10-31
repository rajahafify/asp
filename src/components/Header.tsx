import React from 'react';
import { ShieldCheck, FileCheck, Network, Award, SearchCheck, MessageSquareCode } from 'lucide-react';

export type ActiveTab = 'passport' | 'extraction' | 'ubo' | 'airs' | 'verifier' | 'copilot';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenVerifier: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenVerifier }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <button
            onClick={() => onTabChange('passport')}
            className="text-left font-bold tracking-tight text-white text-lg whitespace-nowrap hover:text-cyan-300 transition-colors"
          >
            ASEAN Startup Passport
          </button>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onTabChange('passport')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'passport'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Digital Passport
          </button>
          <button
            onClick={() => onTabChange('extraction')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'extraction'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-slate-200'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            Registry Ingestion
          </button>
          <button
            onClick={() => onTabChange('ubo')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'ubo'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-slate-200'
            }`}
          >
            <Network className="h-4 w-4" />
            UBO & Cap Table
          </button>
          <button
            onClick={() => onTabChange('airs')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'airs'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-slate-200'
            }`}
          >
            <Award className="h-4 w-4" />
            AIRS Audit
          </button>
          <button
            onClick={() => onTabChange('copilot')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'copilot'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'hover:text-slate-200'
            }`}
          >
            <MessageSquareCode className="h-4 w-4" />
            Diligence Copilot
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenVerifier}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <SearchCheck className="h-3.5 w-3.5" />
            Verify Passport
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-800/80 px-4 py-2 gap-2 text-xs font-medium text-slate-400 no-scrollbar">
        <button
          onClick={() => onTabChange('passport')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'passport' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          Passport
        </button>
        <button
          onClick={() => onTabChange('extraction')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'extraction' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          Registry Ingestion
        </button>
        <button
          onClick={() => onTabChange('ubo')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'ubo' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          UBO Graph
        </button>
        <button
          onClick={() => onTabChange('airs')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'airs' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          AIRS Score
        </button>
        <button
          onClick={() => onTabChange('copilot')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'copilot' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'}`}
        >
          Diligence Copilot
        </button>
      </div>
    </header>
  );
};
