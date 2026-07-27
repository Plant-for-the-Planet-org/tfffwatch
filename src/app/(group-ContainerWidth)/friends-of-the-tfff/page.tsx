import EngagingNGOs from "@/components/sections/features/EngagingNGOs";
import FriendsInGermany from "@/components/sections/features/FriendsInGermany";
import SecondaryHero, {
  OverlayFriendsOfTheTFFF,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function Page() {
  return (
    // <div className="extra-padding-x-4">
    <div>
      <SecondaryHero OverlayComponent={<OverlayFriendsOfTheTFFF />} />
      <Br />
      <EngagingNGOs />
      <Br />
      <FriendsInGermany />
      <Br />
    </div>
  );
}
