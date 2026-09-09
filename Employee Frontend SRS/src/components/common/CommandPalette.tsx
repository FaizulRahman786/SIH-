import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard, User, BarChart3, TrendingDown, Map, BookOpen,
  ClipboardList, FileText, Bot, Search, ArrowRight, Command,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  path: string;
  icon: React.ElementType;
  keywords: string[];
}

const COMMANDS: CommandItem[] = [
  { id: "dashboard", label: "Dashboard", description: "Overview and KPIs", path: "/dashboard", icon: LayoutDashboard, keywords: ["home", "overview", "stats"] },
  { id: "profile", label: "My Profile", description: "Professional info and career goal", path: "/profile", icon: User, keywords: ["me", "info", "career"] },
  { id: "competencies", label: "Competency Profile", description: "Skills and competency levels", path: "/competencies", icon: BarChart3, keywords: ["skills", "radar", "levels"] },
  { id: "skill-gaps", label: "Skill Gaps", description: "Priority gaps to close", path: "/skill-gaps", icon: TrendingDown, keywords: ["gaps", "missing", "critical"] },
  { id: "learning-path", label: "Learning Path", description: "Your personalized roadmap", path: "/learning-path", icon: Map, keywords: ["path", "roadmap", "steps"] },
  { id: "courses", label: "Course Catalogue", description: "Browse available courses", path: "/courses", icon: BookOpen, keywords: ["browse", "enroll", "iGOT"] },
  { id: "assessments", label: "Assessments", description: "Take or review competency tests", path: "/assessments", icon: ClipboardList, keywords: ["quiz", "test", "score"] },
  { id: "documents", label: "Learning Documents", description: "Upload docs to generate assessments", path: "/documents", icon: FileText, keywords: ["upload", "pdf", "doc"] },
  { id: "assistant", label: "AI Learning Coach", description: "Chat with your AI coach", path: "/assistant", icon: Bot, keywords: ["chat", "ai", "help"] },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? COMMANDS.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.label.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.includes(q))
        );
      })
    : COMMANDS;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const select = (item: CommandItem) => {
    navigate(item.path);
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (filtered[activeIndex]) select(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-xl)] border border-[var(--color-border)] overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)]">
          <Search size={16} className="text-[var(--color-muted-fg)] flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search pages and features…"
            className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-fg)] outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-muted-fg)] bg-[var(--color-muted)] rounded border border-[var(--color-border)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1.5">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-[var(--color-muted-fg)]">No results for "{query}"</div>
          ) : (
            filtered.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-[var(--color-blue-primary)] text-white"
                      : "hover:bg-[var(--color-muted)] text-[var(--color-text)]"
                  }`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => select(item)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? "bg-white/20" : "bg-[var(--color-muted)]"}`}>
                    <Icon size={15} className={isActive ? "text-white" : "text-[var(--color-blue-primary)]"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${isActive ? "text-white" : "text-[var(--color-text)]"}`}>
                      {item.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${isActive ? "text-white/70" : "text-[var(--color-muted-fg)]"}`}>
                      {item.description}
                    </div>
                  </div>
                  <ArrowRight size={14} className={isActive ? "text-white/60" : "text-[var(--color-muted-fg)]"} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-muted)]">
          <div className="flex items-center gap-3 text-[10px] text-[var(--color-muted-fg)] font-mono">
            <span className="flex items-center gap-1"><kbd className="bg-[var(--color-surface)] border border-[var(--color-border)] px-1 rounded">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="bg-[var(--color-surface)] border border-[var(--color-border)] px-1 rounded">↵</kbd> Open</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--color-muted-fg)] font-mono">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
