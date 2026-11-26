"use client";

import { useEffect } from "react";
import { api, urls } from "@/lib/http";
import { DEFAULT_DATASET } from "@/domain/dataset";
import type { CountryForestRecord } from "@/domain/forest-record.types";
import { useWorldMapStore } from "@/stores/map.store";

// Loads the full MMU series (all years) into the map store once.
// Replaces the fetch that used to live in the dataset tab switcher.
export function useDatasetData() {
  const {
    setForestData,
    setIsLoading,
    setSelectedDataset,
    datasetFetched,
    markDatasetFetched,
  } = useWorldMapStore();

  const dataset = DEFAULT_DATASET;
  const fetched = datasetFetched[dataset];

  useEffect(() => {
    setSelectedDataset(dataset);
  }, [dataset, setSelectedDataset]);

  useEffect(() => {
    if (fetched) return;

    (async () => {
      try {
        setIsLoading(true);
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
    })();
  }, [dataset, fetched, setForestData, setIsLoading, markDatasetFetched]);
}
