"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Map, Layer, Source } from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import { transformEndorsementData } from "@/domain/country";
import { endorsementColor } from "@/domain/eligibility";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import countries from "../countries-optimized.geo.json";
import { useMapEngine } from "../base/useMapEngine";
import { urls } from "@/lib/http";
import Br from "@/components/ui/Br";

// Types
interface CountryProperties {
  iso_a2: string;
  name_long: string;
  name: string;
  hasEndorsed: boolean;
  hasInvested: boolean;
  countrySlug: string;
  colorKey: string;
}

interface EndorsementMapProps {
  onCountryClick?: (country: {
    iso2: string;
    slug: string;
    name: string;
  }) => void;
}

export default function EndorsementMap({
  onCountryClick,
}: EndorsementMapProps) {
  const { mapRef, viewState, onMove, onLoad } = useMapEngine();
  const [endorsementData, setEndorsementData] = useState<{
    [key: string]: {
      countrySlug: string;
      hasEndorsed: boolean;
      hasInvested: boolean;
    };
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Fetch endorsement data
  useEffect(() => {
    const fetchEndorsementData = async () => {
      try {
        const response = await fetch(urls.endorsementCountries);
        if (!response.ok) {
          throw new Error("Failed to fetch endorsement data");
        }
        const data = await response.json();
        setEndorsementData(transformEndorsementData(data));
      } catch (err) {
        console.error("Error fetching endorsement data:", err);
        setError("Failed to load endorsement data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEndorsementData();
  }, []);

  // Process countries data with endorsement information
  const processedCountries = useMemo(() => {
    const countriesData = countries as unknown as {
      features: Array<{
        properties: { iso_a2: string; [key: string]: unknown };
        [key: string]: unknown;
      }>;
    };

    if (!countriesData.features) {
      return { type: "FeatureCollection", features: [] };
    }

    const features = countriesData.features.map((feature) => {
      const iso2 = feature.properties?.iso_a2;
      const countryData = iso2 ? endorsementData[iso2] : null;
      const hasEndorsed = countryData?.hasEndorsed || false;
      const hasInvested = countryData?.hasInvested || false;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          hasEndorsed,
          hasInvested,
          countrySlug: countryData?.countrySlug || "",
          colorKey: endorsementColor(hasEndorsed),
        },
      };
    });

    return {
      type: "FeatureCollection",
      features,
    };
  }, [endorsementData]);

  // Handle country click
  const onClick = useCallback(
    (event: maplibregl.MapLayerMouseEvent) => {
      const map = mapRef.current?.getMap();
      const features = map?.queryRenderedFeatures(event.point, {
        layers: ["countries-fill"],
      });

      // If clicked outside of any country, clear selection
      if (!features || features.length === 0) {
        return;
      }

      const feature = features[0];
      const properties = feature.properties as CountryProperties;

      if (onCountryClick && properties?.iso_a2) {
        const countryName = properties.name_long || properties.name || "";
        onCountryClick({
          iso2: properties.iso_a2,
          slug:
            properties.countrySlug ||
            countryName.toLowerCase().replace(/\s+/g, "-"),
          name: countryName,
        });
      }
    },
    [onCountryClick],
  );

  // Handle mouse move for hover effect
  const onMouseMove = useCallback((event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ["countries-fill"],
    });

    if (features && features.length > 0) {
      const iso2 = features[0].properties?.iso_a2;
      setHoveredCountry(iso2 || null);
      if (map) {
        map.getCanvas().style.cursor = "pointer";
      }
    } else {
      setHoveredCountry(null);
      if (map) {
        map.getCanvas().style.cursor = "default";
      }
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoveredCountry(null);
    const map = mapRef.current?.getMap();
    if (map) {
      map.getCanvas().style.cursor = "default";
    }
  }, []);

  return (
    <div className="relative mx-auto w-full h-full max-w-full max-h-full object-contain">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="animate-spin text-primary lucide lucide-loader-icon lucide-loader"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 bg-opacity-90 z-50 rounded-lg">
          <div className="text-red-600 text-center p-4">{error}</div>
        </div>
      )}

      <Br />
      <Br />
      <div className="relative z-10">
        <div className="bg-primary-light">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-sm md:text-xl lg:text-2xl">
              Countries that signed the TFFF Declaration
            </h2>
            {/* <p className="text-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl typo-p">
              if TFFF were fully funded; based on 2024 forest change data
            </p> */}
          </div>
        </div>
        <div className="bg-gradient-to-b from-primary-light to-transparent">
          <Br />
          <Br />
        </div>
      </div>

      <div className="aspect-[2] w-full -z-10">
        <Map
          ref={mapRef}
          {...viewState}
          cursor="default"
          keyboard={false}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          touchPitch={false}
          touchZoomRotate={false}
          doubleClickZoom={false}
          interactive={true}
          attributionControl={false}
          renderWorldCopies={false}
          onMove={onMove}
          onClick={onClick}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onLoad={onLoad}
        >
          <Source
            id="countries"
            type="geojson"
            data={
              processedCountries as unknown as GeoJSON<
                Geometry,
                GeoJsonProperties
              >
            }
          >
            <Layer
              id="countries-fill"
              type="fill"
              paint={{
                "fill-color": ["get", "colorKey"],
                "fill-opacity": [
                  "case",
                  ["==", ["get", "iso_a2"], hoveredCountry || ""],
                  1,
                  1,
                ],
              }}
            />
            <Layer
              id="countries-outline"
              type="line"
              paint={{
                "line-color": "#F0FAF4",
                "line-width": 1.5,
              }}
            />
          </Source>
        </Map>
      </div>

      {/* Legend */}
      {/* <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-md text-sm z-10">
        <div className="font-medium mb-2">Endorsement Status</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-sm mr-2"
              style={{ backgroundColor: endorsementColor(true) }}
            />
            <span>Has Endorsed</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-sm mr-2"
              style={{ backgroundColor: endorsementColor(false) }}
            />
            <span>Not Endorsed</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
