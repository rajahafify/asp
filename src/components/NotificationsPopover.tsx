import React from 'react';
import { AppNotification } from '../types/deals';
import { Bell, CheckCircle2, Calendar, Sparkles, ShieldCheck, X } from 'lucide-react';

interface NotificationsPopoverProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick: (notif: AppNotification) => void;
  onMarkAllAsRead: () => void;
  onViewAll?: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  notifications,
  isOpen,
  onClose,
  onNotificationClick,
  onMarkAllAsRead,
  onViewAll,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-14 z-50 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-indigo-500/10 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-600">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Mark read
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400">No notifications yet.</p>
        ) : (
          notifications.map((notif) => {
            const getIcon = () => {
              switch (notif.type) {
                case 'deal':
                  return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
                case 'meeting':
                  return <Calendar className="h-4 w-4 text-indigo-500" />;
                case 'match':
                  return <Sparkles className="h-4 w-4 text-amber-500" />;
                case 'kyb':
                  return <ShieldCheck className="h-4 w-4 text-cyan-500" />;
                default:
                  return <Bell className="h-4 w-4 text-indigo-500" />;
              }
            };

            return (
              <button
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`w-full text-left rounded-xl p-3 transition-colors flex items-start gap-3 border ${
                  notif.read
                    ? 'border-transparent bg-white hover:bg-slate-50'
                    : 'border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50'
                }`}
              >
                <div className="mt-0.5 shrink-0 rounded-lg bg-white p-1.5 shadow-sm">
                  {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-medium">Activity Stream</span>
        {onViewAll && (
          <button
            onClick={() => {
              onClose();
              onViewAll();
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Open full page →
          </button>
        )}
      </div>
    </div>
  );
};
