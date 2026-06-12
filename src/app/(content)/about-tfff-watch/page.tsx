import AboutTFFFWatch from "@/components/sections/features/about/AboutTFFFWatch";
import SecondaryHero, {
  OverlayAboutTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TFFF Watch · Forever Starts Now",
  description:
    "How we use satellite data to model deforestation rates and estimate TFFF reward payments.",
};

export default function Page() {
  return (
    // <div className="extra-padding-x-4">
    <div>
      <SecondaryHero OverlayComponent={<OverlayAboutTFFFWatch />} />
      <Br />
      <AboutTFFFWatch />
    </div>
  );
}
