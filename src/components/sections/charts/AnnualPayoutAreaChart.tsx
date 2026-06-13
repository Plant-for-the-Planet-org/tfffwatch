"use client";

import { toReadable } from "@/lib/format";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartColor = {
  stroke: "#6FCF97",
  fill: "#9EEEC0",
};

type ChartData = {
  year: string;
  value: number;
};

export default function AnnualPayoutAreaChart() {
  const { forestCoverChangeDataByCountry } = useForestCoverChangeData();

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!forestCoverChangeDataByCountry?.length) return;

    const _chartData = forestCoverChangeDataByCountry
      .filter((el) => +el.year > 2018)
      .map((el) => ({
        year: el.year,
        value:
          el.eligibility_combined === false
            ? 0
            : el.reward_after_deductions_usd,
      }));

    setChartData(_chartData);
  }, [forestCoverChangeDataByCountry]);

  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={chartColor.stroke}
                stopOpacity={0.1}
              />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis
            type="number"
            fontSize={14}
            tickLine={false}
            tickFormatter={(value) => `$${toReadable(value)}`}
          />
          <XAxis dataKey="year" fontSize={14} tickLine={false} />
          <Area
            dataKey="value"
            strokeWidth={2}
            stroke={chartColor.stroke}
            dot={{ stroke: chartColor.stroke, fill: chartColor.fill, r: 4 }}
            fill="url(#lineGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
