import countryMapping from "./country-mapping.json";

export type SearchableCountry = {
  name: string;
  slug: string;
  iso2: string;
  flagImgUrl: string;
  // Lowercase, accent-free name and aliases used for matching.
  keys: string[];
};

type CountryMappingEntry = {
  country: string;
  countrySlug: string;
  countryIso2: string;
  aliases?: string[];
};

// Lowercase, strip accents, and turn dashes into spaces so "cote d'ivoire",
// "Côte d'Ivoire" and "cote-divoire" all compare the same way.
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .trim();
}

export const searchableCountries: SearchableCountry[] = (
  countryMapping as CountryMappingEntry[]
)
  .map((el) => ({
    name: el.country,
    slug: el.countrySlug,
    iso2: el.countryIso2,
    flagImgUrl: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${el.countryIso2}.svg`,
    keys: [el.country, el.countrySlug, ...(el.aliases ?? [])].map(normalize),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Prefix matches (on the name or any word in it) come before plain
// substring matches. An empty query returns the full A-Z list.
export function searchCountries(query: string): SearchableCountry[] {
  const q = normalize(query);
  if (!q) return searchableCountries;

  const prefix: SearchableCountry[] = [];
  const contains: SearchableCountry[] = [];

  for (const country of searchableCountries) {
    const startsWith = country.keys.some(
      (key) => key.startsWith(q) || key.split(" ").some((w) => w.startsWith(q)),
    );
    if (startsWith) prefix.push(country);
    else if (country.keys.some((key) => key.includes(q)))
      contains.push(country);
  }

  return [...prefix, ...contains];
}
