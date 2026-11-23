import InfoGrid from "@/components/sections/features/shared/InfoGrid";
import InvestmentTracker from "@/components/sections/features/investment/InvestmentTracker";
import PlansForThePlanetAnalysis from "@/components/sections/features/press/PlansForThePlanetAnalysis";
import RecentNews from "@/components/sections/features/news/RecentNews";
import RecentCommentary from "@/components/sections/features/policies/RecentCommentary";
import TFFFHero from "@/components/sections/features/tfff/TFFFHero";
import WhatsAppInvite from "@/components/sections/features/shared/WhatsAppInvite";
import { TFFFWorldMapView } from "@/components/sections/hero/TFFFMapView";
import { pageOpenGraph } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: pageOpenGraph("/"),
};

export default function Home() {
  return (
    <div>
      <TFFFHero />
      <div className="website-container">
        <InvestmentTracker />
        <div id="estimated-payouts">
          <TFFFWorldMapView />
        </div>
        <InfoGrid />
        <RecentNews />
        <RecentCommentary />
        <PlansForThePlanetAnalysis />
        <WhatsAppInvite />
      </div>
    </div>
  );
}
