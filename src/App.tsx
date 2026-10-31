/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, MainNavTab } from './components/Sidebar';
import { PortalHeader } from './components/PortalHeader';
import { MyProfileView } from './components/MyProfileView';
import { CorporateChallengesView } from './components/CorporateChallengesView';
import { DealsTrackerView } from './components/DealsTrackerView';
import { NotificationsView } from './components/NotificationsView';
import { PostSolutionModal } from './components/PostSolutionModal';
import { DealClosedCelebrationModal } from './components/DealClosedCelebrationModal';
import { CredentialModal } from './components/CredentialModal';

// Simplified eKYB Verification & Settings
import { SimpleEkybView } from './components/SimpleEkybView';
import { SettingsView } from './components/SettingsView';

import {
  INITIAL_USER_PROFILE,
  CORPORATE_CHALLENGES,
  INITIAL_DEALS,
  INITIAL_NOTIFICATIONS,
  DEMO_STARTUP_PERSONAS,
} from './data/mockDeals';
import { SAMPLE_DOSSIERS } from './data/mockDossiers';
import { CorporateChallenge, Deal, DealStage, UserProfile, AppNotification } from './types/deals';
import { StartupDossier } from './types/ekyb';
import { ShieldCheck, ArrowLeft, Layers, Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [challenges, setChallenges] = useState<CorporateChallenge[]>(CORPORATE_CHALLENGES);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // Currently focused deal (default: Grab logistics deal at Meeting Scheduled)
  const [focusedDealId, setFocusedDealId] = useState<string>(deals[0]?.id || '');

  // Modals state
  const [isPostSolutionOpen, setIsPostSolutionOpen] = useState(false);
  const [targetChallengeForPost, setTargetChallengeForPost] = useState<CorporateChallenge | null>(null);
  const [closedDealCelebration, setClosedDealCelebration] = useState<Deal | null>(null);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sub-tabs inside eKYB Trust Layer
  const [ekybSubTab, setEkybSubTab] = useState<'passport' | 'extraction' | 'ubo' | 'airs' | 'verifier' | 'copilot' | 'playbook'>('passport');
  const [currentDossier, setCurrentDossier] = useState<StartupDossier>(SAMPLE_DOSSIERS[1]); // SingaLogistics (Singapore)

  // Step 3 & 4: Submit New Solution
  const handleSubmitSolution = (newDeal: Deal) => {
    setDeals((prev) => [newDeal, ...prev]);
    setFocusedDealId(newDeal.id);
    setActiveNavTab('deals');

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'deal',
      category: 'Deals',
      badgeLabel: 'Deal Tracker',
      iconType: 'document',
      title: 'Proposal Submitted Successfully',
      message: `Your solution for ${newDeal.corporateName} was submitted with verified eKYB credentials.`,
      timestamp: 'Just now',
      read: false,
      linkTab: 'deals',
      dealId: newDeal.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Step 6: Advance Stage
  const handleAdvanceDealStage = (dealId: string, nextStage: DealStage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, currentStage: nextStage } : d))
    );

    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;

    const notifText =
      nextStage === 'deal_closed'
        ? `🎉 Deal Closed with ${deal.corporateName}! Contract approved.`
        : nextStage === 'poc_pilot'
        ? `POC pilot initiated with ${deal.corporateName}.`
        : `Deal stage advanced to ${nextStage.replace('_', ' ')} with ${deal.corporateName}.`;

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: nextStage === 'deal_closed' ? 'deal' : 'meeting',
      category: 'Deals',
      badgeLabel: 'Deal Tracker',
      iconType: nextStage === 'deal_closed' ? 'trophy' : 'calendar',
      title: nextStage === 'deal_closed' ? 'Partnership Confirmed!' : 'Deal Stage Updated',
      message: notifText,
      timestamp: 'Just now',
      read: false,
      linkTab: 'deals',
      dealId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Step 7: Trigger Client Closed Celebration
  const handleTriggerCelebration = (deal: Deal) => {
    setClosedDealCelebration(deal);
  };

  // Checklist toggle
  const handleToggleChecklistItem = (id: string) => {
    setUserProfile((prev) => {
      const updatedList = prev.checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      const totalPoints = updatedList.reduce((acc, curr) => (curr.completed ? acc + curr.points : acc), 0);
      return {
        ...prev,
        checklist: updatedList,
        profileCompletionPercent: Math.min(100, totalPoints),
      };
    });
  };

  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (notif.linkTab === 'deals') {
      if (notif.dealId) setFocusedDealId(notif.dealId);
      setActiveNavTab('deals');
    } else if (notif.linkTab === 'challenges') {
      setActiveNavTab('challenges');
    } else if (notif.linkTab === 'profile') {
      setActiveNavTab('profile');
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSwitchUser = (name: string, company: string) => {
    if (name.includes('Cheryl') || company.includes('EcoPack')) {
      setUserProfile(DEMO_STARTUP_PERSONAS.ecopack);
      setFocusedDealId('deal-case-2-ecopack');
    } else if (name.includes('Ariff') || company.includes('MedFlow')) {
      setUserProfile(DEMO_STARTUP_PERSONAS.medflow);
      setFocusedDealId('deal-case-3-medflow');
    } else if (name.includes('Somchai') || company.includes('AquaSense')) {
      setUserProfile(DEMO_STARTUP_PERSONAS.aquasense);
      setFocusedDealId('deal-case-4-aquasense');
    } else {
      setUserProfile(DEMO_STARTUP_PERSONAS.routesense);
      setFocusedDealId('deal-case-1-routesense');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-slate-800 flex font-sans antialiased selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* Left Sidebar Navigation matching screenshots */}
      <Sidebar
        activeTab={activeNavTab}
        onTabChange={(tab) => {
          setActiveNavTab(tab);
          setIsMobileMenuOpen(false);
        }}
        onOpenPostSolution={() => {
          setTargetChallengeForPost(challenges[0]);
          setIsPostSolutionOpen(true);
        }}
        dealCount={deals.filter((d) => d.currentStage !== 'deal_closed').length}
        challengeCount={challenges.length}
        unreadNotificationCount={notifications.filter((n) => !n.read).length}
      />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/50 md:hidden">
          <div className="w-64 bg-white p-5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-extrabold text-slate-900 text-lg">ASP Passport</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-2 mt-4">
              <button
                onClick={() => {
                  setActiveNavTab('profile');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  activeNavTab === 'profile' ? 'bg-[#ede9fe] text-[#5b21b6]' : 'text-slate-600'
                }`}
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setActiveNavTab('challenges');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  activeNavTab === 'challenges' ? 'bg-[#ede9fe] text-[#5b21b6]' : 'text-slate-600'
                }`}
              >
                Corporate Challenges
              </button>
              <button
                onClick={() => {
                  setActiveNavTab('deals');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  activeNavTab === 'deals' ? 'bg-[#ede9fe] text-[#5b21b6]' : 'text-slate-600'
                }`}
              >
                Deal Tracker
              </button>
              <button
                onClick={() => {
                  setActiveNavTab('notifications');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeNavTab === 'notifications' ? 'bg-[#ede9fe] text-[#5b21b6]' : 'text-slate-600'
                }`}
              >
                <span>Notifications</span>
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveNavTab('ekyb');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  activeNavTab === 'ekyb' ? 'bg-[#ede9fe] text-[#5b21b6]' : 'text-slate-600'
                }`}
              >
                eKYB Verification
              </button>
              <button
                onClick={() => {
                  setActiveNavTab('settings');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  activeNavTab === 'settings' ? 'bg-[#ede9fe] text-[#5b21b6]' : 'text-slate-600'
                }`}
              >
                Settings
              </button>
            </nav>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPostSolutionOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Post Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header matching screenshots */}
        <PortalHeader
          userProfile={userProfile}
          notifications={notifications}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNotificationClick={handleNotificationClick}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onSwitchUser={handleSwitchUser}
          onOpenNotificationsPage={() => setActiveNavTab('notifications')}
        />

        {/* View Routing */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-7xl w-full mx-auto">
          {activeNavTab === 'profile' && (
            <MyProfileView
              profile={userProfile}
              recommendedChallenges={challenges}
              activeDeal={deals.find((d) => d.id === focusedDealId) || deals[0]}
              onApplyChallenge={(ch) => {
                setTargetChallengeForPost(ch);
                setIsPostSolutionOpen(true);
              }}
              onViewAllChallenges={() => setActiveNavTab('challenges')}
              onViewDealsTracker={() => setActiveNavTab('deals')}
              onViewEkybPassport={() => setActiveNavTab('ekyb')}
              onToggleChecklistItem={handleToggleChecklistItem}
            />
          )}

          {activeNavTab === 'challenges' && (
            <CorporateChallengesView
              challenges={challenges}
              onApplyChallenge={(ch) => {
                setTargetChallengeForPost(ch);
                setIsPostSolutionOpen(true);
              }}
              searchQuery={searchQuery}
            />
          )}

          {activeNavTab === 'deals' && (
            <DealsTrackerView
              deals={deals}
              onAdvanceDealStage={handleAdvanceDealStage}
              onCloseDealCelebration={handleTriggerCelebration}
              onPostNewSolution={() => {
                setTargetChallengeForPost(challenges[0]);
                setIsPostSolutionOpen(true);
              }}
              selectedDealId={focusedDealId}
            />
          )}

          {activeNavTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
            />
          )}

          {/* Simplified eKYB Verification View */}
          {activeNavTab === 'ekyb' && (
            <SimpleEkybView
              onVerificationComplete={(state) => {
                const newNotif: AppNotification = {
                  id: `notif-${Date.now()}`,
                  type: 'deal',
                  category: 'Deals',
                  badgeLabel: 'Deal Tracker',
                  iconType: 'document',
                  title: 'eKYB Verification Approved',
                  message: `Gemini 4 verified all 3 proofs for ${state.companyProfile.legalName}. Status: Pre-cleared.`,
                  timestamp: 'Just now',
                  read: false,
                  linkTab: 'ekyb',
                };
                setNotifications((prev) => [newNotif, ...prev]);
              }}
            />
          )}

          {/* Settings Page with BYOK & Model Engine Controls */}
          {activeNavTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Step 3 & 4: Post Solution & eKYB Modal */}
      <PostSolutionModal
        isOpen={isPostSolutionOpen}
        onClose={() => setIsPostSolutionOpen(false)}
        challenges={challenges}
        initialChallenge={targetChallengeForPost}
        userProfile={userProfile}
        onSubmitSolution={handleSubmitSolution}
      />

      {/* Step 7: Deal Closed & Client Confirmed Celebration */}
      <DealClosedCelebrationModal
        isOpen={!!closedDealCelebration}
        deal={closedDealCelebration}
        onClose={() => setClosedDealCelebration(null)}
        onViewDeal={(dealId) => {
          setFocusedDealId(dealId);
          setActiveNavTab('deals');
        }}
      />

      {/* W3C Credential Inspector Modal */}
      <CredentialModal
        isOpen={isCredentialModalOpen}
        onClose={() => setIsCredentialModalOpen(false)}
        dossier={currentDossier}
      />
    </div>
  );
}
