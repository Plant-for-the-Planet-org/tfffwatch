// Shared types for map components

// Dataset types
export type DatasetType = "JRC" | "GFW_20P" | "GFW_30P";

// Country data interface
export interface CountryData {
  iso2: string;
  iso3: string;
  name: string;
  slug: string;
  flagImgUrl: string;
}

// Base TFFF data interface
export interface TFFFData {
  year: string;
  country: string;
  "country-iso2": string;
  "country-slug": string;
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

// GFW-specific TFFF data
export interface GFWTFFFData extends TFFFData {
  tree_cover_loss_ha: number;
  tree_cover_gain_ha: number;
  primary_forest_loss_ha: number;
}

// JRC-specific TFFF data
export interface JRCTFFFData extends TFFFData {
  forest_disturbance_ha: number;
  forest_regrowth_ha: number;
  land_cover_change_ha: number;
}

// Map viewport interface
export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

// Layer configuration for satellite data
export interface LayerConfig {
  name: string;
  tileUrl: string;
  visParams: {
    palette: string;
  };
}

// Layer data from API
export interface LayerData {
  id: string;
  country: string;
  analysisYear: number;
  // GFW layers
  currentForestLayer: LayerConfig;
  lossInYearLayer: LayerConfig;
  fireLossLayer: LayerConfig;
  // JRC layers
  totalTropicalForestLayer: LayerConfig;
  tropicalDeforestationLayer: LayerConfig;
  tropicalDegradationLayer: LayerConfig;
  subtropicalForestLayer: LayerConfig;
  subtropicalDeforestationLayer: LayerConfig;
  subtropicalDegradationLayer: LayerConfig;
  createdAt: string;
  updatedAt: string;
}

// World Map State
export interface WorldMapState {
  selectedCountry: CountryData | null;
  selectedYear: string;
  selectedDataset: DatasetType;
  clickPosition: { x: number; y: number } | null;
  forestData: {
    JRC: TFFFData[];
    GFW_20P: TFFFData[];
    GFW_30P: TFFFData[];
  };
  isLoading: boolean;
}

// Country Map State
export interface CountryMapState {
  country: CountryData;
  year: string;
  dataset: DatasetType;
  layerData: {
    JRC: LayerData | null;
    GFW_20P: LayerData | null;
    GFW_30P: LayerData | null;
  };
  tfffData: {
    JRC: TFFFData | null;
    GFW_20P: TFFFData | null;
    GFW_30P: TFFFData | null;
  };
  isLoading: boolean;
}

// Component prop interfaces

// WorldMap component props
export interface WorldMapProps {
  onCountryClick?: (country: CountryData) => void;
  selectedYear?: string;
  defaultSelectedCountry?: string;
  dataset?: DatasetType;
  containerClassName?: string;
  mapClassName?: string;
  size?: "small" | "medium" | "large";
  variant?: "hero" | "embedded";
}

// CountryMap component props
export interface CountryMapProps {
  country: CountryData;
  year: string;
  dataset?: DatasetType;
  showLayers?: boolean;
  containerClassName?: string;
  mapClassName?: string;
  height?: string | number;
  variant?: "hero" | "embedded";
}

// TFFFCard component props
export interface TFFFCardProps {
  country: CountryData;
  data: TFFFData;
  dataset?: DatasetType;
  variant?: "popup" | "standalone";
  showCTA?: boolean;
  onNavigate?: (country: string, year: string) => void;
  cardClassName?: string;
  contentClassName?: string;
  size?: "compact" | "default" | "expanded";
}

// MapContainer component props
export interface MapContainerProps {
  children: React.ReactNode;
  variant: "world" | "country";
  wrapperClassName?: string;
  backgroundClassName?: string;
  height?: string | number;
  padding?: "none" | "small" | "medium" | "large";
}

// DatasetTabs component props (now URL-driven)
export interface DatasetTabsProps {
  tabsClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  disabled?: boolean;
  defaultDataset?: DatasetType;
}

// Map click event interface
export interface MapCountryClickEvent {
  features: Array<Record<string, unknown>>;
  point: { x: number; y: number };
  lngLat: { lng: number; lat: number };
  country: string;
}
