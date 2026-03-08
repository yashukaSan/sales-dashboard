// src/components/atoms/Button.tsx
// Atomic component — a reusable button with size and variant props

import React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "active";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:   "bg-primary-600 text-white hover:bg-primary-700 border border-primary-600",
  secondary: "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-600",
  ghost:     "bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-transparent",
  active:    "bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2   text-sm",
  lg: "px-5 py-2.5 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size    = "md",
  className,
  children,
  ...props
}) => (
  <button
    className={clsx(
      "inline-flex items-center gap-1.5 rounded font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      className
    )}
    {...props}
  >
    {children}
  </button>
);
