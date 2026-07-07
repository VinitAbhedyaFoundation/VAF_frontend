import React from "react";
import type { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  danger?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
  icon: Icon,
  danger = false,
}) => {
  return (
    <div
      className={`themed-card rounded-2xl border shadow-sm overflow-hidden ${
        danger ? "border-red-200" : ""
      }`}
    >
      <div
        className={`px-6 py-4 border-b flex items-center gap-3 ${
          danger
            ? "border-red-100 bg-red-50/50"
            : "themed-border themed-subtle"
        }`}
      >
        {Icon && (
          <div
            className={`p-2 rounded-xl ${
              danger
                ? "bg-red-100 text-red-600"
                : "accent-icon-bg"
            }`}
          >
            <Icon size={16} />
          </div>
        )}

        <div>
          <h3
            className={`font-bold text-sm ${
              danger ? "text-red-700" : "themed-text"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p className="text-xs themed-muted mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;