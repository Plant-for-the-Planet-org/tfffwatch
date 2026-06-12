"use client";

import InvestmentGaugeChart from "@/components/sections/charts/InvestmentGaugeChart";
import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import { api, urls } from "@/utils/axios-helper";
import { InvestmentTrackerCapitals } from "@/utils/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvestmentTracker() {
  const [chartData, setChartData] = useState<InvestmentTrackerCapitals[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await api<InvestmentTrackerCapitals[]>({
          url: urls.investmentTrackerCapitals,
          method: "GET",
          token: "",
        });

        if (result.length) {
          setChartData([...result]);
        }
      } catch (error) {
        console.error("Error fetching investment sums:", error);
      }
    })();
  }, []);

  return (
    <div className="bg-secondary-light outer-rounding outer-padding-3">
      <Br />
      <div className="grid lg:grid-cols-2">
        <div className="mx-auto flex flex-col items-center lg:block extra-padding-x-4">
          <ConditionalPadding />
          <h2 className="font-bold typo-h2">Investment Tracker</h2>
          <Br />
          <p className="typo-p">
            The TFFF requires $25 billion in sponsor capital from governments
            and foundations. It is to serve as the core of the TFFF’s
            investments and as junior debt in the case of losses. The sponsor
            capital is intended to leverage $100 billion in private investments.
            We track sponsor capital investments only.
          </p>
          <Br />
          <div className="hidden lg:block">
            <CTAButton />
          </div>
        </div>
        <div>
          <InvestmentGaugeChart
            chartData={chartData}
            // invested={capitals?.invested ?? 0}
            // pledged={capitals?.pledged ?? 0}
            // target={target}
          />
        </div>
      </div>
      <Br />
      <div className="text-center lg:hidden">
        <CTAButton />
      </div>
      <Br />
    </div>
  );
}

function CTAButton() {
  const path = usePathname();

  if (path.includes("investment-tracker")) return null;
  return (
    <Button type="link" href="/investment-tracker/Norway">
      Pledges & investments
    </Button>
  );
}

function ConditionalPadding() {
  const path = usePathname();

  if (!path.includes("investment-tracker")) return null;
  return (
    <div className="hidden md:block mt-1">
      <Br />
    </div>
  );
}
