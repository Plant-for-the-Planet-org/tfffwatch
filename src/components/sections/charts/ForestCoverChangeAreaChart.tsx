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

function formatTickValue(value: number) {
  return `${toReadable(Math.abs(value))} ha`;
}

export default function ForestCoverChangeAreaChart() {
  const { forestCoverChangeDataByCountry } = useForestCoverChangeData();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Charts start at DATASET_MIN_YEAR (2022).
  const minYear = DATASET_MIN_YEAR - 1;

  // Real hectares for each series, on one shared axis starting at 0, so the
  // two lines can be compared directly.
  useEffect(() => {
    if (!forestCoverChangeDataByCountry?.length) return;

    setChartData(
      forestCoverChangeDataByCountry
        .filter((el) => +el.year > minYear)
        .map((el) => ({
          year: el.year,
          deforestation: el.deforested_ha,
          degradation: el.degraded_forest_ha,
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
              domain={[0, "auto"]}
              tickLine={false}
              tickFormatter={formatTickValue}
              fontSize={13}
              width={90}
            />
            <XAxis dataKey="year" fontSize={14} tickLine={false} />
            <Tooltip
              formatter={(value, name) => [
                formatTickValue(Number(value)),
                name === "deforestation" ? "Deforested" : "Degraded",
              ]}
            />
            <Area
              type="monotone"
              dataKey="deforestation"
              stroke={strokes.deforestation}
              strokeWidth={2}
              fill={fills.deforestation}
              fillOpacity={0.5}
              dot={{
                stroke: strokes.deforestation,
                fill: fills.deforestation,
                r: 4,
              }}
            />
            <Area
              type="monotone"
              dataKey="degradation"
              stroke={strokes.degradation}
              strokeWidth={2}
              fill={fills.degradation}
              fillOpacity={0.5}
              dot={{
                stroke: strokes.degradation,
                fill: fills.degradation,
                r: 4,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
