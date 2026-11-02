import PressAnalysts from "@/components/sections/features/press/PressAnalysts";
import PressContacts from "@/components/sections/features/press/PressContacts";
import PressReleases from "@/components/sections/features/press/PressReleases";
import SecondaryHero, {
  OverlayPressTFFFWatch,
} from "@/components/sections/hero/SecondaryHero";
import { Spacer } from "@/components/ui/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press · TFFF Watch",
  description: "Access press releases and contact us for press inquiries.",
};

export default function Page() {
  return (
    <div>
      <div>
        <SecondaryHero OverlayComponent={<OverlayPressTFFFWatch />} />
        <Spacer />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PressAnalysts />
          <PressContacts />
        </div>
        <Spacer />
        <PressReleases />
      </div>
    </div>
  );
}
