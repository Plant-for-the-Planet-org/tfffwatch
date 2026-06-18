import { api, urls } from "@/lib/http";
import { getCountryDetails } from "@/domain/country";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";
import type { CountryForestRecord } from "@/domain/forest-record.types";

export async function fetchForestCoverChangeDataV2({
  country,
  year,
  iso2 = "",
  source = "JRC",
}: {
  country?: string;
  year?: string;
  iso2?: string;
  source?: "GFW" | "JRC" | "MMU";
}) {
  const query: { [key: string]: string } = {};

  if (iso2) {
    query["country-iso2"] = iso2;
  } else if (country) {
    const { iso2 } = getCountryDetails({ country, slug: country });
    query["country-iso2"] = iso2;
  }

  // Add source parameter for dataset selection
  query["source"] = source;

  try {
    const _results = await api<CountryForestRecord[]>({
      url: urls.forestChange,
      query: query,
      method: "GET",
      token: "",
    });


    if (country && year) {
      // For specific country and year, still set the country data for charts
      _results.sort((a, b) => +a.year - +b.year);
      useForestCoverChangeData
        .getState()
        .setForestCoverChangeDataByCountry(_results);
    } else if (country) {
      _results.sort((a, b) => +a.year - +b.year);
      useForestCoverChangeData
        .getState()
        .setForestCoverChangeDataByCountry(_results);
    } else if (year) {
      useForestCoverChangeData
        .getState()
        .setForestCoverChangeDataByYear(_results);
    } else {
      useForestCoverChangeData.getState().setForestCoverChangeData(_results);
    }

    return _results;
  } catch (error) {
    console.error("Error fetching forest change data:", error);
  }
}
