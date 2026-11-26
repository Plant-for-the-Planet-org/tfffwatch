"use client";

import { Spacer } from "@/components/ui/layout";
import { countryPagePath } from "@/domain/dataset";
import { classify } from "@/domain/eligibility";
import { toReadable } from "@/lib/format";
import { Check, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { TFFFCardProps } from "./types";
import { slugify } from "underscore.string";

export default function TFFFCard({
  country,
  data,
  variant = "standalone",
  showCTA = false,
  cardClassName,
  contentClassName,
  size = "default",
}: TFFFCardProps) {
  if (!data) return null;

  // Same rule as the world map: only ineligible countries are not paid.
  const status = classify(data);
  const paid = status !== "INELIGIBLE";

  const sizeClasses = {
    compact: "w-3xs md:w-80 p-1 sm:p-2 text-xs",
    default:
      "w-3xs md:w-[29rem] p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-xs sm:text-sm",
    expanded: "w-full max-w-2xl p-2 md:p-4 lg:p-6 text-sm md:text-base",
  };

  const variantClasses = {
    popup: "z-50 shadow-lg",
    standalone: "z-20 shadow-custom",
  };

  return (
    <div
      className={twMerge(
        "rounding-xl bg-white",
        sizeClasses[size],
        variantClasses[variant],
        !showCTA && "md:pb-0 lg:pb-0 xl:pb-0",
        cardClassName
      )}
    >
      <div className="p-2 px-4 sm:px-2 md:p-0 flex gap-2 justify-between items-center flex-wrap rounded-t-lg bg-primary-light md:bg-white">
        <p className="flex gap-2 items-center font-semibold">
          <Image
            className="w-4 h-3"
            width={16}
            height={12}
            alt={country.name}
            src={country.flagImgUrl}
          />
          {country.name} {data.year}
        </p>
        {/* A <div>, not a <p>: it holds the criteria popover, whose block
            content is invalid inside a <p> and breaks hydration. */}
        <div className="flex items-center gap-2 relative group cursor-default">
          <StatusIcon pass={status !== "INELIGIBLE"} />
          <span className="underline underline-offset-4 decoration-dashed decoration decoration-base-gray">
            {status === "ELIGIBLE"
              ? "Meets minimum requirements"
              : status === "ALMOST_ELIGIBLE"
                ? "Almost eligible"
                : "Fails minimum requirements"}
          </span>

          <div className="absolute z-10 bottom-full mb-2 w-72 hidden group-hover:block bg-white p-2 rounded shadow left-1/2 -translate-x-1/2">
            <div className="text-xs">
              <MinimumCriteria
                eligibility_deforestation_rate_below_half_percent={
                  data.eligibility_deforestation_rate_below_half_percent
                }
                eligibility_decreasing_trend_of_deforestation={
                  data.eligibility_decreasing_trend_of_deforestation
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Spacer />
      <div className={twMerge("p-2 px-4 sm:px-2 md:p-0", contentClassName)}>
        <div className="flex justify-between items-center">
          <span>
            Reward for <b>{toReadable(data.intact_forest_ha) ?? "?"} ha</b>{" "}
            intact forest
          </span>
          <span className={twMerge("text-primary-planet-green", "text-sm")}>
            <b>${toReadable(data.base_reward_usd) ?? "?"}</b>
          </span>
        </div>
        <Spacer className="md:hidden" />
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{toReadable(data.deforested_ha) ?? "?"} ha</b>{" "}
            deforestation in {data.year} (
            {toReadable(data.percentage_deforested) ?? "?"}%)
          </span>
          <span className={twMerge("text-[#EB5757]", "text-sm")}>
            <b>-${toReadable(data.deforestation_deduction_usd) ?? "?"}</b>
          </span>
        </div>
        <Spacer className="md:hidden" />
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{toReadable(data.degraded_forest_ha) ?? "?"} ha</b>{" "}
            degradation in {data.year} ({toReadable(data.percentage_degraded) ?? "?"}%)
          </span>
          <span className={twMerge("text-[#F2994A]", "text-sm")}>
            <b>-${toReadable(data.degradation_deduction_usd)}</b>
          </span>
        </div>
      </div>
      <Spacer />
      <div
        className={twMerge(
          "p-2 px-4 sm:px-2 md:p-3 md:-mx-3 lg:-mx-4 xl:-mx-5 lg:p-4 xl:p-5 xl:py-4",
          paid ? "bg-primary-light" : "bg-danger-light",
          showCTA
            ? "rounded-none"
            : "rounded-b-xl md:rounded-b-2xl lg:rounded-b-3xl"
        )}
      >
        <p className="flex justify-between items-center">
          <span>
            <span className="font-semibold">Estimated reward</span>{" "}
            <i>if TFFF already existed</i>
          </span>
          <span
            className={twMerge(
              "text-sm",
              !paid && "text-danger"
            )}
          >
            <b>
              $
              {paid ? toReadable(data.reward_after_deductions_usd) : 0}
            </b>
          </span>
        </p>
        <p className="flex justify-between items-center font-thin">
          <span>Of which 20% is designated for Indigenous Peoples</span>
          <span className="text-sm">
            ${paid ? toReadable(data.iplc_reward_usd) : 0}
          </span>
        </p>
      </div>

      {showCTA && (
        <>
          <Spacer className="hidden md:block" />
          <Link
            href={countryPagePath(
              country?.slug || slugify(country.name),
              data?.year
            )}
            // Same CTA pill as ui/Button: Planet green, chevron for an in-site link.
            // Mobile: flush with the card bottom, so only the bottom corners round.
            className="inline-block w-full bg-primary-planet-green hover:bg-primary-planet-green/85 text-white px-5 py-3 rounded-b-xl rounded-t-none md:rounded-full cursor-pointer transition-colors"
          >
            <span className="flex justify-between items-center flex-nowrap">
              <span></span>
              <span className="font-semibold typo-p px-3">All Data</span>
              <span>
                <ChevronRight aria-hidden strokeWidth={3} className="size-4" />
              </span>
            </span>
          </Link>
        </>
      )}
    </div>
  );
}

function MinimumCriteria({
  eligibility_deforestation_rate_below_half_percent,
  eligibility_decreasing_trend_of_deforestation,
}: {
  eligibility_deforestation_rate_below_half_percent: boolean;
  eligibility_decreasing_trend_of_deforestation: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-2">
        <StatusIcon
          pass={eligibility_deforestation_rate_below_half_percent}
          size="sm"
        />
        Three-year average deforestation rate less than 0.5%
      </p>
      <div className="my-1"></div>
      <p className="flex items-center gap-2">
        <StatusIcon
          pass={eligibility_decreasing_trend_of_deforestation}
          size="sm"
        />
        Deforestation lower than previous year
      </p>
    </div>
  );
}

// Pass / fail mark: one filled circle, white glyph. Green for pass (same as
// the old check.svg), theme red (`danger`) for fail.
function StatusIcon({
  pass,
  size = "md",
}: {
  pass: boolean;
  size?: "sm" | "md";
}) {
  const Glyph = pass ? Check : X;
  return (
    <span
      role="img"
      aria-label={pass ? "Meets" : "Fails"}
      className={twMerge(
        "inline-flex shrink-0 items-center justify-center rounded-full text-white",
        pass ? "bg-primary" : "bg-danger",
        size === "md" ? "size-4" : "size-3.5",
      )}
    >
      <Glyph
        aria-hidden
        strokeWidth={3.5}
        className={size === "md" ? "size-2.5" : "size-2"}
      />
    </span>
  );
}
