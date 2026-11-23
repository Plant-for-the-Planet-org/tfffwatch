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

// One MMU raster layer from the Layers TFFF API. Tiles come pre-coloured
// from the Layers tiler; palette is kept for legends.
export interface MmuLayer {
  tileUrl: string;
  palette: string[];
}

// Shape returned by our /api/layers proxy. A slot is null when that layer
// is not generated or not published yet.
export interface LayerData {
  forest: MmuLayer | null; // remaining forest (tfff_forest)
  deforestation: MmuLayer | null; // forest loss, not fire (tfff_deforestation)
  degradation: MmuLayer | null; // fire loss (tfff_degradation)
}

// World Map State
export interface WorldMapState {
  selectedCountry: Country | null;
  selectedYear: string;
  selectedDataset: DatasetType;
  clickPosition: { x: number; y: number } | null;
  forestData: {
    MMU: CountryForestRecord[];
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


// Map click event interface
export interface MapCountryClickEvent {
  features: Array<Record<string, unknown>>;
  point: { x: number; y: number };
  lngLat: { lng: number; lat: number };
  country: string;
}
