"use client";

import { useWorldMapStore } from "@/stores/mapStore";
import { api, urls } from "@/lib/http";
import { useEffect, useState } from "react";
import TFFFCard from "../shared/TFFFCard";
import { DatasetType } from "../shared/types";
import { Country } from "@/domain/country.types";
import { CountryForestRecord } from "@/domain/forest-record.types";

interface CountryMapCardProps {
  country: Country;
  dataset?: DatasetType;
}

export default function CountryMapCard({
  country,
  dataset = "JRC",
}: CountryMapCardProps) {
  const { selectedYear } = useWorldMapStore();
  const [tfffData, setTfffData] = useState<CountryForestRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the dataset from props
  const activeDataset = dataset;

  // Fetch country-specific data from forestChange API (all years for country, filter by year on client)
  useEffect(() => {
    const fetchCountryData = async () => {
      if (!country.iso2 || !selectedYear) return;

      try {
        setIsLoading(true);
        const data = await api<CountryForestRecord[]>({
          url: urls.forestChange,
          method: "GET",
          token: "",
          query: {
            "country-iso2": country.iso2, // Changed from 'country' to 'country-iso2'
            source: activeDataset, // Dataset-specific data (JRC or GFW)
            // Removed year parameter - will filter on client side
          },
        });

        // Filter data by year on client side (API returns all years for this country)
        const filteredData = data.filter(
          (item) => String(item.year) === String(selectedYear)
        );

        if (filteredData && filteredData.length > 0) {
          setTfffData(filteredData[0]);
        } else {
          setTfffData(null);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
        setTfffData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, [country.iso2, selectedYear, activeDataset]);

  if (!country) {
    return null;
  }

  // Show loading state if data is being fetched
  if (isLoading && !tfffData) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-3xs md:w-[29rem] p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-xs sm:text-sm rounding-xl bg-white shadow-custom">
          {/* Header with flag and country name */}
          <div className="p-2 px-4 sm:px-2 md:p-0 flex gap-2 justify-between items-center flex-wrap rounded-t-lg bg-primary-light md:bg-white">
            <div className="flex gap-2 items-center animate-pulse">
              <div className="w-4 h-3 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-2 animate-pulse">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>

          <div className="p-2 px-4 sm:px-2 md:p-0 mt-4">
            <div className="animate-pulse space-y-3">
              {/* 3 full lines for reward/discount data */}
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-72"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-68"></div>
                <div className="h-4 bg-gray-200 rounded w-18"></div>
              </div>
            </div>
          </div>

          {/* Bottom section with estimated reward */}
          <div className="p-2 px-4 sm:px-2 md:p-3 md:-mx-3 lg:-mx-4 xl:-mx-5 lg:p-4 xl:p-5 xl:py-4 bg-primary-light rounded-b-xl md:rounded-b-2xl lg:rounded-b-3xl mt-4">
            <div className="animate-pulse space-y-2">
              {/* 2 full lines for estimated reward */}
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-56"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tfffData) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <TFFFCard
        country={country}
        data={tfffData}
        dataset={activeDataset}
        variant="standalone"
        showCTA={false}
        size="default"
      />
    </div>
  );
}
