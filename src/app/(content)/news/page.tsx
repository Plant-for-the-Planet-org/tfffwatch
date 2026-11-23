import AllNews from "@/components/sections/features/news/AllNews";
import SecondaryHero, {
  OverlayNewsTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import { pageOpenGraph } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News · TFFF Watch",
  description:
    "Key news articles published about the Tropical Forest Forever Facility (TFFF)",
  alternates: {
    canonical: "/news",
  },
  openGraph: pageOpenGraph("/news"),
};

export default function Page() {
  return (
    <div>
      <div>
        <SecondaryHero OverlayComponent={<OverlayNewsTFFFWatch />} />
        <AllNews />
      </div>
    </div>
  );
}
