import { toReadableAmount, toReadableAmountLong } from "@/lib/format";
import { InvestmentTrackerCapitals } from "@/utils/types";
import Image from "next/image";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  chartData: InvestmentTrackerCapitals[];
};

const COLORS = {
  pledged: "#90BDF2",
  invested: "#6fcf97",
  target: "#DFE5ED",
  norway2026: "#DFE5ED",
};

const TARGET = 25000000000;
const NORWAY_2026_TARGET = 10000000000;
const NORWAY_2026_TARGET_LABEL = 12500000000;
const LABEL_OFFSET_X = 8;

type PieData = {
  id: string;
  label: string;
  value: number;
  color: string;
  country?: string;
};

type LabelData = {
  id: string;
  name: string;
  nameShort?: string;
  actualValue: number;
  position: number;
  originalPosition: number;
  color: string;
};

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  startAngle: number;
  endAngle: number;
  payload?: { name: string; value: number };
}

interface CustomLabelWithDataProps extends CustomLabelProps {
  labelData: LabelData;
  stackingIndex: number;
}

const CustomLabel = (props: CustomLabelWithDataProps) => {
  const { cx, cy, outerRadius = 0, labelData } = props;

  const isRight = labelData.position >= 50;
  const xRight = cx + outerRadius + LABEL_OFFSET_X;
  const xLeft = cx - outerRadius - LABEL_OFFSET_X;
  const baseY = cy - outerRadius * 0.05;

  let x = isRight ? xRight : xLeft;
  let y = baseY;

  // Dynamic circular position for pledged label
  if (labelData.id === "pledged" && labelData.position > 0) {
    let angleDeg = 180 - (labelData.position / 100) * 180;
    if (labelData.position < 5) {
      angleDeg -= 9;
    }

    const angleRad = (Math.PI * angleDeg) / 180;
    const radius = outerRadius * 1.1;
    x = cx + radius * Math.cos(angleRad);
    y = cy - radius * Math.sin(angleRad);
  }

  // Dynamic circular position for norway2026 label
  if (labelData.id === "norway2026" && labelData.position > 0) {
    let angleDeg = 180 - (labelData.position / 100) * 180;
    if (labelData.position < 5) {
      angleDeg -= 10;
    }

    const angleRad = (Math.PI * angleDeg) / 180;
    const radius = outerRadius * 1.1;
    x = cx + radius * Math.cos(angleRad);
    y = cy - radius * Math.sin(angleRad);
  }

  // Keep invested label fixed baseline on left
  if (labelData.id === "invested") {
    x = xLeft;
    y = baseY;
  }

  // Keep target label baseline centered right
  if (labelData.id === "target") {
    x = xRight;
    y = baseY;
  }

  const textAnchor: "start" | "end" = x > cx ? "start" : "end";

  if (labelData.id === "norway2026") {
    return (
      <g>
        {labelData.id === "norway2026" && (
          <foreignObject
            x={x - 48}
            y={y - 48}
            width={288}
            height={32 + 96}
            className=""
          >
            <>
              <div className="h-full w-full flex flex-col justify-end items-start relative">
                <div className="flex justify-center items-center gap-1 text-xs">
                  <p className="font-bold">2026 Target</p>
                  <div className="relative group">
                    <Image
                      width={14}
                      height={14}
                      src={"/assets/tooltip-info-icon-2.svg"}
                      alt=""
                    />
                    <div className="hidden group-hover:block absolute z-50 -top-16 left-4">
                      <div className="bg-white border border-primary-light w-48 p-2 px-4 rounded-xl">
                        <p className="text-xs">
                          $10 bn in total pledges required by end of 2026 to
                          unlock Norway’s pledge (see Norway tracker tab)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1 text-xs">
                  <p>set by Norway</p>
                </div>
              </div>
              <div className="hidden group-hover:block absolute z-50 top-0">
                <div className="bg-white">some text</div>
              </div>
            </>
          </foreignObject>
        )}
      </g>
    );
  }
  return (
    <g className="group">
      {labelData.id === "pledged" && (
        <foreignObject
          x={x - (80 + 30)}
          y={y - 40}
          width={160}
          height={40}
          className="relative"
        >
          <div className="hidden group-hover:block absolute z-50 inset-0 shadow">
            <div className="bg-background rounded-xl p-2 text-center">
              <p className="text-sm">
                ${" "}
                {labelData.actualValue.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </foreignObject>
      )}
      {labelData.id === "norway2026" && <></>}
      <text
        className="hidden sm:block"
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill="#111827"
        fontSize={12}
      >
        {labelData.id === "norway2026" ? (
          <></>
        ) : (
          <>
            <tspan x={x} dy={12} fontWeight="700">
              {toReadableAmountLong(
                labelData.actualValue,
                true,
                true
              ).toLowerCase()}
            </tspan>
            <tspan x={x} dy={12} fontWeight="400" fontSize={11}>
              {labelData.name}
            </tspan>
          </>
        )}
      </text>
    </g>
  );
};

function CustomPieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: PieData;
  }>;
}) {
  if (active && payload && payload.length) {
    if (!payload[0].payload?.id?.includes("pledged")) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-primary-light rounding-lg p-2 px-4">
        <p className="font-semibold text-sm whitespace-nowrap">
          {data.country || data.label}
        </p>
        <p className="text-sm">
          {toReadableAmountLong(data.value, true, true).toLowerCase()}
          {/* {toReadableAmount(data.value).toLowerCase()} */}
        </p>
      </div>
    );
  }
  return null;
}

