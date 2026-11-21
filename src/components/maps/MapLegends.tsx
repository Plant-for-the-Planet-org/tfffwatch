import { twMerge } from "tailwind-merge";

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
    note: "Deforestation rate under 0.5% but increase in deforestation rate from 2023 to 2024",
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
function EligibilityLegend() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {ELIGIBILITY_LEGEND.map((item) => (
        <li
          key={item.status}
          className="rounded-2xl bg-primary/10 padding-3 typo-p"
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

export function LegendsForJRC() {
  return <EligibilityLegend />;
}

export function LegendsForGFW() {
  return <EligibilityLegend />;
}

export function CountryMapLegends() {
  return (
    <div className="flex typo-p">
      <div className="font-thin">
        <div className="flex gap-2 items-center">
          <div className={twMerge("w-6 h-4", `bg-[#6FCF97]`)}></div>
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
          <div className={twMerge("w-6 h-4", `bg-[#2C9CDB]`)}></div>
          <p>Restored</p>
        </div> */}
      </div>
    </div>
  );
}
