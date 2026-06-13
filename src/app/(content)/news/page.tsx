import AllNews from "@/components/sections/features/news/AllNews";
import SecondaryHero, {
  OverlayNewsTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import { Spacer } from "@/components/ui/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News · TFFF Watch",
  description:
    "Key news articles published about the Tropical Forest Forever Facility (TFFF)",
};

export default function Page() {
  return (
    <div>
      <div>
        <SecondaryHero OverlayComponent={<OverlayNewsTFFFWatch />} />
        <Spacer />
        <AllNews />
        <Spacer />
      </div>
    </div>
  );
}
