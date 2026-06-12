import type { Feature, FeatureCollection, Geometry } from "geojson";

export type News = {
  id: string;
  date: string; // Format: 'DD.MM.YYYY'
  publisher?: string;
  title?: string;
  summary?: string;
  featured_image?: string;
  locale: string; // e.g., 'de' for German
  author?: string;
  url: string;
};

export type Policy = {
  id: string;
  date: string; // format: "dd.MM.yyyy"
  publisher?: string;
  title?: string;
  summary?: string;
  featured_image?: string;
  locale: string;
  author?: string;
  url: string;
};

export type PressRelease = {
  id: string;
  date: string; // format: "dd.MM.yyyy"
  title: string;
  summary: string;
  featured_image: string;
  locale: string;
  url: string;
};

export type InvestmentTrackerForCountry = {
  row_number: number;
  last_updated: string;
  country: string;
  investment_stage: number;
  pledged_capital: number;
  invested_capital: number;
  background: string;
  status: string;
  responsibile_government_office: string;
  endorsements: string;
  CSOs: string;
  How_an_investment_could_work: string;
};

export type InvestmentTrackerCapitals = {
  row_number: number;
  last_updated: string;
  country: string;
  investment_stage: number;
  pledged_capital: number;
  invested_capital: number;
};

export type InvestmentTrackerSum = {
  sum_pledged_capital: number;
  sum_invested_capital: number;
};


export type Spending = {
  year: string;
  country: string;
  locale: string;
  amount_usd: string;
  amount_is_exact: boolean;
  label: string;
  help_text: string;
  added_on: string;
  source_url: string;
  source_name: string;
};

export type NaturalEarthGeoJSONProperties = {
  scalerank: number;
  labelrank: number;
  sovereignt: string;
  sov_a3: string;
  adm0_dif: number;
  level: number;
  type: string;
  admin: string;
  adm0_a3: string;
  geou_dif: number;
  geounit: string;
  gu_a3: string;
  su_dif: number;
  subunit: string;
  su_a3: string;
  brk_diff: number;
  name: string;
  name_long: string;
  brk_a3: string;
  brk_name: string;
  brk_group: string | null;
  abbrev: string;
  postal: string;
  formal_en: string;
  formal_fr: string | null;
  note_adm0: string | null;
  note_brk: string | null;
  name_sort: string;
  name_alt: string | null;
  mapcolor7: number;
  mapcolor8: number;
  mapcolor9: number;
  mapcolor13: number;
  pop_est: number;
  gdp_md_est: number;
  pop_year: number;
  lastcensus: number;
  gdp_year: number;
  economy: string;
  income_grp: string;
  wikipedia: number;
  fips_10: string | null;
  iso_a2: string;
  iso_a3: string;
  iso_n3: string;
  un_a3: string;
  wb_a2: string;
  wb_a3: string;
  woe_id: number;
  adm0_a3_is: string;
  adm0_a3_us: string;
  adm0_a3_un: number;
  adm0_a3_wb: number;
  continent: string;
  region_un: string;
  subregion: string;
  region_wb: string;
  name_len: number;
  long_len: number;
  abbrev_len: number;
  tiny: number;
  homepart: number;
  featureclass: string;
  /** your added fill color for SVG export */
  colorKey: string;
};

export type NaturalEarthCountryFeature = Feature<
  Geometry,
  NaturalEarthGeoJSONProperties
>;

export type NaturalEarthCountryFeatureCollection = FeatureCollection<
  Geometry,
  NaturalEarthGeoJSONProperties
>;
