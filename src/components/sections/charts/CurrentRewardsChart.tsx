"use client";

import { useEffect, useState, useMemo } from "react";
import { Spacer } from "@/components/ui/layout";
import { useWorldMapStore } from "@/stores/map.store";
import { buildRewardsDonut } from "./transforms/rewards-donut";
import { DonutChart } from "./primitives/DonutChart";

export default function CurrentRewardsChart() {
  const { selectedDataset, forestData } = useWorldMapStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if data is available for the selected dataset
    if (forestData[selectedDataset]?.length > 0) {
      setIsLoading(false);
    }
  }, [selectedDataset, forestData]);

  const chartData = useMemo(
    () =>
      buildRewardsDonut(forestData[selectedDataset] || [], {
        rewardField: "reward_after_deductions_usd",
        includeIneligible: false,
      }),
    [selectedDataset, forestData]
  );

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
        <Spacer />
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
      <Spacer />
      <Spacer />
      <DonutChart
        data={chartData.countries}
        centerLabel={`$${(chartData.sum / 1000000000).toFixed(1)}bn`}
      />
      <Spacer />
    </div>
  );
}
