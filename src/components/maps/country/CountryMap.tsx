"use client";

import { api, urls } from "@/lib/http";
import turfBbox from "@turf/bbox";
import {
  bboxPolygon as turfBboxPolygon,
  difference as turfDifference,
  featureCollection as turfFeatureCollection,
} from "@turf/turf";
import { useWindowSize } from "@uidotdev/usehooks";
import { Layer, Map, MapRef, Source } from "@vis.gl/react-maplibre";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  MultiPolygon,
  Polygon,
} from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import countries from "../countries-optimized.geo.json";
import { CountryMapProps, LayerData, MmuLayer } from "../shared/types";

// Moved interfaces to shared/types.ts

function getCountryGeoJSON(iso2: string): FeatureCollection {
  const countriesData = countries as unknown as FeatureCollection;
  return {
    type: "FeatureCollection",
    features: countriesData.features.filter(
      (f) => (f.properties as GeoJsonProperties)?.iso_a2 === iso2
    ),
  } as FeatureCollection;
}

// The Layers tiler paints intact forest in the old light green (#6FCF97).
// These values shift it to the theme green (#007A49) in the browser. They were
// fitted for that one source colour, so re-tune (or drop) them if the tiler
// palette changes. Opacity 1 so the green is not washed out by the map behind.
const FOREST_TINT = {
  "raster-opacity": 1,
  "raster-hue-rotate": 18,
  "raster-saturation": 0.8,
  "raster-brightness-max": 0.34,
} as const;

export default function CountryMap({
  country,
  year,
  showLayers = true,
}: CountryMapProps) {
  const { width = 0 } = useWindowSize();

  // Use local state only to avoid store loops
  const [layersData, setLayersData] = useState<LayerData | null>(null);
  const [layersStatus, setLayersStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const mapRef = useRef<MapRef>(null);

  const [countryFeatureCollection] = useState<FeatureCollection>(
    getCountryGeoJSON(country.iso2)
  );

  function repositionMap() {
    if (!countryFeatureCollection) return;
    if (!width) return;

    const maplibre = mapRef.current!.getMap!();
    const [minX, minY, maxX, maxY] = turfBbox(countryFeatureCollection);
    const bounds: [[number, number], [number, number]] = [
      [minX, minY],
      [maxX, maxY],
    ];

    maplibre.fitBounds(bounds, {
      padding: 24,
      maxZoom: 8,
    });
  }

  function getInvertedCountryMask(
    country: FeatureCollection
  ): FeatureCollection {
    const world = turfBboxPolygon([-180, -90, 180, 90]);
    const polygonFeatures = country.features.filter(
      (
        feature
      ): feature is Feature<Polygon | MultiPolygon, GeoJsonProperties> =>
        feature.geometry &&
        (feature.geometry.type === "Polygon" ||
          feature.geometry.type === "MultiPolygon")
    );

    const fc: Feature<Polygon | MultiPolygon, GeoJsonProperties>[] = [
      world,
      ...polygonFeatures,
    ];
    const mask = turfDifference(turfFeatureCollection(fc));

    return {
      type: "FeatureCollection",
      features: [mask!],
    };
  }

  useEffect(() => {
    let cancelled = false;
    setLayersData(null);
    setLayersStatus("loading");
    (async () => {
      try {
        const result = await api<LayerData>({
          url: urls.layersProxyAPI,
          method: "POST",
          token: "",
          body: { iso2: country.iso2, year },
        });
        if (cancelled) return;
        setLayersData(result);
        setLayersStatus("ready");
      } catch (error) {
        if (cancelled) return;
        console.error("Error fetching layers:", error);
        setLayersStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [country.iso2, year]);

  // Drawn bottom to top: forest, then forest loss, then fire loss.
  const mmuLayers = [
    { id: "mmu-forest", layer: layersData?.forest },
    { id: "mmu-deforestation", layer: layersData?.deforestation },
    { id: "mmu-degradation", layer: layersData?.degradation },
  ].filter(
    (entry): entry is { id: string; layer: MmuLayer } => !!entry.layer?.tileUrl
  );

  // Not generated or not published yet: show a note, not an error.
  const showEmptyState =
    showLayers && layersStatus === "ready" && mmuLayers.length === 0;

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{ longitude: 0, latitude: 0, zoom: 1 }}
        style={{ width: "100%", height: "100%" }}
        onLoad={() => {
          repositionMap();
        }}
        renderWorldCopies={false}
        interactive={false}
        // dragPan={true}
        // doubleClickZoom={true}
        attributionControl={false}
      >
        {countryFeatureCollection && (
          <Source id="country" type="geojson" data={countryFeatureCollection}>
            <Layer
              id="country-fill"
              type="fill"
              paint={{
                "fill-color": "#FFFFFF",
                "fill-outline-color": "#FFFFFF",
              }}
            />
            <Layer
              id="country-line"
              type="line"
              paint={{
                "line-color": "#FFFFFF",
                "line-width": 1.5,
              }}
            />
          </Source>
        )}

        {showLayers &&
          mmuLayers.map(({ id, layer }) => (
            <Source
              key={`${id}-${year}`}
              id={`${id}-source`}
              type="raster"
              tiles={[layer.tileUrl]}
              tileSize={256}
            >
              <Layer
                id={`${id}-layer`}
                type="raster"
                paint={id === "mmu-forest" ? FOREST_TINT : { "raster-opacity": 0.8 }}
              />
            </Source>
          ))}

        <Source
          id="mask"
          type="geojson"
          data={getInvertedCountryMask(countryFeatureCollection)}
        >
          <Layer
            id="mask-layer"
            type="fill"
            paint={{
              "fill-color": "#F4FAF6",
              "fill-opacity": 1,
            }}
          />
        </Source>
      </Map>
      {showEmptyState && (
        <p className="absolute top-2 left-0 right-0 text-center text-xs text-gray-600 pointer-events-none">
          Map layers for {year} are not available yet.
        </p>
      )}
    </>
  );
}
