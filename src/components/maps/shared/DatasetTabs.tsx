"use client";

import { useWorldMapStore } from "@/stores/map.store";
import { api, urls } from "@/lib/http";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { DATASET_LABEL, DEFAULT_DATASET } from "@/domain/dataset";
import { CountryForestRecord } from "@/domain/forest-record.types";
import Image from "next/image";
import Link from "next/link";
import PersistentTooltip from "@/components/ui/PersistentTooltip";

interface DatasetTabsProps {
  tabsClassName?: string;
  activeTabClassName?: string;
}

// Single dataset mode (MMU). Kept as a tab-styled label so the layout and the
// data fetch stay in one place; the ?dataset URL param is ignored.
export default function DatasetTabs({
  tabsClassName,
  activeTabClassName,
}: DatasetTabsProps) {
  const {
    setForestData,
    setIsLoading,
    setSelectedDataset,
    datasetFetched,
    markDatasetFetched,
  } = useWorldMapStore();

  const dataset = DEFAULT_DATASET;

  const fetchDatasetData = useCallback(async () => {
    if (datasetFetched[dataset]) return;

    try {
      setIsLoading(true);
      // Fetch ALL years at once (no year param).
      const data = await api<CountryForestRecord[]>({
        url: urls.forestChangeAll,
        method: "GET",
        token: "",
        query: { source: dataset },
      });
      setForestData(dataset, data);
      markDatasetFetched(dataset);
    } catch (error) {
      console.error(`Error fetching ${dataset} data:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [dataset, datasetFetched, setForestData, setIsLoading, markDatasetFetched]);

  useEffect(() => {
    setSelectedDataset(dataset);
  }, [dataset, setSelectedDataset]);

  useEffect(() => {
    fetchDatasetData();
  }, [fetchDatasetData]);

  return (
    <div
      className={twMerge(
        "flex gap-1 p-1 bg-[#E4F6EB] rounded-xl border border-primary-light",
        tabsClassName
      )}
    >
      <div
        title={DATASET_LABEL.full}
        className={twMerge(
          "px-2 py-1 sm:px-4 sm:py-2 text-sm rounded-lg bg-white font-medium text-[#333333] shadow-sm",
          activeTabClassName
        )}
      >
        <span className="sm:hidden">{DATASET_LABEL.short}</span>
        <span className="hidden sm:inline">{DATASET_LABEL.full}</span>
      </div>

      <div className="flex items-center">
        <PersistentTooltip
          className="border border-primary-light"
          trigger={
            <button className="h-8 w-8 flex justify-center outline-none">
              <Image
                width={16}
                height={16}
                src={"/assets/tooltip-info-icon.svg"}
                alt="About this dataset"
              />
            </button>
          }
          content={<DatasetTabsInfoContent />}
        />
      </div>
    </div>
  );
}

function DatasetTabsInfoContent() {
  return (
    <div className="w-2xs lg:w-sm text-xs bg-background text-base-text px-3 py-2 rounded-lg shadow-lg">
      <div>
        Our TFFF payout estimates are based on the{" "}
        <Link
          href={"https://www.science.org/doi/10.1126/sciadv.abe1603"}
          className="text-blue-500"
        >
          JRC’s Tropical Moist Forest dataset (JRC)
        </Link>
        , supplemented by{" "}
        <Link
          href={"https://www.science.org/doi/10.1126/science.1244693"}
          className="text-blue-500"
        >
          Hansen/Global Forest Watch (GFW)
        </Link>{" "}
        data for subtropical regions (for which no JRC data is available),
        with the MMU method applied.
      </div>
    </div>
  );
}
