import React from "react";

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  description,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        {label && (
          <p className="text-sm font-semibold themed-text">
            {label}
          </p>
        )}

        {description && (
          <p className="text-xs themed-muted mt-0.5">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
          enabled
            ? "accent-bg"
            : "bg-slate-200 dark:bg-slate-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
            enabled
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;