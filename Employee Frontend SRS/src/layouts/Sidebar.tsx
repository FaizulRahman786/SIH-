import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard, User, BarChart3, AlertTriangle, Map, BookOpen,
  ClipboardList, FileText, Bot, LogOut, ChevronRight, Zap,
  Sun, Moon, Monitor,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme, type ThemeMode } from "../hooks/useTheme";

const NAV_ITEMS = [
  { path: "/dashboard",    icon: LayoutDashboard, label: "Dashboard" },
  { path: "/profile",      icon: User,            label: "My Profile" },
  { path: "/competencies", icon: BarChart3,        label: "Competencies" },
  { path: "/skill-gaps",   icon: AlertTriangle,   label: "Skill Gaps" },
  { path: "/learning-path",icon: Map,             label: "Learning Path" },
  { path: "/courses",      icon: BookOpen,        label: "Courses" },
  { path: "/assessments",  icon: ClipboardList,   label: "Assessments" },
  { path: "/documents",    icon: FileText,        label: "Documents" },
  { path: "/assistant",    icon: Bot,             label: "AI Coach" },
];

const THEME_OPTIONS: Array<{ value: ThemeMode; icon: React.ElementType; label: string }> = [
  { value: "light",  icon: Sun,     label: "Light" },
  { value: "dark",   icon: Moon,    label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mode, setMode } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-60 flex flex-col
          bg-[var(--color-navy-900)] text-white
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-primary)] flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold leading-tight tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              SkillSaarthi
            </div>
            <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase">AI · Demo</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5" aria-label="Main navigation">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--color-blue-primary)] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight size={12} className="opacity-50" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Theme switcher */}
        <div className="px-3 pb-2 flex-shrink-0">
          <div className="border border-white/10 rounded-xl p-1.5">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5 px-1">Appearance</div>
            <div className="flex gap-1" role="group" aria-label="Theme selector">
              {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  aria-label={`${label} mode`}
                  aria-pressed={mode === value}
                  className={`
                    flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-150
                    ${mode === value
                      ? "bg-[var(--color-blue-primary)] text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/8"}
                  `}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo badge + logout */}
        <div className="p-3 border-t border-white/10 flex-shrink-0 space-y-2">
          <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Demo Mode</div>
            <div className="text-[11px] text-white/50 mt-0.5">Synthetic data only</div>
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
    </>
  );
}
