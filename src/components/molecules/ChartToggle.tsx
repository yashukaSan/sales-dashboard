// src/components/molecules/ChartToggle.tsx
// Molecule component — groups Button atoms into a segmented chart-type selector

import React from "react";
import { Button } from "@/components/atoms/Button";
import { BarChart2, LineChart, PieChart } from "lucide-react";
import { ChartType } from "@/types/sales";

interface ChartToggleProps {
  active: ChartType;
  onChange: (type: ChartType) => void;
}

const OPTIONS: { type: ChartType; label: string; Icon: React.ElementType }[] = [
  { type: "bar",  label: "Bar",  Icon: BarChart2  },
  { type: "line", label: "Line", Icon: LineChart   },
  { type: "pie",  label: "Pie",  Icon: PieChart    },
];

export const ChartToggle: React.FC<ChartToggleProps> = ({ active, onChange }) => (
  <div className="flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 p-1">
    {OPTIONS.map(({ type, label, Icon }) => (
      <Button
        key={type}
        variant={active === type ? "active" : "ghost"}
        size="sm"
        onClick={() => onChange(type)}
        aria-pressed={active === type}
      >
        <Icon size={14} />
        {label}
      </Button>
    ))}
  </div>
);
