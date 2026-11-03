// Shared types for map components
import { CountryForestRecord } from "@/domain/forest-record.types";
import { Country } from "@/domain/country.types";

// Dataset types — canonical definition in src/domain; re-exported here for existing importers.
import type { DatasetType } from "@/domain/dataset";
export type { DatasetType };

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
  selectedCountry: Country | null;
  selectedYear: string;
  selectedDataset: DatasetType;
  clickPosition: { x: number; y: number } | null;
  forestData: {
    GFW: CountryForestRecord[];
    JRC: CountryForestRecord[];
    MMU: CountryForestRecord[];
  };
  isLoading: boolean;
}

// Country Map State
export interface CountryMapState {
  country: Country;
  year: string;
  dataset: DatasetType;
  layerData: {
    GFW: LayerData | null;
    JRC: LayerData | null;
  };
  tfffData: {
    GFW: CountryForestRecord | null;
    JRC: CountryForestRecord | null;
  };
  isLoading: boolean;
}

// Component prop interfaces

// WorldMap component props
export interface WorldMapProps {
  onCountryClick?: (country: Country) => void;
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
  country: Country;
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
  country: Country;
  data: CountryForestRecord;
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
