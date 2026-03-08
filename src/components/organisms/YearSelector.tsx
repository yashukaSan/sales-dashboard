// src/components/organisms/YearSelector.tsx
// Organism component — tab group for selecting a sales year

import React from "react";
import { Button } from "@/components/atoms/Button";

interface YearSelectorProps {
  years: number[];
  active: number;
  onChange: (year: number) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({ years, active, onChange }) => (
  <div className="flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 p-1 w-fit">
    {years.map((y) => (
      <Button
        key={y}
        variant={y === active ? "active" : "ghost"}
        size="sm"
        onClick={() => onChange(y)}
        aria-pressed={y === active}
      >
        {y}
      </Button>
    ))}
  </div>
);
