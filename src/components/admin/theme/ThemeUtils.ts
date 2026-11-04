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
} as const;

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
} as const;

const ACCENT_TOKEN_KEYS = [
  50,
  100,
  200,
  400,
  500,
  600,
  700,
  900,
] as const;

function getSystemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return getSystemPrefersDark();
}

function applyAccentTokens(accent: AccentPalette, root: HTMLElement): void {
  ACCENT_TOKEN_KEYS.forEach((shade) => {
    root.style.setProperty(
      `--accent-${shade}`,
      accent[shade],
    );
  });

  root.style.setProperty("--accent-shadow", accent.shadow);
  root.style.setProperty("--accent-hex", accent.hex);
}

export function applyTheme(
  mode: ThemeMode,
  accent: AccentPalette,
): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const isDark = resolveIsDark(mode);
  const tokens = isDark ? DARK_TOKENS : LIGHT_TOKENS;

  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  applyAccentTokens(accent, root);

  root.classList.toggle("dark", isDark);
  root.dataset.theme = isDark ? "dark" : "light";
}

/**
 * Keeps the application synchronized with OS/browser appearance changes.
 * Call this only when the selected theme mode is "system".
 * Returns a cleanup function for use in a React effect.
 */
export function subscribeToSystemTheme(
  onChange: (isDark: boolean) => void,
): () => void {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (event: MediaQueryListEvent) => {
    onChange(event.matches);
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }

  // Fallback for older browsers.
  mediaQuery.addListener(handleChange);
  return () => mediaQuery.removeListener(handleChange);
}
