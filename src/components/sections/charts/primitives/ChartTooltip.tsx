// Shared recharts tooltip for the reward donuts (markup preserved verbatim).
export function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: { name: string; value: number; eligibility: string };
  }>;
}) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-background border border-primary-light rounding-lg outer-padding-3">
        <p className="font-semibold text-sm whitespace-nowrap">{data.name}</p>
        <p className="text-xs text-gray-600">{data.eligibility}</p>
        <p className="text-sm font-medium mt-1">
          ${(data.value / 1000000).toFixed(2)}m
        </p>
      </div>
    );
  }
  return null;
}
