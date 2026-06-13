"use client";

import { PageParams } from "@/app/(content)/[country]/[year]/page";
import { Spacer } from "@/components/ui/layout";
import { getCountryDetails } from "@/domain/country";
import { useParams } from "next/navigation";
import AnnualPayoutAreaChart from "../../charts/AnnualPayoutAreaChart";

export default function AnnualPayout() {
  const { country }: PageParams = useParams();
  const details = getCountryDetails({ country });

  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <Spacer />
      <div className="text-center">
        <h2 className="typo-h2">
          <b>Annual Payout for {details.name}</b>
        </h2>
        <p className="typo-p">
          <i>if TFFF already existed (in USD)</i>
        </p>
      </div>
      <Spacer />
      <AnnualPayoutAreaChart />
      <Spacer />
    </div>
  );
}
