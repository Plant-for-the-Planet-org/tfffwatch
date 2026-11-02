import AllPolicies from "@/components/sections/features/policies/AllPolicies";
import SecondaryHero, {
  OverlayPoliciesTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import { Spacer } from "@/components/ui/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policy Papers & Commentary  · TFFF Watch",
  description:
    "Key policy briefs or open letters published about the Tropical Forest Forever Facility (TFFF)",
};

export default function Page() {
  return (
    <div>
      <div>
        <SecondaryHero OverlayComponent={<OverlayPoliciesTFFFWatch />} />
        <Spacer />
        <AllPolicies />
        <Spacer />
      </div>
    </div>
  );
}
