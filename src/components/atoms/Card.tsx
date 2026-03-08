// src/components/atoms/Card.tsx
// Atomic component — a surface container with border and shadow

import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING_CLASSES = {
  none: "",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-7",
};

export const Card: React.FC<CardProps> = ({ children, className, padding = "md" }) => (
  <div
    className={clsx(
      "rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm",
      PADDING_CLASSES[padding],
      className
    )}
  >
    {children}
  </div>
);
