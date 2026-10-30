"use client";

import { useWorldMapStore } from "@/stores/mapStore";
import { transformAllForestCoverChangeData } from "@/utils/country-helper";
import { downloadGeoJsonAsSvg } from "@/utils/download-map";
import { env } from "@/utils/env";
import { getGFWColorKey } from "@/utils/map-colors";
import { useWorldMap } from "@/utils/store";
import { NaturalEarthCountryFeatureCollection } from "@/utils/types";
import * as turf from "@turf/turf";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Layer,
  Map,
  MapRef,
  // NavigationControl,
  Source,
  ViewStateChangeEvent,
} from "@vis.gl/react-maplibre";
import type { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import countries from "../countries-optimized.geo.json";
import { WorldMapProps } from "../shared/types";
import WorldMapCard from "./WorldMapCard";
import { ClickTooltip } from "@/components/sections/hero/TFFFMapView";

export const GEOFENCE = turf.polygon([
  [
    [-180, 64],
    [180, 64],
    [180, -48],
    [-180, -48],
    [-180, 64],
  ],
]);

export default function WorldMap({ onCountryClick }: WorldMapProps = {}) {
  const { width } = useWindowSize();
  const { setPoint, setCountry, setCountrySlug, setCountryISO2, setIsTFFF } =
    useWorldMap();

  // New store integration
  const {
    selectedDataset,
    selectedYear,
    forestData,
    setSelectedCountry,
    setClickPosition,
  } = useWorldMapStore();

  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    latitude: 24,
    longitude: 0,
    zoom: 0.5,
  });

  useEffect(() => {
    if (!width) return;
    if (width > 1024) {
      setViewState((prev) => ({ ...prev, zoom: 0.5 }));
    } else if (width > 768) {
      setViewState((prev) => ({ ...prev, zoom: 0 }));
    } else {
      setViewState({ latitude: 10, longitude: 10, zoom: 0 });
    }
  }, [width]);

  const allCountries = useMemo(() => {
    const countriesData = countries as unknown as {
      features: Array<{
        properties: { iso_a2: string; [key: string]: unknown };
        [key: string]: unknown;
      }>;
    };

    // Always start with blank map
    const blankFeatures = countriesData.features.map((country) => ({
      ...country,
      properties: {
        ...country.properties,
        colorKey: "#E1EBE5", // Blank/neutral color
        JRCColorKey: "#E1EBE5",
        GFW_20PColorKey: "#E1EBE5",
        GFW_30PColorKey: "#E1EBE5",
        countrySlug: "",
      },
    }));

    // Filter JRC data by selected year
    const jrcDataAll = forestData.JRC || [];
    const jrcData = jrcDataAll.filter((item) => item.year == selectedYear);

    // Filter GFW_20P data by selected year
    const gfw20pDataAll = forestData.GFW_20P || [];
    const gfw20pData = gfw20pDataAll.filter(
      (item) => item.year == selectedYear,
    );

    // Filter GFW_30P data by selected year
    const gfw30pDataAll = forestData.GFW_30P || [];
    const gfw30pData = gfw30pDataAll.filter(
      (item) => item.year == selectedYear,
    );

    // Update JRC colors if we have JRC data
    let featuresWithColors = blankFeatures;
    if (jrcData.length > 0) {
      const transformedJRC = transformAllForestCoverChangeData(jrcData);
      featuresWithColors = featuresWithColors.map((country) => {
        const countrySlug = country.properties.countrySlug as string;
        const countyISO2 = country.properties.iso_a2 as string;
        const jrcEligibility = transformedJRC[countyISO2]?.eligibility;
        const jrcColorKey = getGFWColorKey(jrcEligibility || "NA");

        return {
          ...country,
          properties: {
            ...country.properties,
            countrySlug,
            JRCColorKey: jrcColorKey,
          },
        };
      });
    }

    // Update GFW_20P colors if we have GFW_20P data
    if (gfw20pData.length > 0) {
      const transformedGFW20P = transformAllForestCoverChangeData(gfw20pData);
      featuresWithColors = featuresWithColors.map((country) => {
        const countrySlug = country.properties.countrySlug as string;
        const countyISO2 = country.properties.iso_a2 as string;
        const gfw20PEligibility = transformedGFW20P[countyISO2]?.eligibility;
        const gfw20PColorKey = getGFWColorKey(gfw20PEligibility || "NA");

        return {
          ...country,
          properties: {
            ...country.properties,
            countrySlug,
            GFW_20PColorKey: gfw20PColorKey,
          },
        };
      });
    }

    // Update GFW_30P colors if we have GFW_30P data
    if (gfw30pData.length > 0) {
      const transformedGFW30P = transformAllForestCoverChangeData(gfw30pData);
      featuresWithColors = featuresWithColors.map((country) => {
        const countrySlug = country.properties.countrySlug as string;
        const countyISO2 = country.properties.iso_a2 as string;
        const gfw30PEligibility = transformedGFW30P[countyISO2]?.eligibility;
        const gfw30PColorKey = getGFWColorKey(gfw30PEligibility || "NA");

        return {
          ...country,
          properties: {
            ...country.properties,
            countrySlug,
            GFW_30PColorKey: gfw30PColorKey,
          },
        };
      });
    }

    return {
      ...countries,
      features: featuresWithColors,
    };
  }, [selectedYear, forestData]);

  const onMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    if (viewState.zoom < 0) return;

    const newCenter = [viewState.longitude, viewState.latitude];
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState({
        zoom: viewState.zoom,
        longitude: newCenter[0],
        latitude: newCenter[1],
      });
    }
  }, []);

  const onClick = (event: maplibregl.MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: [
        "country-fill-jrc",
        "country-fill-gfw_20p",
        "country-fill-gfw_30p",
      ],
    });
    const { point } = event;
    const country = features?.[0]?.properties?.name_long;
    const countrySlug = features?.[0]?.properties?.countrySlug;
    const countryISO2 = features?.[0]?.properties?.["iso_a2"];

    // If clicked outside of any country, clear selection
    if (!features || features.length === 0 || !country || !countryISO2) {
      // Clear old store (use empty values since it doesn't accept null)
      setPoint({ x: 0, y: 0 });
      setCountry("");
      setCountrySlug("");
      setCountryISO2("");
      setIsTFFF(false);

      // Clear new store
      setSelectedCountry(null);
      setClickPosition(null);
      return;
    }

    // Update old store (for backward compatibility)
    setPoint(point);
    setCountry(country);
    setCountrySlug(countrySlug);
    setCountryISO2(countryISO2);

    // Get current dataset data filtered by year
    const { forestData } = useWorldMapStore.getState();
    const currentDataAll = forestData[selectedDataset] || [];
    const currentData = currentDataAll.filter(
      (item) => String(item.year) === String(selectedYear),
    );

    const isTFFF = currentData.find(
      (el) => el["country-iso2"] === countryISO2 || el.country === country,
    );
    if (isTFFF) setIsTFFF(true);
    else setIsTFFF(false);

    // Update new store
    const countryData = {
      iso2: countryISO2,
      iso3: "", // We don't have ISO3 in the current data
      name: country,
      slug: countrySlug || "",
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
            onLoad={() => {
              const map = mapRef.current?.getMap();
              map?.addControl(
                new maplibregl.AttributionControl({ compact: true }),
              );
            }}
          >
            <Source
              id="country"
              type="geojson"
              data={
                allCountries as unknown as GeoJSON<Geometry, GeoJsonProperties>
              }
            >
              {/* JRC Layer */}
              <Layer
                id="country-fill-jrc"
                type="fill"
                paint={{
                  "fill-color": ["get", "JRCColorKey"],
                  "fill-opacity": selectedDataset === "JRC" ? 1 : 0,
                }}
              />
              {/* GFW_20P Layer */}
              <Layer
                id="country-fill-gfw_20p"
                type="fill"
                paint={{
                  "fill-color": ["get", "GFW_20PColorKey"],
                  "fill-opacity": selectedDataset === "GFW_20P" ? 1 : 0,
                }}
              />
              {/* GFW_30P Layer */}
              <Layer
                id="country-fill-gfw_30p"
                type="fill"
                paint={{
                  "fill-color": ["get", "GFW_30PColorKey"],
                  "fill-opacity": selectedDataset === "GFW_30P" ? 1 : 0,
                }}
              />
              <Layer
                id="country-line"
                type="line"
                paint={{
                  "line-color": "#F0FAF4",
                  "line-width": 1.5,
                }}
              />
            </Source>

            {/* <NavigationControl position="bottom-right" showCompass={false} /> */}
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
            // Create a version with the correct colorKey based on selected dataset
            const downloadData = {
              ...allCountries,
              features: allCountries.features.map((feature) => ({
                ...feature,
                properties: {
                  ...feature.properties,
                  colorKey:
                    selectedDataset === "JRC"
                      ? feature.properties.JRCColorKey
                      : selectedDataset === "GFW_20P"
                        ? feature.properties.GFW_20PColorKey
                        : feature.properties.GFW_30PColorKey,
                },
              })),
            };

            downloadGeoJsonAsSvg(
              downloadData as unknown as NaturalEarthCountryFeatureCollection,
              {
                width: 800,
                height: 800,
                filename: `tfff-world-map-${selectedDataset}-${selectedYear}.svg`,
                backgroundColor: "#F0FAF4",
                strokeWidth: 1,
              },
            );
          }}
        >
          <Image width={24} height={24} src="/assets/download-map.svg" alt="" />
        </button>
      </div>
    </>
  );
}

function VersionChip() {
  const mapVersion = env.mapVersion;
  return <div className="z-20 text-xs">{mapVersion}</div>;
}
