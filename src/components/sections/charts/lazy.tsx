"use client";

// Lazy (client-only) versions of the Recharts charts. Recharts'
// ResponsiveContainer renders nothing on the server anyway, so loading it after
// first paint loses no HTML. Each placeholder reserves the chart's height so the
// page does not shift when the chart arrives.

import dynamic from "next/dynamic";

export const LazyInvestmentGaugeChart = dynamic(
  () => import("./InvestmentGaugeChart"),
  { ssr: false, loading: () => <div className="min-h-[220px]" /> }
);

export const LazyAnnualPayoutAreaChart = dynamic(
  () => import("./AnnualPayoutAreaChart"),
  { ssr: false, loading: () => <div className="min-h-[400px]" /> }
);

export const LazyForestCoverChangeAreaChart = dynamic(
  () => import("./ForestCoverChangeAreaChart"),
  { ssr: false, loading: () => <div className="min-h-[420px]" /> }
);

export const LazyDonutChart = dynamic(
  () => import("./primitives/DonutChart").then((m) => m.DonutChart),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[300px] md:max-w-2/3 mx-auto" />
    ),
  }
);
