import { InvestmentTrackerForCountry } from "./types";

export type InvestmentTrackerParams = {
  country: string;
} & Partial<InvestmentTrackerForCountry>;
