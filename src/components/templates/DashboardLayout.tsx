// src/components/templates/DashboardLayout.tsx
// Template component — defines the full-page layout shell (sidebar + main area)
// Children are injected as the main content area.

import React from "react";
import { BarChart2 } from "lucide-react";
import { H1, Caption } from "@/components/atoms/Typography";
import { DarkModeToggle } from "@/components/atoms/DarkModeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 font-sans">
    {/* Top nav */}
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-6 shadow-sm">
      <span className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
        <BarChart2 size={20} />
        <H1 className="text-base font-semibold text-primary-700 dark:text-primary-300">SalesVision</H1>
      </span>
      <span className="ml-2 hidden rounded bg-primary-50 dark:bg-primary-900 px-2 py-0.5 text-xs font-medium text-primary-600 dark:text-primary-400 sm:inline">
        Analytics Dashboard
      </span>
      <div className="ml-auto flex items-center gap-3">
        <Caption>Data: 2022 – 2024</Caption>
        <DarkModeToggle />
      </div>
    </header>

    {/* Page content */}
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);
