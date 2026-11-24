"use client";

import HeaderMenu from "@/components/HeaderMenu";
import Hr from "@/components/ui/Hr";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import HeaderCountry from "./HeaderCountry";
import HeaderLinks from "./HeaderLinks";
import { Spacer } from "@/components/ui/layout";
import LinkWithParams from "./ui/LinkWithParams";

// Pages whose hero image runs up behind the header. Used only for the first
// paint, so the header does not flash white before the hero is measured.
const HERO_PATHS = new Set([
  "/",
  "/the-tfff-explained",
  "/press",
  "/news",
  "/about-tfff-watch",
  "/friends-of-the-tfff",
  "/policy-papers-commentary",
]);

// Sticky header. While a hero (`[data-hero]`) is under it, the header has no
// background and shows white logos, so the hero image runs up behind it. Once
// the hero scrolls out, it gets its usual frosted white background.
export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(HERO_PATHS.has(pathname));

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    // Heroes pull themselves up by the header height (see .hero-under-header).
    const root = document.documentElement;
    const setHeight = () =>
      root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    setHeight();
    const resize = new ResizeObserver(setHeight);
    resize.observe(header);

    // Stay transparent only until the hero's text reaches the header, so the
    // header never sits on top of it. The text is `[data-hero-content]`, or
    // the hero's h1 (secondary heroes); without either, use the hero itself.
    const hero = document.querySelector("[data-hero]");
    const text =
      hero?.querySelector("[data-hero-content]") ?? hero?.querySelector("h1");
    const GAP = 8;
    const update = () => {
      if (!hero) return setOverHero(false);
      const limit = header.offsetHeight + GAP;
      setOverHero(
        text
          ? text.getBoundingClientRect().top > limit
          : hero.getBoundingClientRect().bottom > limit,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header
      ref={ref}
      className={twMerge(
        "sticky top-0 z-40 transition-[background-color,backdrop-filter] duration-200",
        overHero ? "bg-transparent text-white" : "bg-white/75 backdrop-blur-lg",
      )}
    >
      <Spacer className="h-3 md:h-2 xl:h-3" />
      <div className="website-container padding-x-3">
        <div className="flex justify-between items-center ">
          <Logo light={overHero} />
          {/* <div className="hidden md:flex justify-center">
            <HeaderCountry />
          </div> */}
          <div className="hidden lg:block">
            <HeaderLinks />
          </div>
          <div className="-mr-2 lg:hidden">
            <HeaderMenu light={overHero} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:hidden">
          <HeaderCountry />
        </div>
      </div>
      <Spacer className="h-3 md:h-2 xl:h-3" />
      <div className={twMerge(overHero && "invisible")}>
        <Hr />
      </div>
    </header>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div>
      <LinkWithParams href="/" preserveParams={["dataset"]}>
        <Image
          className=" h-[24px] w-[160px] lg:h-[48px] lg:w-[256px]"
          width={256}
          height={32}
          src={
            light
              ? "/assets/tfffwatch-header-logo-white.svg"
              : "/assets/tfffwatch-header-logo.svg"
          }
          alt="TFFF Watch"
        />
      </LinkWithParams>
    </div>
  );
}
