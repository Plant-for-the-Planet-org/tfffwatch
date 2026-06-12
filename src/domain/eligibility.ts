import type { CountryForestRecord } from "./forest-record.types";

// The TFFF eligibility verdict for a country.
export type Eligibility = "ELIGIBLE" | "ALMOST_ELIGIBLE" | "INELIGIBLE";

// Derive eligibility from the two underlying criteria flags.
// Logic preserved verbatim from the former inline copies
// (country-helper.ts and the two reward charts).
export function classify(
  r: Pick<
    CountryForestRecord,
    | "eligibility_deforestation_rate_below_half_percent"
    | "eligibility_decreasing_trend_of_deforestation"
  >
): Eligibility {
  if (r.eligibility_deforestation_rate_below_half_percent === true) {
    if (r.eligibility_decreasing_trend_of_deforestation === false) {
      return "ALMOST_ELIGIBLE";
    } else {
      return "ELIGIBLE";
    }
  }
  return "INELIGIBLE";
}

// Map an eligibility verdict to its map/legend fill color.
// Hex values preserved verbatim from the former getJRCColorKey/getGFWColorKey.
// Accepts unknown strings (e.g. "NA"/"") which fall through to white.
export function eligibilityColor(eligibility: Eligibility | string): string {
  switch (eligibility) {
    case "INELIGIBLE":
      return "#C4C4C4";
    case "ALMOST_ELIGIBLE":
      return "#8FBDF1";
    case "ELIGIBLE":
      return "#6FCF97";
    default:
      return "#FFFFFF";
  }
}

// Endorsement fill color (separate concept; preserved from getEndorsementColorKey).
export function endorsementColor(hasEndorsed: boolean): string {
  return hasEndorsed ? "#6FCF97" : "#FFFFFF";
}
