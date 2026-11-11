// The forest-data source. Canonical home for the dataset discriminator.
// Only one mode is live: MMU (JRC+GFW with MMU), served by API source "MMU".
export type DatasetType = "MMU";

export const DEFAULT_DATASET: DatasetType = "MMU";

export const DATASET_LABEL = {
  short: "MMU",
  full: "JRC+GFW with MMU",
} as const;

// MMU data starts at 2021.
export const DATASET_MIN_YEAR = 2021;

// Earliest year in the country page year picker. Charts still start at
// DATASET_MIN_YEAR; only the picker stops here.
export const YEAR_SELECT_MIN_YEAR = 2022;

// Latest year of data. The site opens on this year everywhere (map, donuts,
// captions, country year picker, sitemap). Bump it when a new year lands.
export const DATASET_LATEST_YEAR = 2025;

// Country pages always carry the dataset in the URL, e.g. /brazil/2025?dataset=MMU.
// Build every link to a country page with this so the param is never missing.
export function countryPagePath(
  slug: string,
  year: string | number,
  dataset: DatasetType = DEFAULT_DATASET
): string {
  return `/${slug}/${year}?dataset=${dataset}`;
}
