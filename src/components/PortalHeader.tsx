import React, { useState } from 'react';
import { UserProfile, AppNotification } from '../types/deals';
import { NotificationsPopover } from './NotificationsPopover';
import { Search, Bell, Menu, ShieldCheck, ChevronDown, LogOut, RefreshCw, UserCheck } from 'lucide-react';

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
          placeholder="Search for challenges, investors or partners..."
          className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 pl-10 pr-4 py-2 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Right Controls: Notification & User Profile */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
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
                  Step 1: Switch Account / Persona
                </span>
                <button
                  onClick={() => {
                    onSwitchUser('Jane Tan', 'SingaLogistics Pte. Ltd. (Singapore)');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center justify-between"
                >
                  <span>Jane Tan (Singapore Founder)</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                </button>
                <button
                  onClick={() => {
                    onSwitchUser('Reza Pratama', 'PT FinNusantara Labs (Indonesia)');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700"
                >
                  Reza Pratama (Indonesia Founder)
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
