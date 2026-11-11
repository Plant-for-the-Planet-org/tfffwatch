"use client";

import { useWorldMapStore } from "@/stores/map.store";
import {
  getCountrySlugByIso2,
  transformAllForestCoverChangeData,
} from "@/domain/country";
import { downloadGeoJsonAsSvg } from "@/utils/download-map";
import { env } from "@/utils/env";
import { eligibilityColor } from "@/domain/eligibility";
import { NaturalEarthCountryFeatureCollection } from "@/utils/types";
import {
  Layer,
  Map,
  // NavigationControl,
  Source,
} from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import countries from "../countries-optimized.geo.json";
import { WorldMapProps } from "../shared/types";
import WorldMapCard from "./WorldMapCard";
import { ClickTooltip } from "../base/ClickTooltip";
import { useMapEngine } from "../base/useMapEngine";

const NO_DATA_FILL = "#E1EBE5";

export default function WorldMap({ onCountryClick }: WorldMapProps = {}) {
  const {
    selectedDataset,
    selectedYear,
    forestData,
    setSelectedCountry,
    setClickPosition,
  } = useWorldMapStore();

  const { mapRef, viewState, onMove, onLoad } = useMapEngine();

  const allCountries = useMemo(() => {
    const countriesData = countries as unknown as {
      features: Array<{
        properties: { iso_a2: string; [key: string]: unknown };
        [key: string]: unknown;
      }>;
    };

    // Year-filtered MMU records, keyed by ISO2 with eligibility.
    const mmuData = (forestData.MMU || []).filter(
      (item) => item.year == selectedYear
    );
    const transformed = transformAllForestCoverChangeData(mmuData);

    const featuresWithColors = countriesData.features.map((country) => {
      const iso2 = country.properties.iso_a2 as string;
      const eligibility = transformed[iso2]?.eligibility;
      return {
        ...country,
        properties: {
          ...country.properties,
          // No-data countries get a light grey-green fill so the white
          // borders stay visible between them.
          colorKey: eligibility ? eligibilityColor(eligibility) : NO_DATA_FILL,
          countrySlug: "",
        },
      };
    });

    return {
      ...countries,
      features: featuresWithColors,
    };
  }, [selectedYear, forestData]);

  const onClick = (event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ["country-fill"],
    });
    const { point } = event;
    const country = features?.[0]?.properties?.name_long;
    const countrySlug = features?.[0]?.properties?.countrySlug;
    const countryISO2 = features?.[0]?.properties?.["iso_a2"];

    // If clicked outside of any country, clear selection
    if (!features || features.length === 0 || !country || !countryISO2) {
      setSelectedCountry(null);
      setClickPosition(null);
      return;
    }

    const countryData = {
      iso2: countryISO2,
      iso3: "", // We don't have ISO3 in the current data
      name: country,
      slug: countrySlug || getCountrySlugByIso2(countryISO2) || "",
      flagImgUrl: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryISO2}.svg`,
    };

    setSelectedCountry(countryData);
    setClickPosition({ x: point.x, y: point.y });

    // Call external callback if provided
    if (onCountryClick) {
      onCountryClick(countryData);
    }
  };

  // Always render the map - no loading state needed
  return (
    <>
      <div className="relative mx-auto aspect-[2] w-full h-full max-w-full max-h-full md:w-3/4 md:h-3/4 object-contain">
        <div className="md:hidden absolute z-40 bottom-0 left-0">
          <ClickTooltip />
        </div>
        <div className="aspect-[1.75] w-full -translate-y-12 -z-10">
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
            onLoad={onLoad}
          >
            <Source
              id="country"
              type="geojson"
              data={
                allCountries as unknown as GeoJSON<Geometry, GeoJsonProperties>
              }
            >
              <Layer
                id="country-fill"
                type="fill"
                paint={{ "fill-color": ["get", "colorKey"] }}
              />
              <Layer
                id="country-line"
                type="line"
                paint={{
                  // Thin white border around every country.
                  "line-color": "#FFFFFF",
                  "line-width": 1,
                }}
              />
            </Source>

          </Map>
        </div>
        <WorldMapCard />
      </div>

      <div className="absolute md:mt-auto right-0 bottom-0 text-xs flex items-end-safe">
        <div className="mr-2 text-right pb-0.5">
          <VersionChip />
          <div>
            Please cite data as{" "}
            <Link className="text-primary italic" href="">
              tfffwatch.org
            </Link>{" "}
            <span className="italic"> by Plant-for-the-Planet</span>
          </div>
        </div>

        <button
          className="bg-white p-2 rounded-lg cursor-pointer"
          onClick={() => {
            downloadGeoJsonAsSvg(
              allCountries as unknown as NaturalEarthCountryFeatureCollection,
              {
                width: 800,
                height: 800,
                filename: `tfff-world-map-${selectedDataset}-${selectedYear}.svg`,
                backgroundColor: "#F0FAF4",
                strokeWidth: 1,
              }
            );
          }}
        >
          <Image
            width={24}
            height={24}
            src="/assets/download-map.svg"
            alt="Download map"
          />
        </button>
      </div>
    </>
  );
}

function VersionChip() {
  const mapVersion = env.mapVersion;
  return <div className="z-20 text-xs">{mapVersion}</div>;
}
