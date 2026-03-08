// src/lib/mockData.ts
// Mock sales data inspired by the "Superstore Sales" dataset from Kaggle
// (https://www.kaggle.com/datasets/vivek468/superstore-dataset-final)
// Categories and regions match that dataset's structure.
// Revenue and units are randomly generated for illustrative purposes.

import { SaleRecord, YearlySummary, MonthlySummary, CategorySummary, RegionSummary } from "@/types/sales";

const CATEGORIES = ["Technology", "Furniture", "Office Supplies", "Clothing", "Food & Beverage"];
const REGIONS    = ["West", "East", "Central", "South"];

const MONTHLY_BASE: Record<number, number[]> = {
  2022: [42000, 38000, 51000, 47000, 55000, 62000, 58000, 67000, 71000, 79000, 91000, 103000],
  2023: [49000, 44000, 57000, 53000, 63000, 70000, 66000, 74000, 80000, 87000, 99000, 115000],
  2024: [55000, 50000, 63000, 59000, 70000, 78000, 74000, 83000, 89000, 97000, 110000, 128000],
};

const CATEGORY_SPLITS: Record<string, number> = {
  "Technology":       0.32,
  "Furniture":        0.22,
  "Office Supplies":  0.20,
  "Clothing":         0.15,
  "Food & Beverage":  0.11,
};

const REGION_SPLITS: Record<string, number> = {
  "West":    0.28,
  "East":    0.30,
  "Central": 0.22,
  "South":   0.20,
};

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function buildYearlySummary(year: number): YearlySummary {
  const bases  = MONTHLY_BASE[year];
  const totalRevenue  = bases.reduce((a, b) => a + b, 0);
  const totalUnits    = Math.round(totalRevenue / 148);     // avg order ~$148
  const avgOrderValue = Math.round(totalRevenue / totalUnits);

  const monthlyData: MonthlySummary[] = bases.map((rev, i) => ({
    month:         `${MONTH_NAMES[i]} ${year}`,
    monthKey:      `${year}-${String(i + 1).padStart(2, "0")}`,
    revenue:       rev,
    units:         Math.round(rev / (140 + i * 2)),
    avgOrderValue: Math.round(rev / Math.round(rev / (140 + i * 2))),
  }));

  const categoryData: CategorySummary[] = Object.entries(CATEGORY_SPLITS).map(([cat, split]) => ({
    category: cat,
    revenue:  Math.round(totalRevenue * split),
    units:    Math.round(totalUnits   * split),
  }));

  const regionData: RegionSummary[] = Object.entries(REGION_SPLITS).map(([reg, split]) => ({
    region:  reg,
    revenue: Math.round(totalRevenue * split),
    units:   Math.round(totalUnits   * split),
  }));

  return { year, totalRevenue, totalUnits, avgOrderValue, monthlyData, categoryData, regionData };
}

export const salesData: Record<number, YearlySummary> = {
  2022: buildYearlySummary(2022),
  2023: buildYearlySummary(2023),
  2024: buildYearlySummary(2024),
};

// Flat records for custom date-range filtering
export const allRecords: SaleRecord[] = (() => {
  const records: SaleRecord[] = [];
  [2022, 2023, 2024].forEach((year) => {
    MONTHLY_BASE[year].forEach((base, mi) => {
      const daysInMonth = new Date(year, mi + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const dailyRev = Math.round(base / daysInMonth * (0.7 + Math.random() * 0.6));
        records.push({
          date:     `${year}-${String(mi + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,
          revenue:  dailyRev,
          units:    Math.max(1, Math.round(dailyRev / 148)),
          category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
          region:   REGIONS[Math.floor(Math.random() * REGIONS.length)],
        });
      }
    });
  });
  return records;
})();

export function filterRecordsByDateRange(from: string | null, to: string | null): SaleRecord[] {
  return allRecords.filter((r) => {
    if (from && r.date < from) return false;
    if (to   && r.date > to)   return false;
    return true;
  });
}

export function aggregateByMonth(records: SaleRecord[]): MonthlySummary[] {
  const map = new Map<string, { revenue: number; units: number }>();
  records.forEach((r) => {
    const key = r.date.slice(0, 7); // YYYY-MM
    const cur = map.get(key) ?? { revenue: 0, units: 0 };
    map.set(key, { revenue: cur.revenue + r.revenue, units: cur.units + r.units });
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const [y, m] = key.split("-");
      return {
        month:         `${MONTH_NAMES[parseInt(m) - 1]} ${y}`,
        monthKey:      key,
        revenue:       val.revenue,
        units:         val.units,
        avgOrderValue: val.units > 0 ? Math.round(val.revenue / val.units) : 0,
      };
    });
}

export function aggregateByCategory(records: SaleRecord[]): CategorySummary[] {
  const map = new Map<string, { revenue: number; units: number }>();
  records.forEach((r) => {
    const cur = map.get(r.category) ?? { revenue: 0, units: 0 };
    map.set(r.category, { revenue: cur.revenue + r.revenue, units: cur.units + r.units });
  });
  return Array.from(map.entries()).map(([category, val]) => ({ category, ...val }));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
