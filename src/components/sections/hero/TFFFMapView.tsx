"use client";

// Direct imports, not the "@/components/maps" barrel, so the barrel's static
// map exports do not pull MapLibre into this page's first-load bundle.
import {
  LazyCountryMap as CountryMap,
  LazyWorldMap as WorldMap,
} from "@/components/maps/lazy";
import { useDatasetData } from "@/components/maps/shared/useDatasetData";
import { useWorldMapStore } from "@/stores/map.store";
import CountryMapCard from "@/components/maps/country/CountryMapCard";
import { ClickTooltip } from "@/components/maps/base/ClickTooltip";
import {
  CountryMapLegends,
  LegendsForMMU,
} from "@/components/maps/MapLegends";
import {
  CountryMapHeaderContent,
  WorldMapHeaderContent,
} from "@/components/sections/hero/TFFFMapViewContent";
import { Spacer } from "@/components/ui/layout";
import { CountryDetails } from "@/domain/country.types";
import {
  DATASET_LATEST_YEAR,
  DatasetType,
  DEFAULT_DATASET,
} from "@/domain/dataset";
import { asCountrySlug } from "@/domain/brand";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";
import { useParams } from "next/navigation";
import CountrySearch from "@/components/maps/search/CountrySearch";
import {
  openCountryPage,
  type SearchableCountry,
} from "@/domain/country-search";
import type { CountryStatus } from "@/domain/eligibility";
import { Suspense, useEffect } from "react";
import RewardsChart from "../charts/RewardsChart";
import { fetchForestCoverChangeDataV2 } from "@/utils/forestChange.store";
import { Top10CountriesChart } from "../charts/Top10BarChart";
import HeaderCountry from "@/components/HeaderCountry";

export function TFFFWorldMapView() {
  const { forestCoverChangeData, setForestCoverChangeDataByYear } =
    useForestCoverChangeData();

  // New map store integration
  const {
    selectedDataset,
    selectedYear,
    setSelectedYear,
    resetDatasetFetched,
    setFocusIso2,
    setSelectedCountry,
    setClickPosition,
  } = useWorldMapStore();

  // Every pick opens the country page in a new tab. Countries with data
  // also open the map popup here.
  const onSearchSelect = (
    country: SearchableCountry,
    status: CountryStatus,
  ) => {
    openCountryPage(country.slug, selectedYear, selectedDataset);
    if (status !== "NO_DATA") setFocusIso2(country.iso2);
  };

  // On mount (e.g. returning to home): refetch data, and show the latest
  // year, since Home has no year picker and a country page may have changed it.
  useEffect(() => {
    resetDatasetFetched();
    setSelectedYear(String(DATASET_LATEST_YEAR));
  }, [resetDatasetFetched, setSelectedYear]);

  // Load the full MMU series (all years) into the map store.
  useDatasetData();

  useEffect(() => {
    const _yearWise = forestCoverChangeData.filter(
      (el) => el.year == selectedYear,
    );
    setForestCoverChangeDataByYear(_yearWise);
  }, [
    forestCoverChangeData,
    selectedYear,
    setForestCoverChangeDataByYear,
  ]);

  return (
    <WorldMapViewContainer>
      <div className="relative h-full flex flex-col">
        {/* Floats top-right so it does not push the title down. */}
        <div className="hidden md:block absolute top-0 right-0 z-20">
          <ClickTooltip />
        </div>

        <Spacer />
        {/* z-30 keeps the open search panel above the map's edge fades (z-10)
            and the legend (z-20), which come later in the DOM. */}
        <div className="relative z-30">
          <div>
            <WorldMapHeaderContent />
            <Spacer />
            {/* Country search, below the subheading */}
            <div className="relative z-20 flex justify-center">
              <CountrySearch
                onSelect={onSearchSelect}
                onOpen={() => {
                  // Hide any open country popup so it does not overlap.
                  setSelectedCountry(null);
                  setClickPosition(null);
                }}
              />
            </div>
          </div>
          <Spacer />
          <Spacer />
        </div>

        <div className="grow relative flex flex-col">
          <WorldMap
            selectedYear={selectedYear}
            dataset={selectedDataset}
            variant="hero"
          />

          {/* Legend cards below the map. z-20 keeps them above the map's
              edge fades; the bottom padding leaves room for the version and
              citation line, which WorldMap pins to this box's bottom-right. */}
          <div className="relative z-20 pb-16 md:pb-12">
            <LegendsForMMU />
          </div>
        </div>
      </div>
      <Spacer />
      <Spacer />
      <RewardsChart />
      <Top10CountriesChart />
    </WorldMapViewContainer>
  );
}

type TFFFCountryMapViewProps = CountryDetails & {
  year: string;
  dataset?: DatasetType;
};

function TFFFCountryMapViewInner(props: TFFFCountryMapViewProps) {
  const { country } = useParams();
  // Single dataset mode; the ?dataset URL param is ignored.
  const selectedDataset = DEFAULT_DATASET;
  useDatasetData();

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
      <div className="hidden md:flex md:px-4 lg:px-5 xl:px-6">
        <HeaderCountry />
      </div>
      <Spacer />

      <CountryMapViewContainer>
        <div className="h-full flex flex-col">
          <Spacer />
          <CountryMapHeaderContent year={props.year} />
          <Spacer />
          {/* Country search, below the subheading */}
          <div className="relative z-20 flex justify-center">
            <CountrySearch
              currentIso2={props.iso2}
              onSelect={(c) => {
                if (c.iso2 === props.iso2) return;
                openCountryPage(c.slug, props.year, selectedDataset);
              }}
            />
          </div>
          <Spacer />

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
    // <div className="isolate bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
    <div className="isolate bg-primary-light outer-rounding outer-padding-3 max-h-full">
      {children}
    </div>
  );
}

function CountryMapViewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate bg-primary-light outer-rounding outer-padding-3 h-[90vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] min-h-fit">
      {children}
    </div>
  );
}
