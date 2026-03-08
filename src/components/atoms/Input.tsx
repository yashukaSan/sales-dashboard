// src/components/atoms/Input.tsx
// Atomic component — a styled date/text input

import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={id} className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
        {label}
      </label>
    )}
    <input
      id={id}
      className={clsx(
        "rounded border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200",
        "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
        "focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900",
        "disabled:bg-neutral-50 dark:disabled:bg-neutral-700 disabled:text-neutral-400",
        error && "border-rose-400 focus:ring-rose-100 dark:border-rose-600 dark:focus:ring-rose-900",
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-rose-600">{error}</p>}
  </div>
);
