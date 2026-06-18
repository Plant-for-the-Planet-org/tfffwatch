"use client";

import { toReadable } from "@/lib/format";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";
import { useWorldMapStore } from "@/stores/map.store";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { twMerge } from "tailwind-merge";

const strokes = {
  restoration: "#2C9CDB",
  deforestation: "#EB5756",
  degradation: "#F1994A",
};

const fills = {
  restoration: "#E9F7FF",
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

type AxisTickProps = {
  x: number;
  y: number;
  payload: { value: number };
};

/**
 * Custom tick components to avoid wrapping and enforce color per-axis.
 * Recharts passes { x, y, payload }.
 */
const LeftYAxisTick = ({ x, y, payload }: AxisTickProps) => {
  return (
    <text
      x={x - 6} // nudge left so ticks don't collide with axis
      y={y + 4}
      textAnchor="end"
      fontSize={13}
      style={{ whiteSpace: "nowrap" }}
      fill={strokes.degradation}
    >
      {formatTickValue(payload.value)}
    </text>
  );
};

const RightYAxisTick = ({ x, y, payload }: AxisTickProps) => {
  return (
    <text
      x={x + 6} // nudge right so ticks don't collide with axis
      y={y + 4}
      textAnchor="start"
      fontSize={13}
      style={{ whiteSpace: "nowrap" }}
      fill={strokes.deforestation}
    >
      {formatTickValue(payload.value)}
    </text>
  );
};

export default function ForestCoverChangeAreaChart() {
  const { forestCoverChangeDataByCountry } = useForestCoverChangeData();
  const { selectedDataset } = useWorldMapStore();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // MMU data starts at 2021; other datasets at 2019.
  const minYear = selectedDataset === "MMU" ? 2020 : 2018;

  useEffect(() => {
    if (!forestCoverChangeDataByCountry?.length) return;

    const _chartData = forestCoverChangeDataByCountry
      .filter((el) => +el.year > minYear)
      .map((el) => ({
        year: el.year,
        degradation: -el.degraded_forest_ha,
        deforestation: -(el.degraded_forest_ha + el.deforested_ha),
      }));

    setChartData(_chartData);
  }, [forestCoverChangeDataByCountry, minYear]);

  const { leftDomainMin, rightDomainMin } = useMemo(() => {
    if (!chartData.length)
      return { leftDomainMin: "dataMin", rightDomainMin: "dataMin" };

    const degradationValues = chartData
      .map((d) => d.degradation)
      .filter((v) => Number.isFinite(v));
    const deforestationValues = chartData
      .map((d) => d.deforestation)
      .filter((v) => Number.isFinite(v));

    const leftMin =
      degradationValues.length > 0 ? Math.min(...degradationValues) : 0;
    const rightMin =
      deforestationValues.length > 0 ? Math.min(...deforestationValues) : 0;

    const leftPadded = leftMin + leftMin * 0.15;
    const rightPadded = rightMin + rightMin * 0.15;

    return {
      leftDomainMin: Number.isFinite(leftPadded) ? leftPadded : "dataMin",
      rightDomainMin: Number.isFinite(rightPadded) ? rightPadded : "dataMin",
    };
  }, [chartData]);

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

            {/* LEFT Y: degradation (smaller-magnitude series) */}
            <YAxis
              yAxisId="left"
              orientation="left"
              domain={[leftDomainMin as number, 0]}
              tickLine={false}
              axisLine={{ stroke: strokes.degradation }}
              // removed label prop (user requested no axis label text)
              // custom tick component to prevent wrapping and color ticks
              tick={(props) => <LeftYAxisTick {...props} />}
              width={90}
              label={{
                value: "Degraded (ha)",
                angle: -90,
                position: "insideLeft",
                fill: strokes.degradation,
                offset: 0,
                style: {
                  textAnchor: "middle",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                },
              }}
            />

            {/* RIGHT Y: deforestation (larger-magnitude series) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[rightDomainMin as number, 0]}
              tickLine={false}
              axisLine={{ stroke: strokes.deforestation }}
              // removed label prop (user requested no axis label text)
              tick={(props) => <RightYAxisTick {...props} />}
              width={90}
              label={{
                value: "Deforested (ha)",
                angle: 90,
                position: "insideRight",
                fill: strokes.deforestation,
                offset: 0,
                style: {
                  textAnchor: "middle",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                },
              }}
            />

            <XAxis dataKey="year" fontSize={14} tickLine={false} />

            {/* IMPORTANT: changed type from "monotone" (smooth/rounded) to "linear" (straight lines / hard edges) */}
            <Area
              yAxisId="right"
              // type="linear" // Was: "monotone" -> change removes curve smoothing
              type="monotone" // Was: "monotone" -> change removes curve smoothing
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
              yAxisId="left"
              // type="linear" // Was: "monotone" -> change removes curve smoothing
              type="monotone" // Was: "monotone" -> change removes curve smoothing
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
