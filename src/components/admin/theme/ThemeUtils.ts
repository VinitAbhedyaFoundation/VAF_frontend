import type { ThemeMode, AccentPalette } from "@/types/admin";

export const DARK_TOKENS = {
  "--bg-base": "#0f172a",
  "--bg-card": "#1e293b",
  "--bg-sidebar": "#0f172a",
  "--bg-header": "#0f172a",
  "--border-color": "#334155",
  "--text-primary": "#f1f5f9",
  "--text-secondary": "#94a3b8",
  "--text-muted": "#64748b",
  "--bg-input": "#1e293b",
  "--bg-subtle": "#1e293b",
  "--bg-hover": "#334155",
};

export const LIGHT_TOKENS = {
  "--bg-base": "#F8FAFC",
  "--bg-card": "#ffffff",
  "--bg-sidebar": "#ffffff",
  "--bg-header": "rgba(255,255,255,0.8)",
  "--border-color": "#e2e8f0",
  "--text-primary": "#0f172a",
  "--text-secondary": "#475569",
  "--text-muted": "#94a3b8",
  "--bg-input": "#ffffff",
  "--bg-subtle": "#f8fafc",
  "--bg-hover": "#f1f5f9",
};

export function applyTheme(
  mode: ThemeMode,
  accent: AccentPalette
) {
  const root = document.documentElement;

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isDark =
    mode === "dark" ||
    (mode === "system" && prefersDark);

  const tokens = isDark
    ? DARK_TOKENS
    : LIGHT_TOKENS;

  Object.entries(tokens).forEach(([key, value]) =>
    root.style.setProperty(key, value)
  );

  root.style.setProperty("--accent-50", accent[50]);
  root.style.setProperty("--accent-100", accent[100]);
  root.style.setProperty("--accent-200", accent[200]);
  root.style.setProperty("--accent-400", accent[400]);
  root.style.setProperty("--accent-500", accent[500]);
  root.style.setProperty("--accent-600", accent[600]);
  root.style.setProperty("--accent-700", accent[700]);
  root.style.setProperty("--accent-900", accent[900]);
  root.style.setProperty("--accent-shadow", accent.shadow);
  root.style.setProperty("--accent-hex", accent.hex);

  if (isDark)
    root.classList.add("dark");
  else
    root.classList.remove("dark");
}