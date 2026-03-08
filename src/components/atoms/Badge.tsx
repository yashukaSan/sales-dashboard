// src/components/atoms/Badge.tsx
// Atomic component — a small status/label badge

import React from "react";
import clsx from "clsx";

type Variant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  label: string;
  variant?: Variant;
  className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-neutral-100 text-neutral-700",
  success: "bg-secondary-100 text-secondary-700",
  warning: "bg-amber-100 text-amber-700",
  danger:  "bg-rose-100 text-rose-700",
  info:    "bg-primary-100 text-primary-700",
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = "default", className }) => (
  <span
    className={clsx(
      "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium tracking-wide",
      VARIANT_CLASSES[variant],
      className
    )}
  >
    {label}
  </span>
);
