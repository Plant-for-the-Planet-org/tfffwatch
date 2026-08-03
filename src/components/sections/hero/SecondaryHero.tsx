import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  OverlayComponent: ReactNode;
};

export default function SecondaryHero(props: Props) {
  return (
    <div>
      <div className="outer-rounding overflow-hidden relative">
        {props.OverlayComponent}
        <Image
          className="w-full aspect-[3.5] lg:aspect-[4.5] object-bottom object-cover"
          width={1320}
          height={277}
          loading="lazy"
          decoding="async"
          // priority
          // fetchPriority="high"
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
