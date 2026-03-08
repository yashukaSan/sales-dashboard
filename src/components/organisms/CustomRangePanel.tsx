// src/components/organisms/CustomRangePanel.tsx
// Organism: combines DateRangePicker + SalesChart to display a user-defined date range.
// Filters flat daily records and re-aggregates by month.

"use client";

import React, { useState, useMemo } from "react";
import { DateRangePicker } from "@/components/molecules/DateRangePicker";
import { SalesChart } from "@/components/organisms/SalesChart";
import { Card } from "@/components/atoms/Card";
import { H3, BodyText } from "@/components/atoms/Typography";
import { DateRange } from "@/types/sales";
import { filterRecordsByDateRange, aggregateByMonth, aggregateByCategory } from "@/lib/mockData";
import { CalendarSearch } from "lucide-react";

export const CustomRangePanel: React.FC = () => {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });

  const filtered   = useMemo(() => filterRecordsByDateRange(range.from, range.to), [range]);
  const monthly    = useMemo(() => aggregateByMonth(filtered),                     [filtered]);
  const categories = useMemo(() => aggregateByCategory(filtered),                  [filtered]);

  const hasData  = monthly.length > 0;
  const hasRange = range.from || range.to;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <H3>Custom Date Range</H3>
          <BodyText>Filter sales data by choosing a start and end date.</BodyText>
        </div>
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      {hasRange && hasData && (
        <SalesChart
          monthlyData={monthly}
          categoryData={categories}
          title="Revenue — Custom Range"
          subtitle={`${range.from ?? "…"} → ${range.to ?? "…"}`}
          defaultChartType="line"
        />
      )}

      {hasRange && !hasData && (
        <Card className="flex flex-col items-center gap-2 py-12 text-center">
          <CalendarSearch size={28} className="text-neutral-300" />
          <BodyText>No sales data found for the selected date range.</BodyText>
        </Card>
      )}

      {!hasRange && (
        <Card className="flex flex-col items-center gap-2 py-12 text-center">
          <CalendarSearch size={28} className="text-neutral-300" />
          <BodyText>Select a "From" date to explore custom sales data.</BodyText>
        </Card>
      )}
    </section>
  );
};
