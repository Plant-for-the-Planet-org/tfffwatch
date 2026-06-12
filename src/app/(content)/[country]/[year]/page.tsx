import { DatasetType } from "@/components/maps/shared/types";
import AnnualPayout from "@/components/sections/features/forest-cover/AnnualPayout";
import CountrySingnatories from "@/components/sections/features/endorsement/CountrySignatories";
import ForestCoverChange from "@/components/sections/features/forest-cover/ForestCoverChange";
import { TFFFCountryMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";
import { getCountryDetails } from "@/utils/country-helper";
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
  const { country } = await params;

  return {
    title: `${humanize(country)} · TFFF Watch`,
    description: `How much would ${humanize(country)} receive from the TFFF?`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { country, year } = await params;
  const { dataset } = await searchParams;
  const slug = country;

  const details = getCountryDetails({ country, slug });

  // Validate dataset parameter - default to JRC if not specified or invalid
  const validDataset: DatasetType = dataset === "GFW" ? "GFW" : "JRC";

  return (
    <div>
      <TFFFCountryMapView
        year={year}
        name={details.name}
        iso2={details.iso2}
        iso3={details.iso3}
        flagImgUrl={details.flagImgUrl}
        dataset={validDataset}
      />
      <Br />
      <ForestCoverChange />
      {/* <Br /> */}
      {/* <PotentialPayoutVsExistingConservationFunding /> */}
      <Br />
      <AnnualPayout />
      <Br />
      <CountrySingnatories />
    </div>
  );
}
