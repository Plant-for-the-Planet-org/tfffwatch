import HowTFFFWorks from "@/components/sections/features/tfff/HowTFFFWorks";
import InterestedInDivingDeeper from "@/components/sections/features/tfff/InterestedInDivingDeeper";
import SecondaryHero, {
  OverlayTheTFFFIdea,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TFFF Explained · TFFF Watch",
  description: "How does the Tropical Forest Forever Facility work?",
};

export default function Page() {
  return (
    <div>
      {/* <div className="extra-padding-x-4"> */}
      <div>
        <SecondaryHero OverlayComponent={<OverlayTheTFFFIdea />} />
        <Br />
        <HowTFFFWorks />
        <Br />
        <InterestedInDivingDeeper />
      </div>
    </div>
  );
}
