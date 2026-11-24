import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  OverlayComponent: ReactNode;
};

export default function SecondaryHero(props: Props) {
  return (
    // Full-bleed band that runs up behind the sticky header, as on the home
    // page. It breaks out of the page container to the viewport width.
    <div data-hero className="hero-under-header w-screen ml-[calc(50%-50vw)]">
      <div className="relative overflow-hidden">
        {/* Darkens the top so the white header logo and menu read on the image. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[1] h-32 pointer-events-none bg-gradient-to-b from-black/40 to-transparent"
        />
        {/* Title area starts below the header, so it centres on the visible art. */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2]"
          style={{ top: "var(--header-h)" }}
        >
          {props.OverlayComponent}
        </div>
        <Image
          className="w-full min-h-56 aspect-[3] lg:aspect-[4] object-bottom object-cover"
          width={1320}
          height={277}
          // Top of the page and behind the header: load it first (LCP).
          priority
          src="/assets/secondary-hero.webp"
          alt="The TFFF Idea"
        />
      </div>
    </div>
  );
}

export function OverlayTheTFFFIdea() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="font-bold text-white typo-h1">The TFFF, Explained</h1>
    </div>
  );
}

export function OverlayFriendsOfTheTFFF() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="font-bold text-white typo-h1">Friends of the TFFF</h1>
    </div>
  );
}

export function OverlayAboutTFFFWatch() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="font-bold text-white typo-h1">About TFFF Watch</h1>
    </div>
  );
}

export function OverlayPressTFFFWatch() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="font-bold text-white typo-h1">Press</h1>
    </div>
  );
}
export function OverlayNewsTFFFWatch() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="font-bold text-white typo-h1">TFFF News</h1>
    </div>
  );
}
export function OverlayPoliciesTFFFWatch() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="font-bold text-white typo-h1">
        Policy Papers & Commentary
      </h1>
    </div>
  );
}
