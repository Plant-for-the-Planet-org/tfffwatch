"use client";

import { useEffect, useState, useMemo } from "react";
import Br from "@/components/ui/Br";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useWorldMapStore } from "@/stores/mapStore";
import { CountryForestRecord } from "@/domain/forest-record.types";
import { classify, eligibilityColor } from "@/domain/eligibility";

// Custom tooltip component
function CustomTooltip({
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

export default function CurrentRewardsChart() {
  const { selectedDataset, forestData } = useWorldMapStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if data is available for the selected dataset
    if (forestData[selectedDataset]?.length > 0) {
      setIsLoading(false);
    }
  }, [selectedDataset, forestData]);

  const chartData = useMemo(() => {
    const datasetData = forestData[selectedDataset] || [];

    // Filter for 2024 data only
    const data2024 = datasetData.filter(
      (item: CountryForestRecord) => String(item.year) === "2024"
    );

    if (data2024.length === 0) {
      return { sum: 0, countries: [], legendGroups: [] };
    }

    // Filter only eligible and almost eligible countries
    const eligibleData = data2024.filter((item) => {
      const eligibility = classify(item);
      return eligibility === "ELIGIBLE" || eligibility === "ALMOST_ELIGIBLE";
    });

    // Group by eligibility
    const eligible = eligibleData.filter(
      (item) => classify(item) === "ELIGIBLE"
    );
    const almostEligible = eligibleData.filter(
      (item) => classify(item) === "ALMOST_ELIGIBLE"
    );

    // Sort each group by reward amount (descending) and take top 20
    const sortedEligible = [...eligible]
      .sort(
        (a, b) => b.reward_after_deductions_usd - a.reward_after_deductions_usd
      )
      .slice(0, 20);
    const sortedAlmostEligible = [...almostEligible]
      .sort(
        (a, b) => b.reward_after_deductions_usd - a.reward_after_deductions_usd
      )
      .slice(0, 20);

    // Create country entries for the chart
    const countries: Array<{
      name: string;
      iso2: string;
      value: number;
      color: string;
      eligibility: string;
    }> = [];

    // Add eligible countries
    sortedEligible.forEach((item) => {
      countries.push({
        name: item.country,
        iso2: item["country-iso2"],
        value: item.reward_after_deductions_usd,
        color: eligibilityColor("ELIGIBLE"),
        eligibility: "Eligible",
      });
    });

    // Add almost eligible countries
    sortedAlmostEligible.forEach((item) => {
      countries.push({
        name: item.country,
        iso2: item["country-iso2"],
        value: item.reward_after_deductions_usd,
        color: eligibilityColor("ALMOST_ELIGIBLE"),
        eligibility: "Almost Eligible",
      });
    });

    // Sort all countries together by value (descending)
    countries.sort((a, b) => b.value - a.value);

    // Calculate totals for legend
    const eligibleSum = eligible.reduce(
      (acc, item) => acc + item.reward_after_deductions_usd,
      0
    );
    const almostEligibleSum = almostEligible.reduce(
      (acc, item) => acc + item.reward_after_deductions_usd,
      0
    );

    const totalSum = eligibleSum + almostEligibleSum;

    const legendGroups = [];
    if (eligibleSum > 0) {
      legendGroups.push({
        name: "Eligible",
        color: eligibilityColor("ELIGIBLE"),
        count: eligible.length,
      });
    }
    if (almostEligibleSum > 0) {
      legendGroups.push({
        name: "Almost Eligible",
        color: eligibilityColor("ALMOST_ELIGIBLE"),
        count: almostEligible.length,
      });
    }

    return { sum: totalSum, countries, legendGroups };
  }, [selectedDataset, forestData]);

  if (isLoading) {
    return (
      <div className="bg-background border border-primary-light rounding-lg outer-padding-3">
        <div className="max-w-3xs mx-auto">
          <h2 className="typo-h2 font-bold text-center">Current Rewards</h2>
          <p className="text-sm text-center text-foreground">
            if TFFF was already operational, based on 2024 data for fully and
            almost eligible countries
          </p>
        </div>
        <Br />
        <div className="flex items-center justify-center h-64">
          <p className="text-foreground"></p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-primary-light rounding-lg outer-padding-3">
      <div className="max-w-3xs mx-auto">
        <h2 className="typo-h2 font-bold text-center">Current Rewards</h2>
        <p className="text-sm text-center text-foreground">
          if TFFF was already operational, based on 2024 data for fully and
          almost eligible countries
        </p>
      </div>
      <Br />
      <Br />
      <div className="relative w-full aspect-square max-w-[300px] md:max-w-2/3 mx-auto outlines-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData.countries}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.countries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-2xl sm:text-3xl font-bold">
            ${(chartData.sum / 1000000000).toFixed(1)}bn
          </span>
        </div>
      </div>
      <Br />
    </div>
  );
}
