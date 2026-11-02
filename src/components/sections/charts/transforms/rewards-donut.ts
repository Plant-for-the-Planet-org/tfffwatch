import type { CountryForestRecord } from "@/domain/forest-record.types";
import { classify, eligibilityColor, type Eligibility } from "@/domain/eligibility";

// The two reward donuts (Maximum / Current) differ only by which reward field
// they sum and whether ineligible countries are included. Logic preserved
// verbatim from the former inline useMemo blocks.
export type RewardField = "base_reward_usd" | "reward_after_deductions_usd";

export interface DonutDatum {
  name: string;
  iso2: string;
  value: number;
  color: string;
  eligibility: string;
}
export interface LegendGroup {
  name: string;
  color: string;
  count: number;
}
export interface RewardsDonut {
  sum: number;
  countries: DonutDatum[];
  legendGroups: LegendGroup[];
}

const LABEL: Record<Eligibility, string> = {
  ELIGIBLE: "Eligible",
  ALMOST_ELIGIBLE: "Almost Eligible",
  INELIGIBLE: "Ineligible",
};

export function buildRewardsDonut(
  records: CountryForestRecord[],
  opts: { rewardField: RewardField; includeIneligible: boolean }
): RewardsDonut {
  const { rewardField, includeIneligible } = opts;

  // Filter for 2024 data only
  const data2024 = records.filter((item) => String(item.year) === "2024");
  if (data2024.length === 0) return { sum: 0, countries: [], legendGroups: [] };

  const order: Eligibility[] = includeIneligible
    ? ["ELIGIBLE", "ALMOST_ELIGIBLE", "INELIGIBLE"]
    : ["ELIGIBLE", "ALMOST_ELIGIBLE"];

  const countries: DonutDatum[] = [];
  const legendGroups: LegendGroup[] = [];
  let sum = 0;

  for (const group of order) {
    const inGroup = data2024.filter((item) => classify(item) === group);

    // Sort by reward (descending), take top 20, push to chart entries
    [...inGroup]
      .sort((a, b) => b[rewardField] - a[rewardField])
      .slice(0, 20)
      .forEach((item) => {
        countries.push({
          name: item.country,
          iso2: item["country-iso2"],
          value: item[rewardField],
          color: eligibilityColor(group),
          eligibility: LABEL[group],
        });
      });

    const groupSum = inGroup.reduce((acc, item) => acc + item[rewardField], 0);
    sum += groupSum;
    if (groupSum > 0) {
      legendGroups.push({
        name: LABEL[group],
        color: eligibilityColor(group),
        count: inGroup.length,
      });
    }
  }

  // Sort all countries together by value (descending)
  countries.sort((a, b) => b.value - a.value);

  return { sum, countries, legendGroups };
}
