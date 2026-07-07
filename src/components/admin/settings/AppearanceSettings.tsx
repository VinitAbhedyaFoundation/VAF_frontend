import React from "react";
import { Monitor, Moon, Palette, Sun } from "lucide-react";

import SettingsCard from "./SettingsCard";

type ThemeMode = "light" | "dark" | "system";

interface AppearanceSettingsProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  theme,
  setTheme,
}) => {
  const themes = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <SettingsCard
      title="Theme"
      description="Choose how the portal looks"
      icon={Palette}
    >
      <div className="flex gap-3 mb-6">
        {themes.map((item) => (
          <button
            key={item.value}
            onClick={() => setTheme(item.value)}
            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition font-semibold text-sm ${
              theme === item.value
                ? "accent-border accent-bg-soft accent-text"
                : "border-slate-200 themed-secondary themed-hover"
            }`}
          >
            <item.icon size={22} />
            {item.label}
          </button>
        ))}
      </div>
    </SettingsCard>
  );
};

export default AppearanceSettings;