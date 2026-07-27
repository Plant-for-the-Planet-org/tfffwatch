import { DatasetType } from "@/components/maps/shared/types";
import AnnualPayout from "@/components/sections/features/forest-cover/AnnualPayout";
import CountrySingnatories from "@/components/sections/features/endorsement/CountrySignatories";
import ForestCoverChange from "@/components/sections/features/forest-cover/ForestCoverChange";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import { Spacer } from "@/components/ui/layout";
import { getCountryDetails } from "@/domain/country";
import JsonLd from "@/lib/json-ld";
import {
  buildBreadcrumbSchema,
  buildPayoutDatasetSchema,
} from "@/lib/structured-data";
import { Metadata } from "next";
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
  const { country, year } = await params;

  return {
    title: `${humanize(country)} · TFFF Watch`,
    description: `How much would ${humanize(country)} receive from the TFFF?`,
    alternates: {
      canonical: `/${country}/${year}`,
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { country, year } = await params;
  const { dataset } = await searchParams;
  const slug = country;

  const details = getCountryDetails({ country, slug });

  // Validate dataset parameter - default to JRC if not specified or invalid
  const validDataset: DatasetType = dataset === "GFW" ? "GFW" : "JRC";

  const path = `/${country}/${year}`;
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
      <Spacer />
      <CountrySingnatories />
    </div>
  );
}
