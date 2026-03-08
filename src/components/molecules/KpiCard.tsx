// src/components/molecules/KpiCard.tsx
// Molecule component — combines Card, Typography, and Badge atoms
// to show a single KPI metric with trend indicator

import React from "react";
import { Card } from "@/components/atoms/Card";
import { Caption } from "@/components/atoms/Typography";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import clsx from "clsx";

interface KpiCardProps {
  label: string;
  value: string;
  change: number;   // percentage, positive = up, negative = down
  icon?: React.ReactNode;
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, change, icon }) => {
  const isUp   = change > 0;
  const isDown = change < 0;

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Caption className="uppercase tracking-widest font-medium">{label}</Caption>
        {icon && <span className="text-neutral-400">{icon}</span>}
      </div>

      <p className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{value}</p>

      <div
        className={clsx(
          "flex items-center gap-1 text-xs font-medium",
          isUp   && "text-secondary-700 dark:text-secondary-300",
          isDown && "text-rose-700 dark:text-rose-300",
          !isUp && !isDown && "text-neutral-500 dark:text-neutral-400"
        )}
      >
        {isUp   && <TrendingUp  size={13} />}
        {isDown && <TrendingDown size={13} />}
        {!isUp && !isDown && <Minus size={13} />}
        <span>
          {change > 0 ? "+" : ""}{change.toFixed(1)}% vs prior period
        </span>
      </div>
    </Card>
  );
};
