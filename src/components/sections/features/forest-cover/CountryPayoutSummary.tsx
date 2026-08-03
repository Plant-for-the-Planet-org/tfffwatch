// Server-rendered text summary of a country's headline payout figures.
//
// Why this exists: the map and charts on /[country]/[year] are client-rendered
// (MapLibre + Recharts), so every number a visitor sees is invisible to crawlers
// and AI answer engines. This component fetches the same record on the server
// and states the key figures as plain, readable prose + a definition list.
//
// Wording mirrors TFFFCard so the page reads consistently ("intact forest",
// "estimated reward if TFFF already existed", the 20% Indigenous Peoples share).
import { DatasetType } from "@/components/maps/shared/types";
import type { CountryForestRecord } from "@/domain/forest-record.types";
import { toReadable } from "@/lib/format";
import { api, urls } from "@/lib/http";

type Props = {
  countryName: string;
  iso2: string;
  year: string;
  dataset: DatasetType;
};

async function getRecord({
  iso2,
  year,
  dataset,
}: {
  iso2: string;
  year: string;
  dataset: DatasetType;
}): Promise<CountryForestRecord | null> {
  try {
    const records = await api<CountryForestRecord[]>({
      url: urls.forestChange,
      query: { "country-iso2": iso2, source: dataset },
      method: "GET",
      token: "",
      nextOptions: { revalidate: 1800 }, // same 30 min window as the tracker
    });

    return (
      records?.find((record) => String(record.year) === String(year)) ?? null
    );
  } catch {
    // The summary is additive. If the upstream feed is unavailable we render
    // nothing rather than failing the page the map can still draw.
    return null;
  }
}

export default async function CountryPayoutSummary({
  countryName,
  iso2,
  year,
  dataset,
}: Props) {
  const record = await getRecord({ iso2, year, dataset });
  if (!record) return null;

  const isEligible = record.eligibility_combined;
  // Matches TFFFCard: an ineligible country's reward reads as $0, not the
  // raw post-deduction figure.
  const reward = isEligible ? record.reward_after_deductions_usd : 0;
  const iplcReward = isEligible ? record.iplc_reward_usd : 0;

  const datasetLabel =
    dataset === "GFW"
      ? "tree cover loss estimate (GFW)"
      : "standard estimate (JRC)";

  const figures = [
    { label: "Intact forest", value: `${toReadable(record.intact_forest_ha)} ha` },
    {
      label: `Deforestation in ${year}`,
      value: `${toReadable(record.deforested_ha)} ha (${toReadable(
        record.percentage_deforested
      )}%)`,
    },
    {
      label: `Degradation in ${year}`,
      value: `${toReadable(record.degraded_forest_ha)} ha (${toReadable(
        record.percentage_degraded
      )}%)`,
    },
    { label: "Base reward", value: `$${toReadable(record.base_reward_usd)}` },
    { label: "Estimated reward", value: `$${toReadable(reward)}` },
    { label: "Of which Indigenous Peoples (20%)", value: `$${toReadable(iplcReward)}` },
  ];

  return (
    <section
      aria-labelledby="payout-summary-heading"
      className="rounded-xl md:rounded-2xl border border-base-gray p-4 md:p-5"
    >
      <h2 id="payout-summary-heading" className="font-bold typo-p mb-2">
        {countryName} in {year}: estimated TFFF payout
      </h2>

      <p className="typo-p">
        In {year}, {countryName} had{" "}
        <b>{toReadable(record.intact_forest_ha)} ha</b> of intact forest and lost{" "}
        <b>{toReadable(record.deforested_ha)} ha</b> to deforestation (
        {toReadable(record.percentage_deforested)}%).{" "}
        {isEligible ? (
          <>
            If the Tropical Forest Forever Facility already existed,{" "}
            {countryName} would receive an estimated{" "}
            <b>${toReadable(reward)}</b> for {year} after deductions, of which
            20% (<b>${toReadable(iplcReward)}</b>) is designated for Indigenous
            Peoples.
          </>
        ) : (
          <>
            {countryName} does not currently meet the TFFF eligibility criteria
            for {year}, so the estimated reward is <b>$0</b>.
          </>
        )}
      </p>

      <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 typo-p">
        {figures.map((figure) => (
          <div key={figure.label} className="flex justify-between gap-4">
            <dt className="text-base-text">{figure.label}</dt>
            <dd className="font-semibold">{figure.value}</dd>
          </div>
        ))}
      </dl>

      <p className="typo-p mt-3 text-sm">
        Figures are modelled by TFFF Watch from satellite analysis using the{" "}
        {datasetLabel}. The TFFF is not yet operational, so these are estimates
        of what {countryName} would receive.
      </p>
    </section>
  );
}
