"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import LinkWithParams from "./ui/LinkWithParams";

export default function HeaderMenu() {
  const [customOpen, setCustomOpen] = useState(false);
  const [options] = useState([
    { id: 0, href: "/", label: "Home" },
    { id: 1, href: "the-tfff-explained", label: "The TFFF, Explained" },
    // { id: 2, href: "investment-tracker", label: "Investment Tracker" },
    { id: 2, href: "investment-tracker/Norway", label: "Investment Tracker" },
    // { id: 3, href: "friends-of-the-tfff", label: "Friends of the TFFF" },
    {
      id: 4,
      external: true,
      href: "https://plansfortheplanet.substack.com",
      label: "News",
    },
    { id: 5, href: "about-tfff-watch", label: "About TFFF Watch" },
    { id: 6, href: "press", label: "Press" },
  ]);

  return (
    <Menu as={"div"} className={"p-2 lg:p-4 flex items-center"}>
      {({ close }) => (
        <>
          <MenuButton
            as="button"
            className="cursor-pointer outline-none"
            onClick={() => {
              setCustomOpen(!customOpen);
            }}
          >
            <Image
              className="w-[24px] h-[24px]"
              width={32}
              height={32}
              src="/assets/menu.svg"
              alt="TFFF Watch"
            />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="z-40 p-5 md:p-7 xl:p-9 bg-white divide-y divide-base-gray font-semibold shadow-custom rounding-xl outline-none"
          >
            {options.map((el, key) => (
              <MenuItem key={el.id} as="div">
                <LinkWithParams
                  href={el?.external ? el?.href : `/${el.href}`}
                  className={twMerge(
                    "block w-full typo-p py-4",
                    key === 0 && "pt-0",
                    key === options.length - 1 && "pb-0",
                  )}
                  preserveParams={["dataset"]}
                  onClick={() => {
                    close();
                  }}
                  target={el?.external ? "_blank" : undefined}
                  rel={el?.external ? "noopener noreferrer" : undefined}
                >
                  <span>{el.label}</span>
                </LinkWithParams>
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
