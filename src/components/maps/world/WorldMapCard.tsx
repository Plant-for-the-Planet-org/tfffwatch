"use client";

import { useWorldMapStore } from "@/stores/map.store";
import { useMemo, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import TFFFCard from "../shared/TFFFCard";

const THRESHOLD_SCREEN_WIDTH = 1024;

export default function WorldMapCard() {
  const {
    selectedCountry,
    clickPosition,
    selectedDataset,
    forestData,
    isLoading,
    selectedYear,
  } = useWorldMapStore();

  const { width: windowWidth } = useWindowSize();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const tfffData = useMemo(() => {
    if (!selectedCountry || !forestData[selectedDataset].length) return null;

    const data = forestData[selectedDataset].find(
      (data) =>
        data["country-iso2"] === selectedCountry.iso2 &&
        String(data.year) === String(selectedYear)
    );

    return data || null;
  }, [selectedCountry, forestData, selectedDataset, selectedYear]);

  useEffect(() => {
    if (!clickPosition || !wrapperRef.current || !windowWidth) return;
    if (windowWidth >= THRESHOLD_SCREEN_WIDTH) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const cardWidth = rect.width || wrapperRef.current.offsetWidth;
    const cardHeight = rect.height || wrapperRef.current.offsetHeight;

    const gap = 8;
    const margin = 8;

    let left = clickPosition.x - cardWidth / 2;
    let top = clickPosition.y - gap - cardHeight;
    if (top < margin) top = clickPosition.y + gap;

    const viewportWidth = windowWidth;
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 0;
    left = Math.max(margin, Math.min(viewportWidth - cardWidth - margin, left));
    if (viewportHeight) {
      top = Math.max(
        margin,
        Math.min(viewportHeight - cardHeight - margin, top)
      );
    }

    setPosition({ left, top });
  }, [clickPosition, windowWidth]);

  if (!selectedCountry || !clickPosition) {
    return null;
  }

  if (isLoading && !tfffData) {
    return (
      <div
        ref={wrapperRef}
        className="absolute z-50"
        style={{
          left:
            windowWidth && windowWidth < THRESHOLD_SCREEN_WIDTH
              ? position.left
              : clickPosition.x,
          top:
            windowWidth && windowWidth < THRESHOLD_SCREEN_WIDTH
              ? position.top
              : clickPosition.y,
          transform:
            windowWidth && windowWidth < THRESHOLD_SCREEN_WIDTH
              ? undefined
              : "translate(-50%, -120%)",
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tfffData) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute z-50"
      style={{
        left:
          windowWidth && windowWidth < 1024 ? position.left : clickPosition.x,
        top: windowWidth && windowWidth < 1024 ? position.top : clickPosition.y,
        transform:
          windowWidth && windowWidth < 1024
            ? undefined
            : "translate(-50%, -120%)",
      }}
    >
      <TFFFCard
        country={selectedCountry}
        data={tfffData}
        dataset={selectedDataset}
        variant="popup"
        showCTA={true}
        size="default"
      />
    </div>
  );
}
