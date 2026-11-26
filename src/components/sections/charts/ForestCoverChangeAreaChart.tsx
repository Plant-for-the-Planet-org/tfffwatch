"use client";

import { toReadable } from "@/lib/format";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";
import { DATASET_MIN_YEAR } from "@/domain/dataset";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { twMerge } from "tailwind-merge";

const strokes = {
  restoration: "#2D9CDB",
  deforestation: "#EB5756",
  degradation: "#F1994A",
};

const fills = {
  restoration: "#EFF6FF",
  deforestation: "#FFE6E6",
  degradation: "#FFF0E3",
};

type ChartData = {
  year: string;
  deforestation: number;
  degradation: number;
};

const SERIES = [
  { key: "deforestation", label: "Deforested" },
  { key: "degradation", label: "Degraded" },
] as const;

function formatTickValue(value: number) {
  return `${toReadable(Math.abs(value))} ha`;
}

type TooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: { dataKey?: string | number; value?: number }[];
};

// Hover tooltip: one row per series, with its colour swatch and the real
// (positive) hectares.
function ChartTooltip({ active, label, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-base-gray/50 bg-white p-3 text-sm shadow-custom">
      <p className="font-semibold mb-1">{label}</p>
      {SERIES.map(({ key, label: name }) => {
        const item = payload.find((p) => p.dataKey === key);
        if (!item) return null;
        return (
          <p key={key} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: strokes[key] }}
            />
            <span>{name}</span>
            <span className="ml-auto pl-4 font-semibold">
              {formatTickValue(Number(item.value))}
            </span>
          </p>
        );
      })}
    </div>
  );
}

export default function ForestCoverChangeAreaChart() {
  const { forestCoverChangeDataByCountry } = useForestCoverChangeData();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Charts start at DATASET_MIN_YEAR (2022).
  const minYear = DATASET_MIN_YEAR - 1;

  // One shared axis. Values are negative so both series grow downward:
  // deforestation sits next to 0 and degradation is stacked below it.
  useEffect(() => {
    if (!forestCoverChangeDataByCountry?.length) return;

    setChartData(
      forestCoverChangeDataByCountry
        .filter((el) => +el.year > minYear)
        .map((el) => ({
          year: el.year,
          deforestation: -el.deforested_ha,
          degradation: -el.degraded_forest_ha,
        })),
    );
  }, [forestCoverChangeDataByCountry, minYear]);

  return (
    <div>
      <div className="flex justify-end">
        <div className="font-thin">
          <div className="flex gap-2 items-center">
            <div className={twMerge("w-6 h-4", `bg-[#EB5756]`)}></div>
            <p>Deforested</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className={twMerge("w-6 h-4", `bg-[#F1994A]`)}></div>
            <p>Degraded</p>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              domain={["auto", 0]}
              tickLine={false}
              tickFormatter={formatTickValue}
              tick={{ fill: "currentColor", fontSize: 13 }}
              width={90}
            />
            <XAxis
              dataKey="year"
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 14 }}
            />
            <Tooltip content={<ChartTooltip />} />
            {SERIES.map(({ key }) => (
              <Area
                key={key}
                type="linear"
                stackId="forest"
                dataKey={key}
                stroke={strokes[key]}
                strokeWidth={2}
                fill={fills[key]}
                fillOpacity={0.5}
                dot={{ stroke: strokes[key], fill: strokes[key], r: 4 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
