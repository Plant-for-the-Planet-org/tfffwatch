import EngagingNGOs from "@/components/sections/features/partners/EngagingNGOs";
import FriendsInGermany from "@/components/sections/features/partners/FriendsInGermany";
import SecondaryHero, {
  OverlayFriendsOfTheTFFF,
} from "@/components/sections/hero/SecondaryHero";
import Br from "@/components/ui/Br";

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
