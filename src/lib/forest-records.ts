import { api, urls } from "@/lib/http";
import { DEFAULT_DATASET, type DatasetType } from "@/domain/dataset";
import type { CountryForestRecord } from "@/domain/forest-record.types";

// Country forest records for one dataset, sorted by year.
//
// Uses the v2 endpoint: it is the only one that serves real MMU data
// (2020-2025). The older per-country endpoint (urls.forestChange) does not
// know "MMU" and silently returns GFW data. v2 ignores a country filter, so
// we fetch the full series and filter by ISO2 here.
export async function fetchCountryRecords({
  iso2,
  dataset = DEFAULT_DATASET,
  nextOptions,
}: {
  iso2: string;
  dataset?: DatasetType;
  nextOptions?: NextFetchRequestConfig;
}): Promise<CountryForestRecord[]> {
  const records = await api<CountryForestRecord[]>({
    url: urls.forestChangeAll,
    query: { source: dataset },
    method: "GET",
    token: "",
    nextOptions,
  });

  return (records ?? [])
    .filter((r) => !iso2 || r["country-iso2"] === iso2)
    .sort((a, b) => +a.year - +b.year);
}
