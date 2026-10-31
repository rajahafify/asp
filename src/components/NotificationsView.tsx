import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { AppNotification } from '../types/deals';
import {
  Bell,
  Check,
  ChevronRight,
  Handshake,
  Trophy,
  Calendar,
  FileText,
  Megaphone,
  CheckCheck
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onNotificationClick: (notif: AppNotification) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
}) => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Matches' | 'Challenges' | 'Deals' | 'System'>('All');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filters: Array<'All' | 'Matches' | 'Challenges' | 'Deals' | 'System'> = [
    'All',
    'Matches',
    'Challenges',
    'Deals',
    'System',
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedFilter === 'All') return true;
    return notif.category === selectedFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title Header matching Image 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Bell className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Notifications
            </h1>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500">
            Stay updated with the latest opportunities and activities on ASP.
          </p>
        </div>

        {/* Mark All As Read Button matching Image 3 */}
        <button
          onClick={onMarkAllAsRead}
          className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          <CheckCheck className="h-3.5 w-3.5" />
          <span>{t('Mark all as read')}</span>
        </button>
      </div>

      {/* Filter Tabs matching Image 3 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((flt) => {
          const isSelected = selectedFilter === flt;
          const label = flt === 'All' ? `All (${unreadCount})` : flt;

          return (
            <button
              key={flt}
              onClick={() => setSelectedFilter(flt)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Notification Cards List matching Image 3 */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center text-slate-400">
            <Bell className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-600">{t('No notifications in this category')}</p>
            <p className="text-xs text-slate-400 mt-1">
              You are all caught up with your ASEAN startup activities.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            // Pick circle styling & icon
            const getIconElement = () => {
              switch (notif.iconType) {
                case 'handshake':
                  return {
                    icon: <Handshake className="h-5 w-5 text-indigo-600" />,
                    bg: 'bg-indigo-100',
                  };
                case 'trophy':
                  return {
                    icon: <Trophy className="h-5 w-5 text-sky-600" />,
                    bg: 'bg-sky-100',
                  };
                case 'calendar':
                  return {
                    icon: <Calendar className="h-5 w-5 text-emerald-600" />,
                    bg: 'bg-emerald-100',
                  };
                case 'document':
                  return {
                    icon: <FileText className="h-5 w-5 text-orange-600" />,
                    bg: 'bg-orange-100',
                  };
                case 'megaphone':
                default:
                  return {
                    icon: <Megaphone className="h-5 w-5 text-purple-600" />,
                    bg: 'bg-purple-100',
                  };
              }
            };

            const iconData = getIconElement();

            // Tag badge style
            const getTagBadgeStyle = () => {
              switch (notif.badgeLabel) {
                case 'AI Match':
                  return 'bg-indigo-100/70 text-indigo-700';
                case 'Challenge':
                  return 'bg-sky-100/70 text-sky-700';
                case 'Deal Tracker':
                  return notif.iconType === 'document'
                    ? 'bg-orange-100/70 text-orange-700'
                    : 'bg-emerald-100/70 text-emerald-700';
                case 'System':
                default:
                  return 'bg-slate-100 text-slate-700';
              }
            };

            return (
              <button
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className="w-full text-left rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center justify-between gap-4 group"
              >
                {/* Left Area: Icon + Content */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Circular Icon with unread red dot indicator */}
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconData.bg}`}
                    >
                      {iconData.icon}
                    </div>
                    {!notif.read && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {notif.message}
                    </p>

                    <div className="pt-0.5">
                      <span
                        className={`inline-block rounded-lg px-2.5 py-0.5 text-[11px] font-semibold ${getTagBadgeStyle()}`}
                      >
                        {notif.badgeLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Area: Timestamp + Read/Unread Status Badge + Arrow */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    {notif.timestamp}
                  </span>

                  {notif.read ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      Read
                    </span>
                  ) : (
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Unread
                    </span>
                  )}

                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
