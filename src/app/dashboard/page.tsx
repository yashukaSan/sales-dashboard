// src/app/dashboard/page.tsx
// Dashboard page — all sales components are composed here.
// This is the primary route: /dashboard

"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { KpiRow }           from "@/components/organisms/KpiRow";
import { YearSelector }     from "@/components/organisms/YearSelector";
import { SalesChart }       from "@/components/organisms/SalesChart";
import { CustomRangePanel } from "@/components/organisms/CustomRangePanel";
import { H2, BodyText }     from "@/components/atoms/Typography";
import { salesData }        from "@/lib/mockData";

const YEARS  = [2022, 2023, 2024] as const;
type Year    = (typeof YEARS)[number];

export default function DashboardPage() {
  const [activeYear, setActiveYear] = useState<Year>(2024);

  const current  = salesData[activeYear]  ?? null;
  const previous = salesData[activeYear - 1] ?? null;

  return (
    <DashboardLayout>
      {/* ── Page header ── */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <H2>Sales Overview</H2>
          <BodyText>
            Retail sales performance modelled after the Superstore dataset (Kaggle).
          </BodyText>
        </div>
        <YearSelector
          years={[...YEARS]}
          active={activeYear}
          onChange={(y) => setActiveYear(y as Year)}
        />
      </div>

      {/* ── KPI cards ── */}
      <section className="mb-6">
        <KpiRow current={current} previous={previous} />
      </section>

      {/* ── Main charts ── */}
      <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart
          monthlyData={current?.monthlyData ?? []}
          title={`Monthly Revenue — ${activeYear}`}
          subtitle="Toggle between chart types using the buttons above"
          defaultChartType="bar"
        />
        <SalesChart
          monthlyData={current?.monthlyData ?? []}
          categoryData={current?.categoryData ?? []}
          title={`Sales by Category — ${activeYear}`}
          subtitle="Revenue breakdown by product category"
          defaultChartType="pie"
        />
      </section>

      {/* ── Divider ── */}
      <div className="mb-6 border-t border-neutral-200" />

      {/* ── Custom date range ── */}
      <CustomRangePanel />
    </DashboardLayout>
  );
}
