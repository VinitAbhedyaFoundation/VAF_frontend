"use client";

import { FC } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;