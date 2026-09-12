import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { CommandPalette } from "../components/common/CommandPalette";
import { useAuth } from "../context/AuthContext";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-full bg-[var(--color-canvas)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {user?.role === "admin" && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300">
            <div className="flex items-center gap-2">
              <ShieldAlert size={14} className="text-amber-500 flex-shrink-0" />
              <span>
                <strong>Admin Preview Mode</strong>: You are viewing the Employee Portal as an administrator.
              </span>
            </div>
            <Link
              to="/admin"
              className="flex items-center gap-1 font-semibold underline hover:text-amber-900 dark:hover:text-amber-100"
            >
              Return to Admin Portal <ArrowRight size={12} />
            </Link>
          </div>
        )}
        <TopBar onMenuClick={() => setSidebarOpen(true)} onCmdPalette={() => setCmdOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
