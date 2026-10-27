import { api, urls } from "@/lib/http";
import type { Policy } from "@/utils/types";

const REVALIDATE = 3600; // 1h

// Server fetcher for policy papers / commentary. Callers keep their own sort/slice.
export function getPolicyBriefs() {
  return api<Policy[]>({
    url: urls.policyBriefs,
    method: "GET",
    token: "",
    nextOptions: { revalidate: REVALIDATE },
  });
}
