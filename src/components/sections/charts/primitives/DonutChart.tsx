import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import type { DonutDatum } from "../transforms/rewards-donut";

// Shared donut presentation for the reward charts. Cell order is positional
// (caller pre-sorts `data`); markup preserved verbatim from the two charts.
export function DonutChart({
  data,
  centerLabel,
}: {
  data: DonutDatum[];
  centerLabel: string;
}) {
  return (
    <div className="relative w-full aspect-square max-w-[300px] md:max-w-2/3 mx-auto outlines-none">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={<ChartTooltip />}
            wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
            cursor={false}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <span className="text-2xl sm:text-3xl font-bold">{centerLabel}</span>
      </div>
    </div>
  );
}
