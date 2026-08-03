import { investingCountries } from "@/domain/investing-countries";
import type { MetadataRoute } from "next";

const BASE_URL = "https://tfffwatch.org";

// Static routes served by the app (excludes the /investment-tracker index,
// which redirects, and the dynamic /[country]/[year] payout pages, whose year
// values are not enumerable at build time).
const STATIC_ROUTES = [
  "",
  "/the-tfff-explained",
  "/news",
  "/press",
  "/about-tfff-watch",
  "/policy-papers-commentary",
  "/friends-of-the-tfff",
  "/investment-tracker",
];

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

  return [...staticEntries, ...trackerEntries];
}
