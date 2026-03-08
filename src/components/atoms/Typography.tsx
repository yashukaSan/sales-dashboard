// src/components/atoms/Typography.tsx
// Atomic component — semantic heading and body text components

import React from "react";
import clsx from "clsx";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TextProps> = ({ children, className }) => (
  <h1 className={clsx("font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight", className)}>
    {children}
  </h1>
);

export const H2: React.FC<TextProps> = ({ children, className }) => (
  <h2 className={clsx("font-display text-xl font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight", className)}>
    {children}
  </h2>
);

export const H3: React.FC<TextProps> = ({ children, className }) => (
  <h3 className={clsx("font-sans text-base font-semibold text-neutral-800 dark:text-neutral-200", className)}>
    {children}
  </h3>
);

export const BodyText: React.FC<TextProps> = ({ children, className }) => (
  <p className={clsx("font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed", className)}>
    {children}
  </p>
);

export const Caption: React.FC<TextProps> = ({ children, className }) => (
  <span className={clsx("font-sans text-xs text-neutral-500 dark:text-neutral-400", className)}>
    {children}
  </span>
);
