// src/components/organisms/KpiRow.tsx
// Organism component — renders a responsive grid of KpiCard molecules

import React from "react";
import { KpiCard } from "@/components/molecules/KpiCard";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { YearlySummary } from "@/types/sales";
import { formatCurrency } from "@/lib/mockData";

interface KpiRowProps {
  current: YearlySummary | null;
  previous: YearlySummary | null;
}

function pctChange(curr: number, prev: number): number {
  if (!prev) return 0;
  return ((curr - prev) / prev) * 100;
}

export const KpiRow: React.FC<KpiRowProps> = ({ current, previous }) => {
  if (!current) return null;

  const cards = [
    {
      label: "Total Revenue",
      value: formatCurrency(current.totalRevenue),
      change: previous ? pctChange(current.totalRevenue, previous.totalRevenue) : 0,
      icon: <DollarSign size={16} />,
    },
    {
      label: "Units Sold",
      value: current.totalUnits.toLocaleString(),
      change: previous ? pctChange(current.totalUnits, previous.totalUnits) : 0,
      icon: <Package size={16} />,
    },
    {
      label: "Avg Order Value",
      value: formatCurrency(current.avgOrderValue),
      change: previous ? pctChange(current.avgOrderValue, previous.avgOrderValue) : 0,
      icon: <ShoppingCart size={16} />,
    },
    {
      label: "YoY Growth",
      value: previous
        ? `${pctChange(current.totalRevenue, previous.totalRevenue).toFixed(1)}%`
        : "—",
      change: previous ? pctChange(current.totalRevenue, previous.totalRevenue) : 0,
      icon: <TrendingUp size={16} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <KpiCard key={c.label} {...c} />
      ))}
    </div>
  );
};
