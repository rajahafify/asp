import React, { useState } from 'react';
import { UserProfile, AppNotification } from '../types/deals';
import { NotificationsPopover } from './NotificationsPopover';
import { LANGUAGES, useLanguage } from '../i18n';
import { Search, Bell, Menu, ShieldCheck, ChevronDown, LogOut, RefreshCw, UserCheck, Languages } from 'lucide-react';

interface PortalHeaderProps {
  userProfile: UserProfile;
  notifications: AppNotification[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNotificationClick: (notif: AppNotification) => void;
  onMarkAllNotificationsRead: () => void;
  onToggleMobileMenu: () => void;
  onSwitchUser: (name: string, company: string) => void;
  onOpenNotificationsPage?: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  userProfile,
  notifications,
  searchQuery,
  onSearchChange,
  onNotificationClick,
  onMarkAllNotificationsRead,
  onToggleMobileMenu,
  onSwitchUser,
  onOpenNotificationsPage,
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/90 px-4 sm:px-8 backdrop-blur-md">
      {/* Mobile toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onToggleMobileMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-extrabold text-slate-900 text-sm">ASP</span>
      </div>

      {/* Search Bar matching screenshots */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 pl-10 pr-4 py-2 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Right Controls: Notification & User Profile */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        {/* Language Selector */}
        <label className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
          <Languages className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
          <span className="sr-only">{t('language.label')}</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            className="bg-transparent focus:outline-none cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            )}
          </button>

          <NotificationsPopover
            notifications={notifications}
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            onNotificationClick={(n) => {
              setIsNotifOpen(false);
              onNotificationClick(n);
            }}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onViewAll={onOpenNotificationsPage}
          />
        </div>

        {/* User Profile Avatar Lockup matching screenshots */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 rounded-2xl p-1.5 hover:bg-slate-50 transition-colors text-left"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100"
            />
            <div className="hidden lg:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                {userProfile.title}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden lg:block" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl text-xs space-y-1 animate-in fade-in">
              <div className="p-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 block">{userProfile.name}</span>
                <span className="text-slate-500 block truncate">{userProfile.companyName}</span>
                <span className="text-[10px] font-mono text-emerald-600 block mt-0.5">
                  AIRS Readiness: {userProfile.airsScore}/1000
                </span>
              </div>

              <div className="py-1">
                <span className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Switch Case Persona
                </span>
                <button
                  onClick={() => {
                    onSwitchUser('RouteSense Founder', 'RouteSense AI Sdn Bhd (Malaysia)');
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-slate-700 flex items-center justify-between ${
                    userProfile.name === 'RouteSense Founder' ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block">Case 1: RouteSense Founder</span>
                    <span className="text-[10px] text-slate-400 block font-normal">RouteSense AI (Malaysia 🇲🇾)</span>
                  </div>
                  {userProfile.name === 'RouteSense Founder' && <span className="text-[10px] text-indigo-600 font-bold">Active</span>}
                </button>

                <button
                  onClick={() => {
                    onSwitchUser('EcoPack Founder', 'EcoPack Labs Pte Ltd (Singapore)');
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-slate-700 flex items-center justify-between ${
                    userProfile.name === 'EcoPack Founder' ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block">Case 2: EcoPack Founder</span>
                    <span className="text-[10px] text-slate-400 block font-normal">EcoPack Labs (Singapore 🇸🇬)</span>
                  </div>
                  {userProfile.name === 'EcoPack Founder' && <span className="text-[10px] text-indigo-600 font-bold">Active</span>}
                </button>

                <button
                  onClick={() => {
                    onSwitchUser('MedFlow Founder', 'MedFlow Technologies Sdn Bhd (Malaysia)');
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-slate-700 flex items-center justify-between ${
                    userProfile.name === 'MedFlow Founder' ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block">Case 3: MedFlow Founder</span>
                    <span className="text-[10px] text-slate-400 block font-normal">MedFlow Technologies (Malaysia 🇲🇾)</span>
                  </div>
                  {userProfile.name === 'MedFlow Founder' && <span className="text-[10px] text-indigo-600 font-bold">Active</span>}
                </button>

                <button
                  onClick={() => {
                    onSwitchUser('AquaSense Founder', 'AquaSense Innovations Co., Ltd. (Thailand)');
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-slate-700 flex items-center justify-between ${
                    userProfile.name === 'AquaSense Founder' ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block">Case 4: AquaSense Founder</span>
                    <span className="text-[10px] text-slate-400 block font-normal">AquaSense Innovations (Thailand 🇹🇭)</span>
                  </div>
                  {userProfile.name === 'AquaSense Founder' && <span className="text-[10px] text-indigo-600 font-bold">Active</span>}
                </button>

                <button
                  onClick={() => {
                    onSwitchUser('New Founder', '');
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-slate-700 flex items-center justify-between ${
                    userProfile.name === 'New Founder' ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="block">Demo: Empty profile</span>
                    <span className="text-[10px] text-slate-400 block font-normal">Upload documents and run eKYB from scratch</span>
                  </div>
                  {userProfile.name === 'New Founder' && <span className="text-[10px] text-indigo-600 font-bold">Active</span>}
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    alert('Signed out of ASEAN Startup Passport session.');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