export default function InvestmentGaugeChart({ chartData }: Props) {
  // const chartTotalPledgedText = useMemo(() => {
  //   const totalPledged = chartData.reduce(
  //     (sum, row) => sum + (row?.pledged_capital || 0),
  //     0
  //   );
  //   return `${toReadableAmount(totalPledged)} of ${toReadableAmount(
  //     TARGET
  //   )} pledged`;
  // }, [chartData]);

  const { pieData, labelData } = useMemo(() => {
    const totalInvested = chartData.reduce(
      (sum, row) => sum + (row?.invested_capital || 0),
      0
    );
    const totalPledged = chartData.reduce(
      (sum, row) => sum + (row?.pledged_capital || 0),
      0
    );

    const data: PieData[] = [];

    // 1. Invested - single pie
    data.push({
      id: "invested",
      label: "Invested capital",
      value: totalInvested,
      color: COLORS.invested,
    });

    // 2. Pledged - each country as separate pie
    chartData
      .filter((row) => row.pledged_capital > 0)
      .sort((a, b) => b.pledged_capital - a.pledged_capital)
      .forEach((row) => {
        data.push({
          id: `pledged-${row.country}`,
          label: "Pledged capital",
          value: row.pledged_capital,
          color: COLORS.pledged,
          country: row.country,
        });
      });

    // // 3. Norway 2026 Target
    // data.push({
    //   id: "norway2026",
    //   label: "Norway 2026 Target",
    //   value: NORWAY_2026_TARGET - (totalInvested + totalPledged),
    //   color: COLORS.norway2026,
    // });

    // 4. Remaining
    const remaining = TARGET - (totalInvested + totalPledged);
    data.push({
      id: "remaining",
      label: "Remaining",
      value: remaining,
      color: COLORS.target,
    });

    // Calculate positions for labels
    const invPct =
      TARGET > 0 ? Math.min(100, (totalInvested / TARGET) * 100) : 0;
    const plgPct =
      TARGET > 0 ? Math.min(100, (totalPledged / TARGET) * 100) : 0;
    const norwayPct =
      TARGET > 0 ? Math.min(100, (NORWAY_2026_TARGET_LABEL / TARGET) * 100) : 0;

    const labels: LabelData[] = [
      {
        id: "invested",
        name: "Invested capital",
        nameShort: "Invested",
        actualValue: totalInvested,
        position: invPct,
        originalPosition: invPct,
        color: COLORS.invested,
      },
      {
        id: "pledged",
        name: "Pledged capital",
        nameShort: "Pledged",
        actualValue: totalPledged,
        position: invPct + plgPct,
        originalPosition: invPct + plgPct,
        color: COLORS.pledged,
      },
      {
        id: "norway2026",
        name: "Norway 2026 Target",
        actualValue: NORWAY_2026_TARGET,
        position: norwayPct,
        originalPosition: norwayPct,
        color: COLORS.norway2026,
      },
      {
        id: "target",
        name: "Target",
        nameShort: "Target",
        actualValue: TARGET,
        position: 100,
        originalPosition: 100,
        color: COLORS.target,
      },
    ];

    return { pieData: data, labelData: labels };
  }, [chartData]);

  return (
    <div className="outlines-none">
      <ResponsiveContainer width="100%" height="100%" minHeight={220}>
        <PieChart>
          {/* Main data pie */}
          <Pie
            isAnimationActive={false}
            data={pieData}
            startAngle={180}
            endAngle={0}
            innerRadius="130%"
            outerRadius="150%"
            dataKey="value"
            cy="90%"
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Norway 2026 edge marker */}
          <Pie
            isAnimationActive={false}
            data={[{ value: 1 }]}
            startAngle={116.3}
            endAngle={116.31}
            innerRadius="120%"
            outerRadius="160%"
            dataKey="value"
            cy="90%"
            labelLine={false}
            stroke="#000000"
            strokeWidth={1}
            strokeDasharray={4.5}
          >
            <Cell fill="transparent" />
            <Cell fill="transparent" />
          </Pie>

          {/* Labels layer */}
          {labelData.map((label, index) => {
            const angle = 180 - (label.position / 100) * 180;
            const startAngle = angle - 0.1;
            const endAngle = angle + 0.1;

            return (
              <Pie
                key={`label-${index}`}
                isAnimationActive={false}
                data={[{ name: label.name, value: 1 }]}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius="130%"
                outerRadius="150%"
                dataKey="value"
                cy="90%"
                labelLine={false}
                label={(props: CustomLabelProps) => (
                  <CustomLabel
                    {...props}
                    labelData={label}
                    stackingIndex={index}
                  />
                )}
                stroke="transparent"
                fill="transparent"
              >
                <Cell fill="transparent" />
              </Pie>
            );
          })}

          <Tooltip
            content={<CustomPieTooltip />}
            wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
            cursor={false}
          />

          {/* <text
            x="50%"
            y="80%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs uppercase font-bold text-base-text"
          >
            Pledged Capital
          </text> */}
          <text
            x="50%"
            y="88%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="typo-h3"
          >
            {/* {chartTotalPledgedText} */}
            Sponsor Capital
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="sm:hidden flex flex-nowrap justify-between gap-2 mt-4 px-3">
        {labelData.map((item) => (
          <>
            {item.id === "norway2026" ? null : (
              <div
                key={item.name}
                className="flex justify-center items-center gap-2"
              >
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-800">
                    {toReadableAmount(item.actualValue, true)}
                  </div>
                  <div className="text-xs text-gray-600">{item.nameShort}</div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
