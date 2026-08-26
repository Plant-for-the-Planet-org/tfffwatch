import { api, urls } from "@/lib/http";
import type { News } from "@/utils/types";

const REVALIDATE = 3600; // 1h

// Server fetcher for the news list. Callers keep their own sort/slice.
export function getNews() {
  return api<News[]>({
    url: urls.news,
    method: "GET",
    token: "",
    nextOptions: { revalidate: REVALIDATE },
  });
}
