import { redirect } from "next/navigation";

// Default country the bare /investment-tracker route lands on.
// Norway is used as it is a confirmed TFFF contributor.
const DEFAULT_TRACKER_COUNTRY = "Norway";

export default function InvestmentTrackerPage() {
  redirect(`/investment-tracker/${DEFAULT_TRACKER_COUNTRY}`);
}
