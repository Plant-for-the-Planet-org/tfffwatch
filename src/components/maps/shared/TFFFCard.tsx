"use client";

import Br from "@/components/ui/Br";
import LinkWithParams from "@/components/ui/LinkWithParams";
import { toReadable } from "@/lib/format";
import Image from "next/image";
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
        <p className="flex items-center gap-2 relative group cursor-default">
          <Image
            className="h-4 w-4 rounded-full"
            width={12}
            height={12}
            src={
              data.eligibility_combined ? "/assets/check.svg" : "/assets/x.svg"
            }
            alt="Meets minimum requirement"
          />
          <span className="underline underline-offset-4 decoration-dashed decoration decoration-base-gray">
            {data.eligibility_combined ? "Meets" : "Fails"} minimum requirements
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
        </p>
      </div>
      <Br />
      <div className={twMerge("p-2 px-4 sm:px-2 md:p-0", contentClassName)}>
        <div className="flex justify-between items-center">
          <span>
            Reward for <b>{toReadable(data.intact_forest_ha) ?? "?"} ha</b>{" "}
            intact forest
          </span>
          <span className={twMerge("text-[#219653]", "text-sm")}>
            <b>${toReadable(data.base_reward_usd) ?? "?"}</b>
          </span>
        </div>
        <Br cn="md:hidden" />
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
        <Br cn="md:hidden" />
        <div className="flex justify-between items-center">
          <span>
            Discount for <b>{toReadable(data.degraded_forest_ha) ?? "?"} ha</b>{" "}
            degradation in 2024 ({toReadable(data.percentage_degraded) ?? "?"}%)
          </span>
          <span className={twMerge("text-[#F2994A]", "text-sm")}>
            <b>-${toReadable(data.degradation_deduction_usd)}</b>
          </span>
        </div>
      </div>
      <Br />
      <div
        className={twMerge(
          "p-2 px-4 sm:px-2 md:p-3 md:-mx-3 lg:-mx-4 xl:-mx-5 lg:p-4 xl:p-5 xl:py-4",
          data.eligibility_combined ? "bg-primary-light" : "bg-danger-light",
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
              !data.eligibility_combined && "text-danger"
            )}
          >
            <b>
              $
              {data.eligibility_combined
                ? toReadable(data.reward_after_deductions_usd)
                : 0}
            </b>
          </span>
        </p>
        <p className="flex justify-between items-center font-thin">
          <span>Of which 20% is designated for Indigenous Peoples</span>
          <span className="text-sm">
            ${data.eligibility_combined ? toReadable(data.iplc_reward_usd) : 0}
          </span>
        </p>
      </div>

      {showCTA && (
        <>
          <Br cn="hidden md:block" />
          <LinkWithParams
            href={`/${country?.slug || slugify(country.name)}/${data?.year}`}
            preserveParams={["dataset"]}
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl cursor-pointer transition-colors min-w-32 rounded-t-none md:rounded-xl w-full"
          >
            <span className="flex justify-between items-center flex-nowrap">
              <span></span>
              <span className="font-semibold typo-p px-4">All Data</span>
              <span>
                <Image
                  width={12}
                  height={12}
                  src="/assets/ui/Arrow.svg"
                  alt="External Arrow"
                />
              </span>
            </span>
          </LinkWithParams>
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
        <Image
          className="h-4 w-4 rounded-full p-0.5"
          width={12}
          height={12}
          src={
            eligibility_deforestation_rate_below_half_percent
              ? "/assets/check.svg"
              : "/assets/x.svg"
          }
          alt="Three-year average deforestation rate less than 0.5%"
        />
        Three-year average deforestation rate less than 0.5%
      </p>
      <div className="my-1"></div>
      <p className="flex items-center gap-2">
        <Image
          className="h-4 w-4 rounded-full p-0.5"
          width={8}
          height={8}
          src={
            eligibility_decreasing_trend_of_deforestation
              ? "/assets/check.svg"
              : "/assets/x.svg"
          }
          alt="Deforestation lower than previous year"
        />
        Deforestation lower than previous year
      </p>
    </div>
  );
}
