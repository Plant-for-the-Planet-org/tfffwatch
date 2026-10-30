import { DatasetType } from "@/components/maps/shared/types";

export function getJRCColorKey(eligibility: string): string {
  // console.log({ eligibility });
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

export function getGFWColorKey(eligibility: string): string {
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

export function getEndorsementColorKey(hasEndorsed: boolean): string {
  return hasEndorsed ? "#6FCF97" : "#FFFFFF";
}

// export function getGFWColorKey(changeValue: number): string {
//   // Different color scheme for GFW data
//   switch (true) {
//     case changeValue === undefined || isNaN(changeValue):
//       return "#E1EBE5";
//     case changeValue > 0 && changeValue < 0.15:
//       return "#FFF8F0";
//     case changeValue > 0.15 && changeValue < 0.3:
//       return "#FFE4B5";
//     case changeValue > 0.3 && changeValue < 0.45:
//       return "#FFD07B";
//     case changeValue > 0.45 && changeValue < 0.6:
//       return "#FFBC42";
//     case changeValue > 0.6 && changeValue < 0.75:
//       return "#FF9500";
//     case changeValue > 0.75 && changeValue < 0.9:
//       return "#E67E22";
//     case changeValue > 0.9 && changeValue < 1.05:
//       return "#D35400";
//     case changeValue > 1.05 && changeValue < 1.2:
//       return "#C0392B";
//     case changeValue > 1.2 && changeValue < 1.35:
//       return "#A93226";
//     case changeValue > 1.35:
//       return "#922B21";
//     default:
//       return "#E1EBE5";
//   }
// }

export function getColorKeyForDataset(
  dataset: DatasetType,
  changeValue: number,
  eligibility?: string,
): string {
  // All three datasets use the same eligibility-based coloring
  return dataset === "JRC" || dataset === "GFW_20P" || dataset === "GFW_30P"
    ? getJRCColorKey(eligibility || "")
    : getJRCColorKey(eligibility || "");
}

export function updateFeaturesWithColorKeys(
  features: Array<{
    properties: { iso_a2: string; [key: string]: unknown };
    [key: string]: unknown;
  }>,
  transformedData: Record<
    string,
    { countrySlug: string; forestChange: number; eligibility?: string }
  >,
  dataset: DatasetType,
) {
  return features.map((country) => {
    const countyISO2 = country.properties.iso_a2;
    const countySlug = transformedData[countyISO2]?.countrySlug ?? "";
    const gfwForestChangeValue = transformedData[countyISO2]?.forestChange ?? 0;
    // const jrcEligibility = transformedData[countyISO2]?.eligibility;
    const eligibility = transformedData[countyISO2]?.eligibility;

    const JRCColorKey = getJRCColorKey(eligibility || "NA");
    // const GFWColorKey = getGFWColorKey(gfwForestChangeValue);
    const GFWColorKey = getJRCColorKey(eligibility || "NA");
    const colorKey = getColorKeyForDataset(
      dataset,
      gfwForestChangeValue,
      eligibility,
    );

    return {
      ...country,
      properties: {
        ...country.properties,
        colorKey,
        JRCColorKey,
        GFWColorKey,
        countrySlug: countySlug,
      },
    };
  });
}
