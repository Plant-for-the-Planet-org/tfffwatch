"use client";

import {
  CountryMap,
  DatasetTabs,
  useWorldMapStore,
  WorldMap,
} from "@/components/maps";
import { DatasetType } from "@/components/maps/shared/types";
import CountryMapCard from "@/components/maps/country/CountryMapCard";
import {
  CountryMapLegends,
  LegendsForGFW,
  LegendsForJRC,
} from "@/components/maps/MapLegends";
import {
  CountryMapHeaderContent,
  WorldMapHeaderContent,
} from "@/components/sections/hero/TFFFMapViewContent";
import Br from "@/components/ui/Br";
import { CountryDetails } from "@/utils/country-helper";
import { env } from "@/utils/env";
import { useForestCoverChangeData } from "@/utils/store";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import RewardsChart from "../charts/RewardsChart";
import { fetchForestCoverChangeDataV2 } from "@/utils/forestChange.store";
import {
  GFWTop10CountriesChart,
  JRC10CountriesChart,
} from "../charts/Top10BarChart";
import Image from "next/image";
import HeaderCountry from "@/components/HeaderCountry";

export function TFFFWorldMapView() {
  const { forestCoverChangeData, setForestCoverChangeDataByYear } =
    useForestCoverChangeData();

  // New map store integration
  const {
    selectedDataset,
    setForestData,
    selectedYear,
    setSelectedYear,
    resetDatasetFetched,
  } = useWorldMapStore();

  // Reset dataset fetched flags when component mounts (returning to home page)
  useEffect(() => {
    resetDatasetFetched();
  }, [resetDatasetFetched]);

  useEffect(() => {
    const _yearWise = forestCoverChangeData.filter(
      (el) => el.year == selectedYear,
    );
    setForestCoverChangeDataByYear(_yearWise);

    // Update new store with forest data for all three datasets initially
    // This provides immediate data for map rendering, specific data will be fetched by DatasetTabs
    setForestData("GFW_20P", _yearWise);
    setForestData("GFW_30P", _yearWise);
    setForestData("JRC", _yearWise); // Use as fallback until JRC-specific data is fetched
  }, [
    forestCoverChangeData,
    selectedYear,
    setForestCoverChangeDataByYear,
    setForestData,
    setSelectedYear,
  ]);

  return (
    <WorldMapViewContainer>
      <div className="h-full flex flex-col">
        {/* Dataset Tabs */}
        <div className="flex justify-between mb-4">
          <div className="hidden md:block w-10"></div>
          <DatasetTabs />
          <div className="hidden md:block">
            <ClickTooltip />
          </div>
        </div>

        <Br />
        <div className="relative z-10">
          <div className="bg-primary-light">
            <WorldMapHeaderContent />
          </div>
          <div className="bg-gradient-to-b from-primary-light to-transparent">
            <Br />
            <Br />
          </div>
        </div>

        <div className="grow relative flex flex-col">
          <WorldMap
            selectedYear={selectedYear}
            dataset={selectedDataset}
            variant="hero"
          />

          <div className="mb-8 md:mb-0 md:absolute left-0 bottom-0 min-w-48 max-w-fit pointer-events-none">
            <Br cn="md:hidden" />
            {selectedDataset === "JRC" ? <LegendsForJRC /> : <LegendsForGFW />}
            <Br />
          </div>
        </div>
      </div>
      <Br />
      <Br />
      <RewardsChart />
      {selectedDataset === "JRC" ? (
        <JRC10CountriesChart />
      ) : (
        <GFWTop10CountriesChart />
      )}
    </WorldMapViewContainer>
  );
}

type TFFFCountryMapViewProps = CountryDetails & {
  year: string;
  dataset?: DatasetType;
};

function TFFFCountryMapViewInner(props: TFFFCountryMapViewProps) {
  const { country } = useParams();
  const searchParams = useSearchParams();

  // Get dataset from URL params, fallback to props or default
  const selectedDataset: DatasetType =
    (searchParams.get("dataset") as DatasetType) || props.dataset || "JRC";

  useEffect(() => {
    if (props.name && props.iso2) {
      console.log("Fetching data for:", {
        country: props.name,
        iso2: props.iso2,
        source: selectedDataset,
      });
      // Fetch country-specific data with the selected dataset
      fetchForestCoverChangeDataV2({
        country: props.name,
        iso2: props.iso2,
        source:
          selectedDataset === "GFW_20P" || selectedDataset === "GFW_30P"
            ? "GFW"
            : selectedDataset,
      });
    }
  }, [props.name, props.iso2, selectedDataset]);

  // Removed problematic navigation that was causing 404 redirects

  // Convert props to CountryData format
  const countryData = {
    iso2: props.iso2,
    iso3: props.iso3,
    name: props.name,
    slug: country as string,
    flagImgUrl: props.flagImgUrl,
  };

  return (
    <div>
      <div className="flex justify-between md:px-4 lg:px-5 xl:px-6">
        <div className="hidden md:block">
          <HeaderCountry />
        </div>
        {/* Dataset Tabs */}
        <DatasetTabs />
      </div>
      <Br />

      <CountryMapViewContainer>
        <div className="h-full flex flex-col">
          <Br />
          <CountryMapHeaderContent year={props.year} />
          <Br />

          <div className="grow grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-60 md:h-full">
              <div className="absolute bottom-0 left-0 pointer-events-none">
                <CountryMapLegends />
              </div>
              <CountryMap
                country={countryData}
                year={props.year}
                dataset={selectedDataset}
              />
            </div>
            <CountryMapCard country={countryData} dataset={selectedDataset} />
          </div>
        </div>
      </CountryMapViewContainer>
    </div>
  );
}

export function TFFFCountryMapView(props: TFFFCountryMapViewProps) {
  return (
    <Suspense fallback={<></>}>
      <TFFFCountryMapViewInner {...props} />
    </Suspense>
  );
}

function WorldMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    // <div className="bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
    <div className="bg-primary-light outer-rounding outer-padding-3 max-h-full">
      {children}
    </div>
  );
}

function CountryMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
      {/* <div className="bg-primary-light outer-rounding outer-padding-3 max-h-full"> */}
      {children}
    </div>
  );
}

export function VersionChip() {
  const mapVersion = env.mapVersion;
  return <div className="z-20 text-xs">{mapVersion}</div>;
}

export function ClickTooltip() {
  return (
    <div className="relative group">
      <button
        className="bg-white rounded-lg p-1 cursor-pointer overflow-clip"
        onClick={() => {}}
      >
        <Image
          className="-translate-x-0.5"
          width={32}
          height={32}
          src="/assets/finger-tap.gif"
          alt=""
        />
      </button>

      {/* Tooltip */}
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-background text-base-text text-sm px-3 py-2 rounded-full whitespace-nowrap shadow-lg">
          Click on a country for more data
        </div>
      </div>
    </div>
  );
}
