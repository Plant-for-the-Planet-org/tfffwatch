// The forest-data source. Canonical home for the dataset discriminator.
// Only one mode is live: MMU (JRC+GFW with MMU), served by API source "MMU".
export type DatasetType = "MMU";

export const DEFAULT_DATASET: DatasetType = "MMU";

export const DATASET_LABEL = {
  short: "MMU",
  full: "JRC+GFW with MMU",
} as const;

// First year shown on the site: country year picker and all year charts.
// The API has data from 2020, but only 2022 onwards is shown.
export const DATASET_MIN_YEAR = 2022;

// Latest year of data. The site opens on this year everywhere (map, donuts,
// captions, country year picker, sitemap). Bump it when a new year lands.
export const DATASET_LATEST_YEAR = 2025;

// Country page path. The default dataset (MMU) is not mentioned in the URL,
// e.g. /brazil/2025. Any other dataset would be added as ?dataset=<name>.
// Build every link to a country page with this.
export function countryPagePath(
  slug: string,
  year: string | number,
  dataset: DatasetType = DEFAULT_DATASET
): string {
  const path = `/${slug}/${year}`;
  return dataset === DEFAULT_DATASET ? path : `${path}?dataset=${dataset}`;
}
