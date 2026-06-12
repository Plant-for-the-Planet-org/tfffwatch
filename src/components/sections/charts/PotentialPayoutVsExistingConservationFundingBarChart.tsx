"use client";

import { PageParams } from "@/app/(content)/[country]/[year]/page";
import { api, urls } from "@/lib/http";
import { getCountryDetails } from "@/utils/country-helper";
import { toReadableAmount } from "@/lib/format";
import { useForestCoverChangeData } from "@/utils/store";
import { Spending } from "@/utils/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  LabelListProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  label: string;
  value: number;
  fill: string;
  info?: {
    label?: string;
    labelLink?: string;
    details?: string;
  };
};

const ChartColors = {
  lightBlue: "#2F80ED80",
  blue: "#2F80ED",
  gray: "#BDBDBD",
};

const BAR_SIZE = 48;
const BAR_GAP_OFFSET = 16;
const BAR_GAP = BAR_SIZE + BAR_GAP_OFFSET;
const CHART_MARGIN = 16;

export default function PotentialPayoutVsExistingConservationFundingBarChart() {
  const params: PageParams = useParams();
  const { country, year } = params;
  const details = getCountryDetails({ country });
  const forestCiverChangeDataByCountry = useForestCoverChangeData(
    (state) => state.forestCoverChangeDataByCountry
  );

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    (async () => {
      const _data = await api<Spending[]>({
        url: urls.spending,
        query: { country: details.name },
        method: "GET",
        token: "",
      });
      if (!_data) return;

      const forestChangeOfYear = forestCiverChangeDataByCountry.find(
        (el) => +el.year === +year
      )!;
      const {
        eligibility_combined,
        base_reward_usd,
        deforestation_deduction_usd,
        degradation_deduction_usd,
      } = forestChangeOfYear;
      const estimateRewardAt0Deforestation: ChartData = {
        label: `Estimated TFFF Reward (${year}) if 0% deforestation`,
        value: base_reward_usd,
        fill: ChartColors.lightBlue,
        info: {
          details:
            "If the country ended all deforestation and forest degradation, it would be eligible to that payout. This also assumes that the TFFF is established and fully funded. Source: TFFF Watch Model",
        },
      };
      const reward_after_deduction =
        base_reward_usd -
        (deforestation_deduction_usd + degradation_deduction_usd);
      const estimateRewardAtCurrentDeforestation: ChartData = {
        label: `Estimated TFFF Reward (${year})  at current deforestation levels`,
        value: eligibility_combined === false ? 0 : reward_after_deduction,
        fill: ChartColors.blue,
        info: {
          details:
            "At current deforestation and degradation levels, the country would be eligible for this payout – if TFFF already existed and was fully funded. Source: TFFF Watch Model",
        },
      };

      const _spendings: ChartData[] = _data.map((el) => ({
        label: el.label + ` (${el.year})`,
        value: +el.amount_usd,
        fill: ChartColors.gray,
        info: {
          details: el.help_text,
          labelLink: el.source_url,
          label: el.source_name,
        },
      }));

      setChartData([
        estimateRewardAt0Deforestation,
        estimateRewardAtCurrentDeforestation,
        ..._spendings,
      ]);
    })();
  }, [details.name, year, forestCiverChangeDataByCountry]);

  return (
    <div>
      <div className="md:hidden">
        <BarChartMobile
          chartHeight={(BAR_SIZE + BAR_GAP) * chartData.length}
          chartData={chartData}
        />
      </div>
      <div className="hidden md:block">
        <BarChartDesktop
          chartHeight={
            CHART_MARGIN + (BAR_SIZE + BAR_GAP_OFFSET) * chartData.length
          }
          chartData={chartData}
        />
      </div>
    </div>
  );
}

