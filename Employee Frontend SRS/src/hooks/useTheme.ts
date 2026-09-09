import { useEffect, useState, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "skillsaarthi_theme";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode) {
  const resolved: ResolvedTheme = mode === "system" ? getSystemTheme() : mode;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  return resolved;
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? "system";
    } catch {
      return "system";
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    applyTheme((localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? "system")
  );

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage not available */
    }
    const resolved = applyTheme(next);
    setResolvedTheme(resolved);
  }, []);

  // Listen for OS preference changes when mode === "system"
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = applyTheme("system");
      setResolvedTheme(resolved);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  // Re-apply on mount (guards against SSR / race conditions)
  useEffect(() => {
    const resolved = applyTheme(mode);
    setResolvedTheme(resolved);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { mode, setMode, resolvedTheme };
}
