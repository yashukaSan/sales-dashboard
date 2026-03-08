// src/components/organisms/SalesChart.tsx
// Organism component — full chart panel combining ChartToggle, recharts visualisations,
// and chart controls. Supports Bar, Line, and Pie chart types.
//
// External libraries used:
//   - recharts (^2.12) — composable charting library for React

"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell, Sector,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/atoms/Card";
import { H3, Caption } from "@/components/atoms/Typography";
import { ChartToggle } from "@/components/molecules/ChartToggle";
import { ChartType, MonthlySummary, CategorySummary } from "@/types/sales";
import { formatCurrency } from "@/lib/mockData";

// ── Palette ────────────────────────────────────────────────────────────────
// Standard, non-vibrant colours drawn from the tailwind palette defined in
// tailwind.config.ts (primary, secondary, neutral, accent)
const PALETTE = ["#2c5be8", "#617a5f", "#b45309", "#0f766e", "#be123c", "#475569"];

// ── Tooltip ────────────────────────────────────────────────────────────────
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 shadow-md text-sm">
      {label && <p className="mb-1 font-semibold text-neutral-700">{label}</p>}
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }} className="text-xs">
          {item.name}: {typeof item.value === "number" ? formatCurrency(item.value) : item.value}
        </p>
      ))}
    </div>
  );
};

// ── Pie active shape ───────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#374151" className="text-sm font-semibold">
        {payload.name ?? payload.category}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#6b7280" className="text-xs">
        {formatCurrency(value)}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

// ── Props ──────────────────────────────────────────────────────────────────
interface SalesChartProps {
  monthlyData: MonthlySummary[];
  categoryData?: CategorySummary[];
  title?: string;
  subtitle?: string;
  /** If provided the chart will default to this type (controlled from parent) */
  defaultChartType?: ChartType;
}

// ── Component ─────────────────────────────────────────────────────────────
export const SalesChart: React.FC<SalesChartProps> = ({
  monthlyData,
  categoryData = [],
  title = "Monthly Revenue",
  subtitle,
  defaultChartType = "bar",
}) => {
  const [chartType, setChartType] = useState<ChartType>(defaultChartType);
  const [activeIndex, setActiveIndex] = useState(0);

  // For pie chart we use category data; for bar/line we use monthly
  const pieData = useMemo(
    () =>
      categoryData.length
        ? categoryData
        : monthlyData.map((m) => ({ category: m.month, revenue: m.revenue, units: m.units })),
    [categoryData, monthlyData]
  );

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-700 px-5 py-4">
        <div>
          <H3>{title}</H3>
          {subtitle && <Caption>{subtitle}</Caption>}
        </div>
        <ChartToggle active={chartType} onChange={setChartType} />
      </div>

      {/* Chart body */}
      <div className="px-2 py-5">
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "bar" ? (
            <BarChart data={monthlyData} margin={{ left: 10, right: 10, bottom: 0, top: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={52} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="revenue" name="Revenue" fill={PALETTE[0]} radius={[3, 3, 0, 0]} />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={monthlyData} margin={{ left: 10, right: 10, bottom: 0, top: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={52} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke={PALETTE[0]} strokeWidth={2} dot={{ r: 3, fill: PALETTE[0] }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="units"   name="Units"   stroke={PALETTE[1]} strokeWidth={2} dot={{ r: 3, fill: PALETTE[1] }} activeDot={{ r: 5 }} yAxisId={0} />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                // @ts-expect-error activeIndex is valid in recharts v3
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                dataKey="revenue"
                nameKey="category"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value: string) => <span style={{ fontSize: 12, color: "#374151" }}>{value}</span>}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
