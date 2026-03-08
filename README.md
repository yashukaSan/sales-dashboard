# SalesVision — Sales Analytics Dashboard

A production-ready sales analytics dashboard built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Recharts**, following the **Atomic Design** structural principle.

---

## What Was Built

### Architecture: Atomic Design

The project is structured using Brad Frost's Atomic Design methodology, with components organised from smallest to largest:

```
src/components/
├── atoms/           # Smallest building blocks
│   ├── Badge.tsx        — Status label chip
│   ├── Button.tsx       — Reusable button (primary / secondary / ghost / active variants)
│   ├── Card.tsx         — Surface container with border and shadow
│   ├── Input.tsx        — Styled text / date input with label + error state
│   └── Typography.tsx   — H1, H2, H3, BodyText, Caption semantic text components
│
├── molecules/       # Composed groups of atoms
│   ├── ChartToggle.tsx      — Segmented button group to switch chart type (Bar / Line / Pie)
│   ├── DateRangePicker.tsx  — Two date inputs with From/To validation
│   └── KpiCard.tsx          — Metric card with trend indicator
│
├── organisms/       # Complex UI sections
│   ├── CustomRangePanel.tsx — Date-range filter + dynamic chart (filters all daily records)
│   ├── KpiRow.tsx           — Responsive grid of 4 KPI cards
│   ├── SalesChart.tsx       — Full chart panel: toggleable Bar / Line / Pie via recharts
│   └── YearSelector.tsx     — Tab bar for 2022 / 2023 / 2024
│
└── templates/       # Full-page layout shells
    └── DashboardLayout.tsx  — Top-nav + centred main content wrapper
```

### Dashboard Page

`/dashboard` (`src/app/dashboard/page.tsx`) assembles all organisms and template into a single cohesive page:

1. **Year selector** — switch between 2022, 2023, 2024
2. **KPI row** — Revenue, Units Sold, Avg Order Value, YoY Growth vs prior year
3. **Monthly Revenue chart** — Bar / Line / Pie toggleable
4. **Category Revenue chart** — Revenue breakdown by product category (Pie default)
5. **Custom date range panel** — User-defined date filter with dynamic chart

### Data

Mock data is modelled after the **[Superstore Sales dataset](https://www.kaggle.com/datasets/vivek468/superstore-dataset-final)** from Kaggle.

- Categories: Technology, Furniture, Office Supplies, Clothing, Food & Beverage
- Regions: West, East, Central, South
- Daily records generated for all of 2022–2024 (∼1,095 records)
- Revenue follows realistic seasonal patterns (stronger Q4)

### Key Features

| Feature | Detail |
|---------|--------|
| Chart types | Bar, Line, Pie — toggled per chart independently |
| Date range picker | From/To inputs — "To" cannot precede "From" |
| Year tabs | Switch full-year view between 2022, 2023, 2024 |
| KPI trend arrows | Green ↑ / Red ↓ vs prior year |
| Colour palette | Standard blues, greens, ambers — no vibrant colours |
| Typography | Georgia display + system sans-serif — no Inter/Roboto |
| Fully typed | 100% TypeScript — all props, data models, helpers |

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.6 | React framework (App Router) |
| react / react-dom | ^19.2.4 | UI rendering |
| typescript | ^5 | Type safety |
| tailwindcss | ^4.2.1 | Utility-first styling |
| recharts | ^3.8.0 | Composable chart components |
| lucide-react | ^0.577.0 | Icon set |
| date-fns | ^4.1.0 | Date utilities |
| clsx | ^2.1.1 | Conditional className helper |

---

## Project Setup

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9  (or pnpm / yarn)

### 1. Clone or unzip the project

```bash
git clone <repo-url> sales-dashboard
cd sales-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/dashboard`.

### 4. Build for production

```bash
npm run build
npm start
```

### 5. Lint

```bash
npm run lint
```

---

## Folder Structure

```
sales-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx        ← main dashboard page
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            ← redirects to /dashboard
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── lib/
│   │   └── mockData.ts         ← data generation & helpers
│   └── types/
│       └── sales.ts            ← TypeScript interfaces
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── postcss.config.js
└── README.md
```

---

## Customisation

- **Add real data**: Replace `src/lib/mockData.ts` with API calls; the component interfaces stay the same.
- **Add a new chart**: Add a new `ChartType` value, add a case in `SalesChart.tsx`, and add a button in `ChartToggle.tsx`.
- **Add a year**: Extend `MONTHLY_BASE` in `mockData.ts` and add the year to the `YEARS` array in `dashboard/page.tsx`.
