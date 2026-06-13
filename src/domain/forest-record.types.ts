// Canonical forest-data record for one country, one year, one dataset.
// Single source of truth replacing the former duplicate shapes
// `TFFFData` (maps/shared/types.ts) and `ForestCoverChange` (utils/types.ts).
import type { Iso2, CountrySlug, Year } from "./brand";

export interface CountryForestRecord {
  year: Year;
  country: string;
  "country-iso2": Iso2;
  "country-slug": CountrySlug;
  eligibility_combined: boolean;
  intact_forest_ha: number;
  base_reward_usd: number;
  deforested_ha: number;
  deforestation_deduction_usd: number;
  degraded_forest_ha: number;
  degradation_deduction_usd: number;
  reward_after_deductions_usd: number;
  iplc_reward_usd: number;
  percentage_deforested: number;
  percentage_degraded: number;
  passes_criteria: boolean;
  eligibility_deforestation_rate_below_half_percent: boolean;
  eligibility_decreasing_trend_of_deforestation: boolean;
}
