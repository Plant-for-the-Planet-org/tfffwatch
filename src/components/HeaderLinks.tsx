"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

export default function HeaderLinks() {
  const pathname = usePathname();

  const [options, setOptions] = useState([
    {
      id: 1,
      href: "/investment-tracker/Norway",
      label: "Investment Tracker",
      isActive: false,
    },
    {
      id: 2,
      href: "/#estimated-payouts",
      label: "Estimated Payouts",
      isActive: false,
    },
    {
      id: 3,
      href: "/the-tfff-explained",
      label: "TFFF Explained",
      isActive: false,
    },
    {
      id: 4,
      href: "https://plansfortheplanet.substack.com",
      label: "News",
      isActive: false,
      external: true,
    },
    { id: 5, href: "/about-tfff-watch", label: "About", isActive: false },
    { id: 6, href: "/press", label: "Press", isActive: false },
  ]);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const _options = structuredClone(optionsRef.current);
    _options.forEach((o) => {
      if (o.id === 1) {
        if (pathname.includes("investment-tracker")) {
          o.isActive = true;
        } else o.isActive = false;
      } else if (o.id === 2) {
        if (location.hash === "#estimated-payouts") {
          o.isActive = true;
        } else o.isActive = false;
      } else {
        if (pathname.includes(o.href)) {
          o.isActive = true;
        } else o.isActive = false;
      }
    });

    setOptions(_options);
  }, [pathname]);

  return (
    // Dark pill bar, shared with Cali Watch's header.
    <nav
      aria-label="Primary navigation"
      className="flex items-center gap-3 xl:gap-5 2xl:gap-6 whitespace-nowrap rounded-full bg-base-text/80 px-5 xl:px-7 py-3 text-sm font-semibold backdrop-blur-md"
    >
      {options.map((option) => (
        <Link
          key={option.id}
          href={option.href}
          target={option.external ? "_blank" : undefined}
          rel={option.external ? "noopener noreferrer" : undefined}
          aria-current={option.isActive ? "page" : undefined}
          className={twJoin(
            "rounded-md px-1 transition-colors text-white hover:text-white/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
            option.isActive && "underline underline-offset-6 decoration-2",
          )}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
