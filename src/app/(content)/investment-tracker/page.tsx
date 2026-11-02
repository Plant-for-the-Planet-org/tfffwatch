import { redirect } from "next/navigation";

export default function InvestmentTrackerPage() {
  // Redirect to Germany as the default country
  redirect("/investment-tracker/Norway");
}
