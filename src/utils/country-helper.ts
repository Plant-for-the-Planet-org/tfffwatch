import countries, { alpha2ToAlpha3 } from "i18n-iso-countries";
import { slugISO2 } from "./slug-iso2";
import type { CountryForestRecord } from "@/domain/forest-record.types";
import { classify } from "@/domain/eligibility";
// eslint-disable-next-line
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import countryMapping from "./country-mapping.json";
import type { CountryDetails } from "@/domain/country.types";

// Re-exported for existing importers; canonical definition lives in domain/.
export type { CountryDetails };

export function getCountryDetails({
  country = "",
  slug = "",
}: {
  country?: string;
  slug?: string;
}): CountryDetails {
  let iso2, iso3, name;

  const match = countryMapping.find((el) => el.countrySlug === slug);
  // console.log(match, country, slug);
  if (match) {
    iso2 = match.countryIso2;
    name = match.country;
    iso3 = alpha2ToAlpha3(iso2);
  } else {
    iso2 = countries.getAlpha2Code(country, "en");
    iso3 = countries.getAlpha3Code(country, "en");
    name = countries.getName(iso3!, "en", { select: "alias" });
  }
  const flagImgUrl = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`;

  const details = {
    iso2: iso2!,
    iso3: iso3!,
    name: name!,
    flagImgUrl,
  };

  return details;
}

export function getCountryDetailsBySlug(countrySlug: string): CountryDetails {
  countrySlug = countrySlug?.toLowerCase();
  const iso2 = slugISO2[countrySlug];
  const iso3 = alpha2ToAlpha3(iso2);
  const name = countries.getName(iso2!, "en", { select: "official" });
  const flagImgUrl = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`;

  const details = {
    iso2: iso2!,
    iso3: iso3!,
    name: name!,
    flagImgUrl,
  };

  return details;
}

type CountryForestData = {
  // [countryISO2: string]: number;
  [countryISO2: string]: {
    countrySlug: string;
    forestChange: number;
    eligibility?: string;
  };
};

export function transformAllForestCoverChangeData(data: CountryForestRecord[]) {
  return data.reduce((acc: CountryForestData, row) => {
    const countryISO2 = row["country-iso2"];
    const countrySlug = row["country-slug"];
    const percDef = row.percentage_deforested || 0;
    const percDeg = row.percentage_degraded || 0;

    const eligibility = classify(row);

    acc[countryISO2] = {
      countrySlug,
      forestChange: percDef + percDeg,
      eligibility,
    };
    return acc;
  }, {});
}

export interface EndorsementData {
  [key: string]: {
    countrySlug: string;
    hasEndorsed: boolean;
    hasInvested: boolean;
  };
}

export function transformEndorsementData(
  data: Array<{
    "country-iso2": string;
    "country-slug": string;
    has_endorsed: string;
    has_invested: string;
  }>
): EndorsementData {
  return data.reduce((acc: EndorsementData, row) => {
    const countryISO2 = row["country-iso2"];
    const countrySlug = row["country-slug"];
    const hasEndorsed = row.has_endorsed === "YES";
    const hasInvested = row.has_invested === "YES";

    acc[countryISO2] = {
      countrySlug,
      hasEndorsed,
      hasInvested,
    };
    return acc;
  }, {});
}
