// src/types/sales.ts
// Core domain types for the Sales Dashboard application

export type ChartType = "bar" | "line" | "pie";

export interface SaleRecord {
  date: string;        // ISO date string YYYY-MM-DD
  revenue: number;     // USD
  units: number;
  category: string;
  region: string;
}

export interface MonthlySummary {
  month: string;       // e.g. "Jan 2022"
  monthKey: string;    // e.g. "2022-01"
  revenue: number;
  units: number;
  avgOrderValue: number;
}

export interface CategorySummary {
  category: string;
  revenue: number;
  units: number;
}

export interface RegionSummary {
  region: string;
  revenue: number;
  units: number;
}

export interface YearlySummary {
  year: number;
  totalRevenue: number;
  totalUnits: number;
  avgOrderValue: number;
  monthlyData: MonthlySummary[];
  categoryData: CategorySummary[];
  regionData: RegionSummary[];
}

export interface DateRange {
  from: string | null;  // ISO date YYYY-MM-DD
  to:   string | null;
}

export interface KPICard {
  label: string;
  value: string;
  change: number;       // percentage change vs prior period
  unit?: string;
}
