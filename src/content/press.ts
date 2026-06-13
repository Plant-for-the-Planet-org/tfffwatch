import { api, urls } from "@/lib/http";
import type { PressRelease } from "@/utils/types";

const REVALIDATE = 3600; // 1h

// Server fetcher for press releases. Callers keep their own sort/slice.
export function getPressReleases() {
  return api<PressRelease[]>({
    url: urls.pressReleases,
    method: "GET",
    token: "",
    nextOptions: { revalidate: REVALIDATE },
  });
}
