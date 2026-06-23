"use client";

import { useWorldMapStore } from "@/stores/mapStore";
import { api, urls } from "@/utils/axios-helper";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { DatasetType, TFFFData } from "./types";
import Image from "next/image";
import Link from "next/link";
import PersistentTooltip from "@/components/ui/PersistentTooltip";

interface DatasetTabsProps {
  tabsClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  disabled?: boolean;
  defaultDataset?: DatasetType;
}

export default function DatasetTabs({
  tabsClassName,
  activeTabClassName,
  inactiveTabClassName,
  disabled = false,
  defaultDataset = "JRC",
}: DatasetTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    setForestData,
    setIsLoading,
    setSelectedDataset,
    datasetFetched,
    markDatasetFetched,
  } = useWorldMapStore();

  // Get current dataset from URL or use default
  const selectedDataset =
    (searchParams.get("dataset") as DatasetType) || defaultDataset;

  // Fetch data for a specific dataset (fetch ALL years at once)
  const fetchDatasetData = useCallback(
    async (dataset: DatasetType, force: boolean = false) => {
      // Check if we've already fetched this dataset (not year-specific)
      if (datasetFetched[dataset] && !force) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await api<TFFFData[]>({
          url: urls.forestChangeAll,
          method: "GET",
          token: "",
          query: {
            source:
              dataset === "GFW_20P" || dataset === "GFW_30P" ? "GFW" : dataset,
            // Do NOT include year - fetch all years at once
          },
        });

        // Store ALL data (not filtered by year)
        setForestData(dataset, data);
        markDatasetFetched(dataset);
      } catch (error) {
        console.error(`Error fetching ${dataset} data:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    [datasetFetched, setForestData, setIsLoading, markDatasetFetched],
  );

  // Set selected dataset immediately on mount and when URL changes
  useEffect(() => {
    setSelectedDataset(selectedDataset);
  }, [selectedDataset, setSelectedDataset]);

  // Fetch data when dataset changes (NOT on year change)
  useEffect(() => {
    fetchDatasetData(selectedDataset);
  }, [selectedDataset, fetchDatasetData]);
  const datasets: { key: DatasetType; label: string; description: string }[] = [
    {
      key: "JRC",
      label: "Standard Estimate (JRC+GFW)",
      description: "",
    },
    {
      key: "GFW_20P",
      label: "20% Canopy Cover Estimate (GFW)",
      description: "",
    },
    {
      key: "GFW_30P",
      label: "30% Canopy Cover Estimate (GFW)",
      description: "",
    },
  ];

  const baseTabClasses =
    "px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 text-[10px] sm:text-sm font-regular rounded-lg transition-colors duration-200 cursor-pointer outline-none";
  const defaultActiveClasses = "bg-white font-medium text-[#333333] shadow-sm";
  const defaultInactiveClasses =
    "bg-white/33 text-[#828282] hover:bg-[#E4F6EB]/50";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const handleTabClick = useCallback(
    (dataset: DatasetType) => {
      if (!disabled) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("dataset", dataset);
        router.push(`?${params.toString()}`, { scroll: false });
      }
    },
    [disabled, router, searchParams],
  );

  return (
    <div
      className={twMerge(
        "flex gap-1 p-1 bg-[#E4F6EB] rounded-xl border border-primary-light",
        tabsClassName,
      )}
    >
      {datasets.map(({ key, label, description }) => {
        const isActive = selectedDataset === key;

        return (
          <button
            key={key}
            onClick={() => handleTabClick(key)}
            disabled={disabled}
            title={description}
            className={twMerge(
              baseTabClasses,
              isActive
                ? twMerge(defaultActiveClasses, activeTabClassName)
                : twMerge(defaultInactiveClasses, inactiveTabClassName),
              disabled && disabledClasses,
            )}
          >
            {label}
          </button>
        );
      })}

      <div className="flex items-center">
        <PersistentTooltip
          className="border border-primary-light"
          trigger={
            <button className="h-8 w-8 flex justify-center outline-none">
              <Image
                width={16}
                height={16}
                src={"/assets/tooltip-info-icon.svg"}
                alt=""
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
        We created TFFF payout estimates, based on two different global
        deforestation classifications. Our Standard Estimate is based on the{" "}
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
        data for subtropical regions (for which no JRC data is available). The
        Conservative Estimate is entirely based on GFW data.  Neither should be
        understood as the “better” one. We refer to the former as the Standard
        Estimate, since it is the one preferred by the TFFF team and due to its
        lower detected deforestation rates, it is likely also closer to the
        submissions that will be made by rainforest countries as part of their
        payout claims. We refer to the GFW model as the Conservative Estimate,
        since on average it shows higher deforestation rates which results in
        fewer countries being eligible for payouts and generally lower payouts
        for eligible countries.
      </div>
    </div>
  );
}
