import { useState, useRef, useEffect } from "react";
import { Menu, Bell, CheckCircle, TrendingUp, BookOpen, FileText, Sparkles, Search } from "lucide-react";
import { DEMO_USER, DEMO_PROFILE } from "../data/mockData";

interface TopBarProps {
  onMenuClick: () => void;
  onCmdPalette?: () => void;
}

interface Notification {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: Sparkles,
    iconColor: "text-[var(--color-blue-primary)]",
    iconBg: "bg-[var(--color-blue-muted)]",
    title: "New AI recommendation",
    body: "Machine Learning Fundamentals added to your learning path.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    icon: FileText,
    iconColor: "text-[var(--color-warning-fg)]",
    iconBg: "bg-[var(--color-warning-bg)]",
    title: "Document ready",
    body: "ML Study Notes assessment is ready to take.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "n3",
    icon: TrendingUp,
    iconColor: "text-[var(--color-success-fg)]",
    iconBg: "bg-[var(--color-success-bg)]",
    title: "Competency updated",
    body: "Your Python level moved from Beginner to Intermediate.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n4",
    icon: BookOpen,
    iconColor: "text-[var(--color-blue-primary)]",
    iconBg: "bg-[var(--color-blue-muted)]",
    title: "Course milestone",
    body: "35% through Python for Data Analysis. Keep going!",
    time: "2 days ago",
    read: true,
  },
  {
    id: "n5",
    icon: CheckCircle,
    iconColor: "text-[var(--color-success-fg)]",
    iconBg: "bg-[var(--color-success-bg)]",
    title: "Assessment completed",
    body: "Statistical Methods · Score: 84%",
    time: "3 days ago",
    read: true,
  },
];

export function TopBar({ onMenuClick, onCmdPalette }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);

  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Close on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  return (
    <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-4 lg:px-6 gap-4 flex-shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
        aria-label="Open navigation"
      >
        <Menu size={20} className="text-[var(--color-text-secondary)]" />
      </button>

      {/* Command palette trigger */}
      <button
        onClick={onCmdPalette}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] hover:border-[var(--color-blue-primary)] transition-colors text-[var(--color-muted-fg)] hover:text-[var(--color-text)] flex-1 max-w-xs"
        aria-label="Open command palette"
      >
        <Search size={13} />
        <span className="text-xs flex-1 text-left">Search…</span>
        <span className="flex items-center gap-0.5 text-[10px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] px-1 py-0.5 rounded">
          ⌘K
        </span>
      </button>

      <div className="flex-1 min-w-0 md:hidden">
        <div className="text-xs text-[var(--color-muted-fg)] font-mono uppercase tracking-wider truncate">
          {DEMO_PROFILE.department}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className={`relative p-2 rounded-lg transition-colors ${
              notifOpen
                ? "bg-[var(--color-muted)] text-[var(--color-text)]"
                : "hover:bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={notifOpen}
            aria-haspopup="true"
          >
            <Bell size={18} />
            {/* Badge */}
            {unreadCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 bg-[var(--color-blue-primary)] text-white text-[9px] font-bold font-mono rounded-full ring-2 ring-[var(--color-surface)] leading-none"
                aria-hidden="true"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification panel */}
          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-xl)] z-50 animate-fade-in overflow-hidden"
              role="dialog"
              aria-label="Notifications"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
                <div>
                  <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="ml-2 text-[10px] font-mono font-bold bg-[var(--color-blue-primary)] text-white px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[var(--color-blue-primary)] font-medium hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification items */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <button
                      key={notif.id}
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) => n.id === notif.id ? { ...n, read: true } : n)
                        )
                      }
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[var(--color-muted)] transition-colors border-b border-[var(--color-border)] last:border-0 ${
                        !notif.read ? "bg-[var(--color-blue-muted)]/40" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${notif.iconBg}`}>
                        <Icon size={14} className={notif.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-xs font-semibold leading-snug ${notif.read ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text)]"}`}>
                            {notif.title}
                          </span>
                          {!notif.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-primary)] flex-shrink-0 mt-1" aria-hidden="true" />
                          )}
                        </div>
                        <p className="text-[11px] text-[var(--color-muted-fg)] mt-0.5 leading-relaxed line-clamp-2">
                          {notif.body}
                        </p>
                        <div className="text-[10px] text-[var(--color-muted-fg)] font-mono mt-1">{notif.time}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-[var(--color-border)]">
                <button
                  className="w-full text-xs text-[var(--color-blue-primary)] font-medium text-center hover:underline"
                  onClick={() => setNotifOpen(false)}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User avatar + info */}
        <div className="flex items-center gap-2.5 pl-1">
          <div
            className="w-8 h-8 rounded-full bg-[var(--color-blue-primary)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="hidden sm:block">
            <div
              className="text-sm font-medium text-[var(--color-text)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {DEMO_USER.name}
            </div>
            <div className="text-[11px] text-[var(--color-muted-fg)]">{DEMO_PROFILE.designation}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
