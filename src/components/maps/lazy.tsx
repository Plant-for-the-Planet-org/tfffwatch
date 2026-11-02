"use client";

// Lazy (client-only) versions of the MapLibre maps. MapLibre + Turf are the
// heaviest part of the bundle and render nothing useful on the server, so they
// load after first paint. Each placeholder keeps the map's own box so the page
// does not shift when the map arrives.

import dynamic from "next/dynamic";

export const LazyWorldMap = dynamic(() => import("./world/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="relative mx-auto aspect-[2] w-full h-full max-w-full max-h-full md:w-3/4 md:h-3/4" />
  ),
});

export const LazyCountryMap = dynamic(() => import("./country/CountryMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export const LazyEndorsementMap = dynamic(
  () => import("./world/EndorsementMap"),
  {
    ssr: false,
    loading: () => <div className="relative mx-auto w-full h-full" />,
  }
);
