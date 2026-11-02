"use client";

import * as turf from "@turf/turf";
import { useWindowSize } from "@uidotdev/usehooks";
import { MapRef, ViewStateChangeEvent } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";

// Pan boundary shared by the interactive world-scale maps.
export const GEOFENCE = turf.polygon([
  [
    [-180, 64],
    [180, 64],
    [180, -48],
    [-180, -48],
    [-180, 64],
  ],
]);

// Shared MapLibre boot for the interactive maps (WorldMap, EndorsementMap):
// responsive zoom by viewport width, geofenced pan clamp, and the compact
// AttributionControl added on load. Each map keeps its own onClick (layer ids
// and feature extraction differ per map). Logic preserved verbatim.
export function useMapEngine() {
  const { width } = useWindowSize();
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

  const onLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    map?.addControl(new maplibregl.AttributionControl({ compact: true }));
  }, []);

  return { mapRef, viewState, onMove, onLoad };
}
