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

// Latest year of data. The site opens on this year everywhere (map, donuts,
// captions, country year picker, sitemap). Bump it when a new year lands.
export const DATASET_LATEST_YEAR = 2025;
