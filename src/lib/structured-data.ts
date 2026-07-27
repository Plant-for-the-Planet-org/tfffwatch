// Site-level JSON-LD, built only from facts already present in the codebase
// (name/domain/logo from the header + metadata; Plant-for-the-Planet as the
// operator, already stated in the footer and About page).
// No `sameAs` (no social profiles exist) and no `SearchAction` (no site search).
import type { News } from "@/utils/types";

const SITE_URL = "https://tfffwatch.org";
const SITE_NAME = "TFFF Watch";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/tfffwatch-header-logo.svg`,
      description:
        "We track investment negotiations and use satellite analysis to show how much rainforest countries would receive from the TFFF.",
      parentOrganization: {
        "@type": "Organization",
        name: "Plant-for-the-Planet",
        url: "https://www.plant-for-the-planet.org",
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

// ---------------------------------------------------------------------------
// Content-level schema builders (Phase 4). All values are derived from route
// params or existing data — no invented facts. `license` is deliberately never
// set, as no dataset license is stated anywhere on the site.
// ---------------------------------------------------------------------------

const CREATOR_REF = { "@id": ORGANIZATION_ID };

// Public raw-data export linked from the About page.
const DATA_ACCESS_URL =
  "https://docs.google.com/spreadsheets/d/13MUmpCrbldgWTlNRIvq58N3O721_ufP7rTyNxX1V0Vk/edit?gid=1842175288#gid=1842175288";

// Source datasets/methods, taken verbatim from the About page's methodology.
const DATASET_SOURCES = [
  {
    name: "Hansen / Global Forest Watch (GFW) Tree Cover dataset",
    url: "https://www.science.org/doi/10.1126/science.1244693",
  },
  {
    name: "Ecoregions (Dinerstein et al., 2017)",
    url: "https://academic.oup.com/bioscience/article/67/6/534/3102935",
  },
  {
    name: "Fire-related tree cover loss (Tyukavina et al.)",
    url: "https://www.frontiersin.org/journals/remote-sensing/articles/10.3389/frsen.2022.825190/full",
  },
  {
    name: "JRC Tropical Moist Forest (Vancutsem et al., 2021)",
    url: "https://www.science.org/doi/10.1126/sciadv.abe1603",
  },
].map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url }));

// The measured properties of the forest/payout record (names only — the values
// are fetched at request time and rendered in the page's charts).
const PAYOUT_VARIABLES = [
  "Intact forest (ha)",
  "Base reward (USD)",
  "Deforested area (ha)",
  "Deforestation deduction (USD)",
  "Degraded forest (ha)",
  "Degradation deduction (USD)",
  "Reward after deductions (USD)",
  "IPLC reward (USD)",
  "Percentage deforested",
  "Percentage degraded",
];

export function buildPayoutDatasetSchema({
  countryName,
  year,
  dataset,
  path,
}: {
  countryName: string;
  year: string;
  dataset: "GFW" | "JRC";
  path: string;
}) {
  const datasetLabel =
    dataset === "GFW"
      ? "Tree cover loss estimate (GFW-based)"
      : "Standard estimate (JRC + GFW-based)";

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `TFFF payout estimate for ${countryName} (${year}, ${datasetLabel})`,
    description: `Estimated Tropical Forest Forever Facility (TFFF) reward for ${countryName} in ${year}, derived from satellite deforestation and degradation analysis using the ${datasetLabel}.`,
    url: `${SITE_URL}${path}`,
    isAccessibleForFree: true,
    creator: CREATOR_REF,
    temporalCoverage: String(year),
    spatialCoverage: countryName,
    variableMeasured: PAYOUT_VARIABLES,
    isBasedOn: DATASET_SOURCES,
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: DATA_ACCESS_URL,
    },
  };
}

export function buildTrackerDatasetSchema({
  countryName,
  path,
}: {
  countryName: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `TFFF sponsor capital tracker — ${countryName}`,
    description: `Tracked sponsor-capital pledges and investments into the Tropical Forest Forever Facility (TFFF) attributed to ${countryName}.`,
    url: `${SITE_URL}${path}`,
    isAccessibleForFree: true,
    creator: CREATOR_REF,
    variableMeasured: [
      "Pledged sponsor capital (USD)",
      "Invested sponsor capital (USD)",
      "Investment stage",
    ],
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: DATA_ACCESS_URL,
    },
  };
}

export function buildBreadcrumbSchema(
  crumbs: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

// Accepts the site's `DD.MM.YYYY` (or `DD/MM/YYYY`) news dates and returns a
// date-only ISO string, or undefined if it can't be parsed confidently.
function toIsoDate(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const parts = raw.split(/[./-]/).map((p) => p.trim());
  if (parts.length !== 3) return undefined;
  const [dd, mm, yyyy] = parts;
  if (!/^\d{4}$/.test(yyyy) || !/^\d{1,2}$/.test(dd) || !/^\d{1,2}$/.test(mm)) {
    return undefined;
  }
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

export function buildNewsListSchema(items: News[]) {
  const articles = items
    .map((item) => {
      if (!item.title || !item.url) return null;
      const article: Record<string, unknown> = {
        "@type": "NewsArticle",
        headline: item.title,
        url: item.url,
        mainEntityOfPage: item.url,
      };
      const datePublished = toIsoDate(item.date);
      if (datePublished) article.datePublished = datePublished;
      if (item.publisher) {
        article.publisher = { "@type": "Organization", name: item.publisher };
      }
      if (item.author) {
        article.author = { "@type": "Person", name: item.author };
      }
      if (item.featured_image) article.image = item.featured_image;
      return article;
    })
    .filter((a): a is Record<string, unknown> => a !== null);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: article,
    })),
  };
}
