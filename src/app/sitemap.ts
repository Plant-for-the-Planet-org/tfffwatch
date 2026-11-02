import countryMapping from "@/domain/country-mapping.json";
import { investingCountries } from "@/domain/investing-countries";
import type { MetadataRoute } from "next";

const BASE_URL = "https://tfffwatch.org";

// Indexable static routes (excludes the /investment-tracker index, which
// redirects, and the noindex /friends-of-the-tfff page).
const STATIC_ROUTES = [
  "",
  "/the-tfff-explained",
  "/news",
  "/press",
  "/about-tfff-watch",
  "/policy-papers-commentary",
];

// Payout pages are listed for the latest data year only: it is the year the
// site opens on (see the map store default and YearSelect), and older years
// are the same page with older figures. Bump this when a new year of data lands.
const PAYOUT_SITEMAP_YEAR = "2024";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));

  const trackerEntries: MetadataRoute.Sitemap = investingCountries.map(
    (country) => ({
      url: `${BASE_URL}/investment-tracker/${country}`,
      lastModified,
    })
  );

  // Same slug list the /[country]/[year] route resolves against.
  const payoutEntries: MetadataRoute.Sitemap = countryMapping.map(
    ({ countrySlug }) => ({
      url: `${BASE_URL}/${countrySlug}/${PAYOUT_SITEMAP_YEAR}`,
      lastModified,
    })
  );

  return [...staticEntries, ...trackerEntries, ...payoutEntries];
}
