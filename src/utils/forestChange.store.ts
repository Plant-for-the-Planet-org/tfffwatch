import { fetchCountryRecords } from "@/lib/forest-records";
import { DatasetType, DEFAULT_DATASET } from "@/domain/dataset";
import { getCountryDetails } from "@/domain/country";
import { useForestCoverChangeData } from "@/stores/forest-cover.store";

export async function fetchForestCoverChangeDataV2({
  country,
  year,
  iso2 = "",
  source = DEFAULT_DATASET,
}: {
  country?: string;
  year?: string;
  iso2?: string;
  source?: DatasetType;
}) {
  const countryIso2 =
    iso2 ||
    (country ? getCountryDetails({ country, slug: country }).iso2 : "");

  try {
    const _results = await fetchCountryRecords({
      iso2: countryIso2,
      dataset: source,
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
