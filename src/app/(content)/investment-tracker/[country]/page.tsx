import CountryListChips from "@/components/sections/features/investment/CountryListChips";
import InvestmentProgress from "@/components/sections/features/investment/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/investment/InvestmentTracker";
import TrackerContent from "@/components/sections/features/investment/TrackerContent";
import { Spacer } from "@/components/ui/layout";
import { api, urls } from "@/lib/http";
import { PageError } from "@/utils/errors";
import {
  InvestmentTrackerCapitals,
  InvestmentTrackerForCountry,
} from "@/utils/types";
import { investingCountries } from "@/domain/investing-countries";
import JsonLd from "@/lib/json-ld";
import {
  buildBreadcrumbSchema,
  buildTrackerDatasetSchema,
} from "@/lib/structured-data";
import { Metadata } from "next";
import { capitalize } from "underscore.string";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  return investingCountries.map((el) => ({ country: el }));
}

type PageProps = {
  params: Promise<{
    country: string;
  }>;
};

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } = await params;

  const countryContentInMetadata = capitalize(country);
  // countryContentInMetadata = countryContentInMetadata.replaceAll("_", " ");

  return {
    title: `${countryContentInMetadata} Investment Tracker · TFFF Watch`,
    description: `Is ${countryContentInMetadata} contributing to the Tropical Forest Forever Facility?`,
    alternates: {
      canonical: `/investment-tracker/${country}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { country } = await params;

  if (
    !investingCountries.find((el) => el.toLowerCase() === country.toLowerCase())
  ) {
    const err = `We do not have investment data for ${country}. The data might not be available yet, or the country hasn’t been included in
the current analysis.`;
    throw new PageError("Country data not found", {
      code: "404",
      details: err,
    });
  }

  let capitalsData: InvestmentTrackerCapitals[] = [];
  let richData: InvestmentTrackerForCountry | null = null;

  try {
    // const countryQueryValue = country.replaceAll("_", " ");

    const res = await api<InvestmentTrackerForCountry[]>({
      url: urls.investmentTrackerRich,
      query: { country: country },
      method: "GET",
      token: "",
      nextOptions: { revalidate: 1800 }, // same 30 min window
    });
    richData = res[0];

    const capitalsDataResults = await api<InvestmentTrackerForCountry[]>({
      url: urls.investmentTrackerCapitals,
      method: "GET",
      token: "",
    });
    capitalsData = capitalsDataResults;
  } catch (error) {
    console.error("Error fetching Investments:", error);
  }

  if (!richData) return null;

  const countryName = capitalize(country);
  const path = `/investment-tracker/${country}`;
  const datasetSchema = buildTrackerDatasetSchema({ countryName, path });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Investment Tracker", path: "/investment-tracker" },
    { name: countryName, path },
  ]);

  return (
    <div>
      <JsonLd data={[datasetSchema, breadcrumbSchema]} />
      <div>
        <h1 className="sr-only">
          {capitalize(country)} Investment Tracker
        </h1>
        <InvestmentTracker />
        <Spacer />
        <CountryListChips country={country} capitalsData={capitalsData} />
        <Spacer />
        {country === investingCountries.at(-1) ? (
          <></>
        ) : (
          <>
            <InvestmentProgress investment_stage={richData.investment_stage} />
            <Spacer />
          </>
        )}
        <TrackerContent
          last_updated={richData?.last_updated}
          status={richData?.status ?? ""}
          background={richData?.background ?? ""}
          endorsements={richData?.endorsements ?? ""}
          CSOs={richData?.CSOs ?? ""}
          how_an_investment_could_work={
            richData?.How_an_investment_could_work ?? ""
          }
          responsibile_government_office={
            richData?.responsibile_government_office ?? ""
          }
        />
        <Spacer />
      </div>
    </div>
  );
}
