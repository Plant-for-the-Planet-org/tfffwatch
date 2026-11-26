import { twMerge } from "tailwind-merge";
import { DATASET_LATEST_YEAR } from "@/domain/dataset";

import { eligibilityColor, type Eligibility } from "@/domain/eligibility";

const ELIGIBILITY_LEGEND: {
  status: Eligibility;
  title: string;
  note: string;
}[] = [
  {
    status: "ELIGIBLE",
    title: "Fully eligible countries",
    note: "Pass both criteria",
  },
  {
    status: "ALMOST_ELIGIBLE",
    title: "Almost eligible",
    note: `Deforestation rate under 0.5% but increase in deforestation rate from ${DATASET_LATEST_YEAR - 1} to ${DATASET_LATEST_YEAR}`,
  },
  {
    status: "INELIGIBLE",
    title: "Currently ineligible rainforest countries",
    note: "Deforestation rate over 0.5%",
  },
];

// Eligibility legend as in the Figma design: three tinted cards in a row
// below the map (stacked on mobile), each with a colour chip, a title and an
// italic note. Chip colours come from the same helper as the map fills.
export function EligibilityLegend({
  statuses = ["ELIGIBLE", "ALMOST_ELIGIBLE", "INELIGIBLE"],
}: {
  statuses?: Eligibility[];
} = {}) {
  const items = ELIGIBILITY_LEGEND.filter((item) =>
    statuses.includes(item.status)
  );
  return (
    <ul
      className={twMerge(
        "grid grid-cols-1 gap-3 md:gap-4",
        items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
      )}
    >
      {items.map((item) => (
        <li
          key={item.status}
          className="rounded-2xl bg-primary-medium-light padding-3 typo-p"
        >
          <span
            aria-hidden
            className="block w-6 h-4 rounded"
            style={{ backgroundColor: eligibilityColor(item.status) }}
          />
          <p className="mt-2">{item.title}</p>
          <p className="text-sm italic text-base-text/60">{item.note}</p>
        </li>
      ))}
    </ul>
  );
}

export function LegendsForMMU() {
  return <EligibilityLegend />;
}

export function CountryMapLegends() {
  return (
    <div className="flex typo-p">
      <div className="font-thin">
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#007A49]`)}></div>
          <p>Intact Forest</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#EB5756]`)}></div>
          <p>Deforested</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#F1994A]`)}></div>
          <p>Degraded</p>
        </div>
        {/* <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#2D9CDB]`)}></div>
          <p>Restored</p>
        </div> */}
      </div>
    </div>
  );
}
