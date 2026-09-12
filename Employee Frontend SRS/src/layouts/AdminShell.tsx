/**
 * AdminShell — Layout wrapper for the Admin Portal.
 *
 * Uses the same design token system as the Employee portal (CSS custom
 * properties defined in index.css) so both portals share one visual language.
 *
 * Sidebar navigation is admin-specific and never shown to employees.
 */

import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Triangle,
  TrendingUp,
  BookOpen,
  ClipboardList,
  FileText,
  Flag,
  Bell,
  Settings,
  LogOut,
  Menu,
  ShieldCheck,
  Sun,
  Moon,
  Monitor,
  Zap,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme, type ThemeMode } from "../hooks/useTheme";
import { CommandPalette } from "../components/common/CommandPalette";

const ADMIN_NAV = [
  { path: "/admin",                      icon: LayoutDashboard, label: "Dashboard",             end: true },
  { path: "/admin/employees",            icon: Users,           label: "Employees" },
  { path: "/admin/competency-analytics", icon: BarChart3,       label: "Competency Analytics" },
  { path: "/admin/skill-gap-distribution", icon: Triangle,      label: "Skill Gap Distribution" },
  { path: "/admin/training-demand",      icon: TrendingUp,      label: "Training Demand" },
  { path: "/admin/course-utilization",   icon: BookOpen,        label: "Course Utilization" },
  { path: "/admin/assessments",          icon: ClipboardList,   label: "Assessments" },
  { path: "/admin/documents",            icon: FileText,        label: "Documents" },
  { path: "/admin/reports",              icon: Flag,            label: "Reports" },
  { path: "/admin/notifications",        icon: Bell,            label: "Notifications" },
  { path: "/admin/settings",             icon: Settings,        label: "System Settings" },
];

const THEME_OPTIONS: Array<{ value: ThemeMode; icon: React.ElementType; label: string }> = [
  { value: "light",  icon: Sun,     label: "Light" },
  { value: "dark",   icon: Moon,    label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

export function AdminShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { mode, setMode } = useTheme();

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2) ?? "AD";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  // Close sidebar on escape, toggle search on Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-full bg-[var(--color-canvas)] admin-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 flex flex-col
          bg-[var(--color-navy-900)] text-white
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Admin navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-primary)] flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div
              className="text-sm font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SkillSaarthi AI
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck size={9} className="text-[var(--color-blue-light)]" />
              <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                Admin · Demo
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5"
          aria-label="Admin main navigation"
        >
          {ADMIN_NAV.map(({ path, icon: Icon, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--color-blue-primary)] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`
              }
            >
              <Icon size={15} className="flex-shrink-0" />
              <span className="flex-1 text-xs">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Theme switcher */}
        <div className="px-3 pb-2 flex-shrink-0">
          <div className="border border-white/10 rounded-xl p-1.5">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5 px-1">
              Appearance
            </div>
            <div className="flex gap-1" role="group" aria-label="Theme selector">
              {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  aria-label={`${label} mode`}
                  aria-pressed={mode === value}
                  className={`
                    flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-150
                    ${
                      mode === value
                        ? "bg-[var(--color-blue-primary)] text-white"
                        : "text-white/40 hover:text-white/70 hover:bg-white/8"
                    }
                  `}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Admin badge + logout */}
        <div className="p-3 border-t border-white/10 flex-shrink-0 space-y-2">
          <div className="px-3 py-2 rounded-lg bg-[var(--color-blue-primary)]/10 border border-[var(--color-blue-primary)]/20">
            <div className="flex items-center gap-1.5 mb-0.5">
              <ShieldCheck size={10} className="text-[var(--color-blue-light)]" />
              <div className="text-[10px] font-mono text-[var(--color-blue-light)] uppercase tracking-wider">
                Admin Session
              </div>
            </div>
            <div className="text-[11px] text-white/50">Two-stage verified · Demo</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-4 lg:px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} className="text-[var(--color-text-secondary)]" />
          </button>

          {/* Search placeholder */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] hover:border-[var(--color-blue-primary)] transition-colors text-[var(--color-muted-fg)] hover:text-[var(--color-text)] flex-1 max-w-xs"
            aria-label="Search"
          >
            <Search size={13} />
            <span className="text-xs flex-1 text-left">Search employees, analytics…</span>
            <span className="text-[10px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] px-1 py-0.5 rounded">
              ⌘K
            </span>
          </button>

          <div className="flex-1 min-w-0 md:hidden">
            <div className="text-xs text-[var(--color-muted-fg)] font-mono uppercase tracking-wider truncate">
              Admin Portal
            </div>
          </div>

          {/* User info */}
          <div className="flex items-center gap-2.5 pl-1 ml-auto">
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
                {user?.name ?? "Admin User"}
              </div>
              <div className="text-[11px] text-[var(--color-muted-fg)] flex items-center gap-1">
                <ShieldCheck size={9} />
                Administrator
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
