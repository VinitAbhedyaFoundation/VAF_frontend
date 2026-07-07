import React, { createContext, useContext } from "react";
import type { ThemeMode, AccentPalette } from "../../../types/admin"; // adjust path if needed

export interface ThemeContextValue {
  theme: ThemeMode;
  accent: AccentPalette;
  setTheme: (t: ThemeMode) => void;
  setAccent: (a: AccentPalette) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  accent: {
    hex: "#10b981",
    name: "Emerald",
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    900: "#064e3b",
    shadow: "rgba(16,185,129,0.25)",
  },
  setTheme: () => {},
  setAccent: () => {},
});

export const useTheme = () => useContext(ThemeContext);