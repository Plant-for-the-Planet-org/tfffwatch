import { create } from "zustand";
import type { CountryForestRecord } from "@/domain/forest-record.types";

type WorldMapStore = {
  isTFFF: boolean;
  year: string;
  country: string;
  countrySlug: string;
  countryISO2: string;
  latitude: number;
  longitude: number;
  point: { x: number; y: number };
  setIsTFFF: (isTFFF: boolean) => void;
  setYear: (year: string) => void;
  setCountry: (country: string) => void;
  setCountrySlug: (countrySlug: string) => void;
  setCountryISO2: (countryISO2: string) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  setPoint: (point: { x: number; y: number }) => void;
};

export const useWorldMap = create<WorldMapStore>((set) => ({
  isTFFF: false,
  year: "",
  country: "",
  countrySlug: "",
  countryISO2: "",
  latitude: 0,
  longitude: 0,
  point: { x: 0, y: 0 },
  setIsTFFF: (isTFFF) => set({ isTFFF }),
  setYear: (year) => set({ year }),
  setCountry: (country) => set({ country }),
  setCountrySlug: (countrySlug) => set({ countrySlug }),
  setCountryISO2: (countryISO2) => set({ countryISO2 }),
  setCoordinates: ({ lat, lng }) => set({ latitude: lat, longitude: lng }),
  setPoint: (point) => set({ point }),
}));

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
