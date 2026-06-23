import CountryListChips from "@/components/sections/features/CountryListChips";
import InvestmentProgress from "@/components/sections/features/InvestmentProgress";
import InvestmentTracker from "@/components/sections/features/InvestmentTracker";
import InvestmentTrackerContent from "@/components/sections/features/InvestmentTrackerContent";
import Br from "@/components/ui/Br";
import { api, urls } from "@/utils/axios-helper";
import { PageError } from "@/utils/errors";
import {
  InvestmentTrackerCapitals,
  InvestmentTrackerForCountry,
} from "@/utils/types";
import { Metadata } from "next";
import { capitalize } from "underscore.string";

const investingCountries = [
  "Germany",
  "Norway",
  "France",
  "UK",
  "UAE",
  // "Singapore",
  "EU",
  "Brazil",
  "China",
  "Indonesia",
  "Portugal",
  "Netherlands",
  "Luxembourg",
  /* "Asian_Infrastructure_Investment_Bank", */ "AIIB",
  /* "European_Bank_for_Reconstruction_and_Development", */ "EBRD",
  "Minderoo_Foundation",
  "The_Nature_Conservancy",
  // "Philanthropies",
  "Others",
];

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
  // console.log("METADATA: ", { countryContentInMetadata });

  return {
    title: `${countryContentInMetadata} Investment Tracker · TFFF Watch`,
    description: `Is ${countryContentInMetadata} contributing to the Tropical Forest Forever Facility?`,
  };
}

export default async function Page({ params }: PageProps) {
  const { country } = await params;
  console.log(`[page.tsx] Country: ${country}`);

  console.log(
    investingCountries.map((el) => el.toLowerCase()),
    country.toLowerCase(),
  );

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
    console.log(`[page.tsx] Fetched Rich Data for ${country}`);

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
  return (
    <div>
      <div>
        <InvestmentTracker />
        <Br />
        <CountryListChips country={country} capitalsData={capitalsData} />
        <Br />
        {country === investingCountries.at(-1) ? (
          <></>
        ) : (
          <>
            <InvestmentProgress investment_stage={richData.investment_stage} />
            <Br />
          </>
        )}
        <InvestmentTrackerContent
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
        <Br />
      </div>
    </div>
  );
}
