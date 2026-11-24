"use client";

import { useMemo } from "react";
import { EligibilityLegend } from "@/components/maps/MapLegends";
import { Spacer } from "@/components/ui/layout";
import { eligibilityColor } from "@/domain/eligibility";
import { toShortUsd } from "@/lib/format";
import { useWorldMapStore } from "@/stores/map.store";
import { REWARDS_YEAR } from "./transforms/rewards-donut";
import { buildTop10Payouts } from "./transforms/top10-payouts";

// Top 10 countries by potential TFFF payout, drawn from the forest data the
// page already loaded (same source as the reward donuts).
//
// Each row has two bars that share one scale. Left: payout at current
// deforestation rates, coloured by eligibility (no bar if ineligible).
// Right: payout if the country stopped deforestation entirely.
export function Top10CountriesChart() {
  const { selectedDataset, forestData } = useWorldMapStore();

  const { rows, scaleMax } = useMemo(
    () => buildTop10Payouts(forestData[selectedDataset] || []),
    [selectedDataset, forestData]
  );

  return (
    // No card: blends into the light green section, like the map above.
    <div className="mt-4 px-2 md:px-4 pb-4">
      <h2 className="typo-h2 font-bold text-center">
        Top 10 countries by potential TFFF payout
      </h2>
      <Spacer />

      {rows.length === 0 ? (
        // Same footprint as the loaded chart, so the page does not jump.
        <div className="h-96" />
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 text-sm md:text-base text-center md:text-left">
            <p className="md:text-right md:pr-4">
              Annual payout based on <b>current</b> deforestation rates (
              {REWARDS_YEAR})
            </p>
            <p className="md:pl-4">
              Annual payout if the country <b>stopped deforestation</b> entirely
            </p>
          </div>
          <Spacer />

          <ol className="space-y-2">
            {rows.map((row) => (
              <li key={row.iso2} className="grid grid-cols-2 items-center">
                {/* Left: current payout. Bar grows from the centre line. */}
                <div className="flex items-center justify-end gap-2 pr-0 border-r border-base-text/40">
                  <span className="text-xs md:text-base text-base-text/70 whitespace-nowrap">
                    {toShortUsd(row.current)}
                  </span>
                  <div
                    className="h-7 md:h-9 rounded-l-[5px] md:rounded-l-[8px]"
                    style={{
                      width: `${(row.current / scaleMax) * 100}%`,
                      backgroundColor: eligibilityColor(row.eligibility),
                    }}
                  />
                </div>

                {/* Right: maximum payout, with the country name inside. */}
                <div className="flex items-center gap-2">
                  <div
                    className="h-7 md:h-9 rounded-r-[5px] md:rounded-r-[8px] bg-base-text text-white flex items-center px-2 md:px-3 overflow-hidden"
                    style={{
                      width: `${(row.max / scaleMax) * 100}%`,
                      minWidth: "fit-content",
                    }}
                  >
                    <span className="text-[10px] md:text-sm font-semibold whitespace-nowrap">
                      {row.name}
                    </span>
                  </div>
                  <span className="text-xs md:text-base text-base-text/70 whitespace-nowrap">
                    {toShortUsd(row.max)}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <Spacer />
          <EligibilityLegend statuses={["ALMOST_ELIGIBLE", "ELIGIBLE"]} />
        </div>
      )}
    </div>
  );
}
