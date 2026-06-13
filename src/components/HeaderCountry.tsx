"use client";

import { getCountryDetails } from "@/domain/country";
import { useParams, usePathname } from "next/navigation";
import Br from "./ui/Br";

export type PageParams = {
  country: string;
  year: string;
};

export default function HeaderCountry() {
  const pathname = usePathname();
  const params: PageParams = useParams();
  const { country } = params;

  const details = getCountryDetails({ country, slug: country });

  if (pathname.includes("/investment-tracker")) return null;
  if (!country) return null;
  return (
    <div>
      <Br />
      <p className="flex gap-2 items-center">
        <img className="w-6 h-4 p-0.5" alt="" src={details.flagImgUrl} />
        <b>{details.name}</b>
      </p>
    </div>
  );
}
