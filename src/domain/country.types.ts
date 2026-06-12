// Canonical country shapes.
// `CountryDetails` = the slug-less lookup result (from getCountryDetails).
// `Country` = CountryDetails plus the URL slug (formerly `CountryData`).
export interface CountryDetails {
  iso2: string;
  iso3: string;
  name: string;
  flagImgUrl: string;
}

export interface Country extends CountryDetails {
  slug: string;
}
