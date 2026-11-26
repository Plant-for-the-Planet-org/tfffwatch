import type { CountryForestRecord } from "@/domain/forest-record.types";
import { classify, type Eligibility } from "@/domain/eligibility";
import { REWARDS_YEAR } from "./rewards-donut";

export interface Top10Row {
  iso2: string;
  name: string;
  // Payout at current deforestation rates. 0 for ineligible countries.
  current: number;
  // Payout if the country stopped deforestation entirely.
  max: number;
  eligibility: Eligibility;
}

export interface Top10Payouts {
  rows: Top10Row[];
  // Both bar sides share this scale (the largest max payout).
  scaleMax: number;
}

// Long names that do not fit inside a bar.
const SHORT_NAMES: Record<string, string> = {
  CD: "DR Congo",
  CG: "Rep. of Congo",
  PG: "Papua N. G.",
};

// Top 10 countries by potential payout (base reward), for the rewards year.
// Left side: reward after deductions, shown only for countries that can be
// paid today. Right side: the base reward.
export function buildTop10Payouts(
  records: CountryForestRecord[]
): Top10Payouts {
  const rows = records
    .filter((item) => String(item.year) === REWARDS_YEAR)
    .sort((a, b) => b.base_reward_usd - a.base_reward_usd)
    .slice(0, 10)
    .map((item): Top10Row => {
      const eligibility = classify(item);
      return {
        iso2: item["country-iso2"],
        name: SHORT_NAMES[item["country-iso2"]] ?? item.country,
        current:
          eligibility === "INELIGIBLE"
            ? 0
            : Math.max(0, item.reward_after_deductions_usd),
        max: item.base_reward_usd,
        eligibility,
      };
    });

  return { rows, scaleMax: Math.max(0, ...rows.map((r) => r.max)) };
}
