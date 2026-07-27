import InfoGrid from "@/components/sections/features/shared/InfoGrid";
import InvestmentTracker from "@/components/sections/features/investment/InvestmentTracker";
import PlansForThePlanetAnalysis from "@/components/sections/features/press/PlansForThePlanetAnalysis";
import RecentNews from "@/components/sections/features/news/RecentNews";
import RecentCommentary from "@/components/sections/features/policies/RecentCommentary";
import TFFFHero from "@/components/sections/features/tfff/TFFFHero";
import WhatsAppInvite from "@/components/sections/features/shared/WhatsAppInvite";
import { TFFFWorldMapView } from "@/components/sections/hero/TFFFMapView";
import { Spacer } from "@/components/ui/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "TFFF Watch",
    url: "/",
  },
};

export default function Home() {
  return (
    <div>
      <TFFFHero />
      <div className="website-container">
        <Spacer />
        <InvestmentTracker />
        <Spacer />
        <div id="estimated-payouts">
          <TFFFWorldMapView />
        </div>
        <Spacer />
        <InfoGrid />
        <Spacer />
        <RecentNews />
        <Spacer />
        <RecentCommentary />
        <Spacer />
        <PlansForThePlanetAnalysis />
        <Spacer />
        <WhatsAppInvite />
      </div>
    </div>
  );
}
