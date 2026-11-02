import { create } from "zustand";
import type { CountryForestRecord } from "@/domain/forest-record.types";

type ForestCoverChangeStore = {
  forestCoverChangeData: CountryForestRecord[];
  forestCoverChangeDataByYear: CountryForestRecord[];
  forestCoverChangeDataByCountry: CountryForestRecord[];
  forestCoverChangeDataByCountryByYear: CountryForestRecord | null;
  setForestCoverChangeData: (data: CountryForestRecord[]) => void;
  setForestCoverChangeDataByYear: (data: CountryForestRecord[]) => void;
  setForestCoverChangeDataByCountry: (data: CountryForestRecord[]) => void;
  setForestCoverChangeDataByCountryByYear: (data: CountryForestRecord) => void;
};

export const useForestCoverChangeData = create<ForestCoverChangeStore>(
  (set) => ({
    forestCoverChangeData: [],
    forestCoverChangeDataByYear: [],
    forestCoverChangeDataByCountry: [],
    forestCoverChangeDataByCountryByYear: null,
    setForestCoverChangeData: (data) => set({ forestCoverChangeData: data }),
    setForestCoverChangeDataByCountry: (data) =>
      set({ forestCoverChangeDataByCountry: data }),
    setForestCoverChangeDataByYear: (data) =>
      set({ forestCoverChangeDataByYear: data }),
    setForestCoverChangeDataByCountryByYear: (data) =>
      set({ forestCoverChangeDataByCountryByYear: data }),
  })
);
