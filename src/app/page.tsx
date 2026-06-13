import InfoGrid from "@/components/sections/features/shared/InfoGrid";
import InvestmentTracker from "@/components/sections/features/investment/InvestmentTracker";
import PlansForThePlanetAnalysis from "@/components/sections/features/press/PlansForThePlanetAnalysis";
import RecentNews from "@/components/sections/features/news/RecentNews";
import RecentCommentary from "@/components/sections/features/policies/RecentCommentary";
import TFFFHero from "@/components/sections/features/tfff/TFFFHero";
import WhatsAppInvite from "@/components/sections/features/shared/WhatsAppInvite";
import { TFFFWorldMapView } from "@/components/sections/hero/TFFFMapView";
import Br from "@/components/ui/Br";

export default function Home() {
  return (
    <div>
      <TFFFHero />
      <div className="website-container">
        <Br />
        <InvestmentTracker />
        <Br />
        <div id="estimated-payouts">
          <TFFFWorldMapView />
        </div>
        <Br />
        <InfoGrid />
        <Br />
        <RecentNews />
        <Br />
        <RecentCommentary />
        <Br />
        <PlansForThePlanetAnalysis />
        <Br />
        <WhatsAppInvite />
      </div>
    </div>
  );
}
