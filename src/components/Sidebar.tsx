import React from 'react';
import { AspLogo } from './BrandLogos';
import { User, Trophy, Handshake, Bell, ShieldCheck, PlusCircle, Settings } from 'lucide-react';

export type MainNavTab = 'profile' | 'challenges' | 'deals' | 'notifications' | 'ekyb' | 'settings';

interface SidebarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  onOpenPostSolution: () => void;
  dealCount: number;
  challengeCount: number;
  unreadNotificationCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenPostSolution,
  dealCount,
  challengeCount,
  unreadNotificationCount,
}) => {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-100 bg-white min-h-screen p-5 flex flex-col justify-between hidden md:flex">
      <div className="space-y-8">
        {/* Brand Logo matching screenshots */}
        <div className="px-2 cursor-pointer" onClick={() => onTabChange('profile')}>
          <AspLogo showTagline={true} />
        </div>

        {/* Navigation Items matching screenshots */}
        <nav className="space-y-1.5">
          <button
            onClick={() => onTabChange('profile')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-[#ede9fe] text-[#5b21b6] shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <User className={`h-4 w-4 ${activeTab === 'profile' ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
              <span className="text-sm">My Profile</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100/60 text-indigo-700 font-bold">
              80%
            </span>
          </button>

          <button
            onClick={() => onTabChange('challenges')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'challenges'
                ? 'bg-[#ede9fe] text-[#5b21b6] shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Trophy className={`h-4 w-4 ${activeTab === 'challenges' ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
              <span className="text-sm">Challenges</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-400">
              {challengeCount}
            </span>
          </button>

          <button
            onClick={() => onTabChange('deals')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'deals'
                ? 'bg-[#ede9fe] text-[#5b21b6] shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Handshake className={`h-4 w-4 ${activeTab === 'deals' ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
              <span className="text-sm">Deal Tracker</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
              {dealCount} active
            </span>
          </button>

          {/* Notifications navigation item matching screenshot image_7df137ea.png */}
          <button
            onClick={() => onTabChange('notifications')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'notifications'
                ? 'bg-[#ede9fe] text-[#5b21b6] shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className={`h-4 w-4 ${activeTab === 'notifications' ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
              <span className="text-sm">Notifications</span>
            </div>
            {unreadNotificationCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white font-mono text-[11px] font-bold shadow-sm">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Simplified eKYB Verification */}
          <div className="pt-4 border-t border-slate-100 mt-4">
            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Verification & Trust
            </span>
            <button
              onClick={() => onTabChange('ekyb')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                activeTab === 'ekyb'
                  ? 'bg-[#ede9fe] text-[#5b21b6] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className={`h-4 w-4 ${activeTab === 'ekyb' ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
                <span className="text-sm">eKYB Verification</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                SSM 100%
              </span>
            </button>

            <button
              onClick={() => onTabChange('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left mt-1.5 ${
                activeTab === 'settings'
                  ? 'bg-[#ede9fe] text-[#5b21b6] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className={`h-4 w-4 ${activeTab === 'settings' ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
                <span className="text-sm">Settings</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">
                Gemini 4
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Post Solution Quick Action */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <button
          onClick={onOpenPostSolution}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 px-4 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Post Your Solution</span>
        </button>

        <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 leading-tight">
          <span className="font-semibold text-slate-700 block mb-0.5">ASEAN DEFA Trust Layer</span>
          Pre-clearing startups with Grab, DBS Bank, Petronas & CIMB.
        </div>
      </div>
    </aside>
  );
};
