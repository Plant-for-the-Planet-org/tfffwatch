// Canonical country shapes.
// `CountryDetails` = the slug-less lookup result (from getCountryDetails).
// `Country` = CountryDetails plus the URL slug (formerly `CountryData`).
import type { Iso2, CountrySlug } from "./brand";

export interface CountryDetails {
  iso2: Iso2;
  iso3: string;
  name: string;
  flagImgUrl: string;
}

export interface Country extends CountryDetails {
  slug: CountrySlug;
}
