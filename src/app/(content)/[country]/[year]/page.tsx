import {
  countryPagePath,
  DATASET_LATEST_YEAR,
  DatasetType,
  DEFAULT_DATASET,
  DATASET_MIN_YEAR,
} from "@/domain/dataset";
import AnnualPayout from "@/components/sections/features/forest-cover/AnnualPayout";
import CountrySingnatories from "@/components/sections/features/endorsement/CountrySignatories";
import CountryPayoutSummary from "@/components/sections/features/forest-cover/CountryPayoutSummary";
import ForestCoverChange from "@/components/sections/features/forest-cover/ForestCoverChange";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import { Spacer } from "@/components/ui/layout";
import {
  findCountryBySlug,
  getCountryDetails,
  getEndorsementData,
  isSignatoryCountry,
} from "@/domain/country";
import JsonLd from "@/lib/json-ld";
import {
  buildBreadcrumbSchema,
  buildPayoutDatasetSchema,
} from "@/lib/structured-data";
import { pageOpenGraph } from "@/lib/metadata";
import { Metadata } from "next";
import { permanentRedirect, redirect } from "next/navigation";
import { humanize } from "underscore.string";

export type PageParams = {
  country: string;
  year: string;
};

type PageProps = {
  params: Promise<PageParams>;
  searchParams: Promise<{ dataset?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country: rawCountry, year } = await params;
  const country = findCountryBySlug(rawCountry)?.countrySlug ?? rawCountry;

  return {
    title: `${humanize(country)} · TFFF Watch`,
    description: `How much would ${humanize(country)} receive from the TFFF?`,
    alternates: {
      canonical: countryPagePath(country, year),
    },
    openGraph: pageOpenGraph(countryPagePath(country, year)),
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { country, year } = await params;
  const { dataset } = await searchParams;
  const slug = country;

  // Years outside the picker range (e.g. an old /brazil/2021 link) go to the
  // latest year, so the URL, picker and figures all match.
  const yearNum = Number(year);
  const validYear =
    Number.isInteger(yearNum) &&
    yearNum >= DATASET_MIN_YEAR &&
    yearNum <= DATASET_LATEST_YEAR
      ? year
      : String(DATASET_LATEST_YEAR);

  // Send name or alias slugs (e.g. /kingdom-of-eswatini) to the canonical slug.
  const canonicalSlug = findCountryBySlug(country)?.countrySlug;
  if (canonicalSlug && canonicalSlug !== country) {
    permanentRedirect(countryPagePath(canonicalSlug, validYear));
  }

  // Single dataset mode (MMU). A missing or old ?dataset value (e.g. JRC, GFW)
  // is sent to ?dataset=MMU so the URL always says which data is shown.
  // One redirect fixes both the year and the dataset.
  if (dataset !== DEFAULT_DATASET || validYear !== year) {
    redirect(countryPagePath(country, validYear));
  }

  const details = getCountryDetails({ country, slug });

  const validDataset: DatasetType = DEFAULT_DATASET;

  let isSignatory: boolean | null = null;
  try {
    const endorsementData = await getEndorsementData();
    isSignatory = isSignatoryCountry(endorsementData, details.iso2);
  } catch (error) {
    console.error("Error fetching endorsement data:", error);
  }

  const path = countryPagePath(country, year);
  const datasetSchema = buildPayoutDatasetSchema({
    countryName: details.name,
    year,
    dataset: validDataset,
    path,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `${details.name} · TFFF Payout Estimate`, path },
  ]);

  return (
    <div>
      <JsonLd data={[datasetSchema, breadcrumbSchema]} />
      <h1 className="sr-only">{details.name} · TFFF Payout Estimate</h1>
      <CountryPayoutSummary
        countryName={details.name}
        iso2={details.iso2}
        year={year}
        dataset={validDataset}
      />
      <TFFFCountryMapView
        year={year}
        name={details.name}
        iso2={details.iso2}
        iso3={details.iso3}
        flagImgUrl={details.flagImgUrl}
        dataset={validDataset}
      />
      <Spacer />
      <ForestCoverChange />
      <Spacer />
      <AnnualPayout />
      {isSignatory !== null && (
        <>
          <Spacer />
          <CountrySingnatories isSignatory={isSignatory} />
        </>
      )}
    </div>
  );
}
