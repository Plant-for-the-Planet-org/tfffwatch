import EngagingNGOs from "@/components/sections/features/partners/EngagingNGOs";
import FriendsInGermany from "@/components/sections/features/partners/FriendsInGermany";
import SecondaryHero, {
  OverlayFriendsOfTheTFFF,
} from "@/components/sections/hero/SecondaryHero";
import { Spacer } from "@/components/ui/layout";

export default function Page() {
  return (
    // <div className="extra-padding-x-4">
    <div>
      <SecondaryHero OverlayComponent={<OverlayFriendsOfTheTFFF />} />
      <Spacer />
      <EngagingNGOs />
      <Spacer />
      <FriendsInGermany />
      <Spacer />
    </div>
  );
}
