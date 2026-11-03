import { create } from "zustand";
import { DatasetType, WorldMapState } from "../components/maps/shared/types";
import { Country } from "@/domain/country.types";
import { CountryForestRecord } from "@/domain/forest-record.types";

interface WorldMapStore extends WorldMapState {
  setSelectedCountry: (country: Country | null) => void;
  setSelectedYear: (year: string) => void;
  setSelectedDataset: (dataset: DatasetType) => void;
  setClickPosition: (position: { x: number; y: number } | null) => void;
  setForestData: (dataset: DatasetType, data: CountryForestRecord[]) => void;
  setIsLoading: (loading: boolean) => void;
  getCurrentForestData: () => CountryForestRecord[];
  getSelectedCountryData: () => CountryForestRecord | null;
  datasetFetched: { GFW: boolean; JRC: boolean; MMU: boolean };
  markDatasetFetched: (dataset: DatasetType) => void;
  resetDatasetFetched: () => void;
}

export const useWorldMapStore = create<WorldMapStore>((set, get) => ({
  selectedCountry: null,
  selectedYear: "2024",
  selectedDataset: "JRC",
  clickPosition: null,
  forestData: { GFW: [], JRC: [], MMU: [] },
  isLoading: false,
  datasetFetched: { GFW: false, JRC: false, MMU: false },

  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedYear: (year) =>
    set(() => ({
      selectedYear: year,
      // Do NOT clear forest data - we have all years
    })),
  setSelectedDataset: (dataset) => set({ selectedDataset: dataset }),
  setClickPosition: (position) => set({ clickPosition: position }),
  setForestData: (dataset, data) =>
    set((state) => ({
      forestData: { ...state.forestData, [dataset]: data },
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  markDatasetFetched: (dataset) =>
    set((state) => ({
      datasetFetched: {
        ...state.datasetFetched,
        [dataset]: true,
      },
    })),
  resetDatasetFetched: () =>
    set({
      datasetFetched: { GFW: false, JRC: false, MMU: false },
    }),

  getCurrentForestData: () => {
    const state = get();
    return state.forestData[state.selectedDataset];
  },
  getSelectedCountryData: () => {
    const state = get();
    const currentData = state.forestData[state.selectedDataset];
    if (!state.selectedCountry || !currentData.length) return null;

    return (
      currentData.find(
        (data) => data["country-iso2"] === state.selectedCountry?.iso2
      ) || null
    );
  },
}));