type CustomLabelProps = LabelListProps<ChartData> & {
  // containerWidth: number;
  index?: number;
  data: ChartData[];
};
function CustomLabel(props: CustomLabelProps) {
  const { x, y, height, width, index, data } = props;
  const _y = (y as number) - (height as number) - BAR_GAP_OFFSET / 2;
  const tooltipData = data[index!].info;
  return (
    <g>
      <foreignObject x={x} y={_y} width={width} height={height}>
        <div className="text-xs sm:text-sm h-full flex items-end-safe">
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <InfoTooltip>
                <div className="text-xs sm:text-sm flex items-start gap-2">
                  {tooltipData?.labelLink && (
                    <Link
                      className="shrink-0 h-6 w-6 p-0.5 flex justify-center items-center bg-primary-light rounded"
                      href={tooltipData.labelLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="object-center"
                        width={14}
                        height={14}
                        src={"/assets/tooltip-link-icon.svg"}
                        alt=""
                      />
                    </Link>
                  )}
                  <div>
                    {tooltipData?.label && (
                      <Link
                        href={tooltipData.labelLink!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>{tooltipData.label}</b>
                      </Link>
                    )}
                    <p>{tooltipData?.details}</p>
                  </div>
                </div>
              </InfoTooltip>
            </div>
            <p>{data[index!].label}</p>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

type CustomTickProps = LabelListProps<ChartData> & {
  index?: number;
  data: ChartData[];
};
function CustomTick(props: CustomTickProps) {
  const { y, width, height = BAR_SIZE, index, data } = props;
  const _y = (y as number) - (height as number) / 2;
  const tooltipData = data[index!].info;

  return (
    <g className="hidden md:block">
      <foreignObject x={0} y={_y} width={width} height={height}>
        <div className="text-xs h-full pr-2 flex flex-col justify-center">
          <div className="flex justify-end items-center gap-2">
            <p className="text-end">{data[index!].label}</p>
            <div className="shrink-0">
              <InfoTooltip>
                <div className="text-xs sm:text-sm flex items-start gap-2">
                  {tooltipData?.labelLink && (
                    <Link
                      className="shrink-0 h-6 w-6 p-0.5 flex justify-center items-center bg-primary-light rounded"
                      href={tooltipData.labelLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="object-center"
                        width={14}
                        height={14}
                        src={"/assets/tooltip-link-icon.svg"}
                        alt=""
                      />
                    </Link>
                  )}
                  <div>
                    {tooltipData?.label && (
                      <Link
                        href={tooltipData.labelLink!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>{tooltipData.label}</b>
                      </Link>
                    )}
                    <p>{tooltipData?.details}</p>
                  </div>
                </div>
              </InfoTooltip>
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

function InfoTooltip({ children }: { children: ReactNode }) {
  return (
    <Popover className="relative">
      <PopoverButton>
        <Image
          width={12}
          height={12}
          src={"/assets/tooltip-info-icon.svg"}
          alt=""
        />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom start"
        className="m-1 w-2xs bg-white p-2 rounded-md shadow-md"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}

type ChartComponentProps = {
  chartHeight: number;
  chartData: ChartData[];
};

function BarChartMobile({ chartHeight, chartData }: ChartComponentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ResponsiveContainer ref={containerRef} width="100%" height={chartHeight}>
      <BarChart
        data={chartData}
        layout="vertical"
        barSize={BAR_SIZE}
        barGap={BAR_GAP}
        margin={{ top: 48, right: 48 }}
      >
        <XAxis type="number" dataKey="value" opacity={0} tickLine={false} />
        <Bar
          dataKey="value"
          barSize={BAR_SIZE}
          height={BAR_SIZE}
          xHeight={BAR_SIZE}
        >
          <LabelList
            dataKey="label"
            content={({ x, y, index }) => (
              <CustomLabel
                x={x}
                y={y}
                height={BAR_SIZE}
                width={containerRef?.current?.clientWidth}
                data={chartData}
                index={index}
              />
            )}
          />
          <LabelList
            fontSize={14}
            dataKey={"value"}
            position="right"
            formatter={toReadableAmount}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function BarChartDesktop({ chartHeight, chartData }: ChartComponentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ResponsiveContainer ref={containerRef} width="100%" height={chartHeight}>
      {/* <pre>{JSON.stringify({ chartHeight }, null, 2)}</pre> */}

      <BarChart
        data={chartData}
        layout="vertical"
        barSize={BAR_SIZE}
        barGap={BAR_GAP_OFFSET}
        margin={{ right: 48 }}
      >
        <YAxis
          width={(containerRef?.current?.clientWidth ?? 768) * (1 / 3)}
          tickLine={false}
          dataKey="label"
          type="category"
          tick={({ y, width, index }) => {
            return (
              <CustomTick y={y} width={width} data={chartData} index={index} />
            );
          }}
        ></YAxis>
        <XAxis type="number" dataKey="value" opacity={0} tickLine={false} />
        <Bar dataKey="value">
          <LabelList
            fontSize={14}
            dataKey={"value"}
            position="right"
            formatter={toReadableAmount}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
