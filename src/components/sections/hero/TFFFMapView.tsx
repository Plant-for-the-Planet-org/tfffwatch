"use client";

import {
  CountryMap,
  DatasetTabs,
  useWorldMapStore,
  WorldMap,
} from "@/components/maps";
import CountryMapCard from "@/components/maps/country/CountryMapCard";
import { ClickTooltip } from "@/components/maps/base/ClickTooltip";
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
import { CountryDetails } from "@/domain/country.types";
import { asCountrySlug } from "@/domain/brand";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import RewardsChart from "../charts/RewardsChart";
import { fetchForestCoverChangeDataV2 } from "@/utils/forestChange.store";
import {
  GFWTop10CountriesChart,
  JRC10CountriesChart,
} from "../charts/Top10BarChart";
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
      (el) => el.year == selectedYear
    );
    setForestCoverChangeDataByYear(_yearWise);

    // Update new store with forest data for both datasets initially
    // This provides immediate data for map rendering, specific data will be fetched by DatasetTabs
    setForestData("GFW", _yearWise);
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
  dataset?: "GFW" | "JRC";
};

function TFFFCountryMapViewInner(props: TFFFCountryMapViewProps) {
  const { country } = useParams();
  const searchParams = useSearchParams();

  // Get dataset from URL params, fallback to props or default
  const selectedDataset =
    (searchParams.get("dataset") as "GFW" | "JRC") || props.dataset || "JRC";

  useEffect(() => {
    if (props.name && props.iso2) {
      // Fetch country-specific data with the selected dataset
      fetchForestCoverChangeDataV2({
        country: props.name,
        iso2: props.iso2,
        source: selectedDataset,
      });
    }
  }, [props.name, props.iso2, selectedDataset]);

  // Removed problematic navigation that was causing 404 redirects

  // Convert props to Country format
  const countryData = {
    iso2: props.iso2,
    iso3: props.iso3,
    name: props.name,
    slug: asCountrySlug(country as string),
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
      {children}
    </div>
  );
}

