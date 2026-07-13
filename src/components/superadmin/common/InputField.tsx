"use client";

import { FC } from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
        {required && (
          <span className="ml-0.5 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
  );
};

export default InputField;