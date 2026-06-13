import { twMerge } from "tailwind-merge";

export function LegendsForJRC() {
  return (
    <div className="text-center">
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <div className="shrink-0 w-8 h-6 border border-black bg-[#C4C4C4]"></div>
          <div className="text-left md:max-w-1/2">
            <p>Currently ineligible rainforest countries</p>
            <p className="text-xs text-gray-600">
              Deforestation rate over 0.5%
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <div className="shrink-0 w-8 h-6 border border-black bg-[#8FBDF1]"></div>
          <div className="text-left md:max-w-1/2">
            <p>Almost eligible</p>
            <p className="text-xs text-gray-600">
              Deforestation rate under 0.5% but increase in deforestation rate
              from 2023 to 2024
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <div className="shrink-0 w-8 h-6 border border-black bg-[#6FCF97]"></div>
          <div className="text-left md:max-w-1/2">
            <p>Fully eligible countries</p>
            <p className="text-xs text-gray-600">Pass both criteria</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegendsForGFW() {
  return (
    // <div className="text-center">
    //   <p className="typo-p mb-2">% degraded or deforested</p>
    //   <div className="rounded-full h-2 w-full  bg-[linear-gradient(90deg,_#FFFFFF_0%,_#F2994A_39.76%,_#EB5757_66.23%,_#C90F0F_100%)]"></div>
    //   <div className="flex justify-between typo-p">
    //     <span>0%</span>
    //     <span>2%</span>
    //   </div>
    // </div>
    <div className="text-center">
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <div className="shrink-0 w-8 h-6 border border-black bg-[#C4C4C4]"></div>
          <div className="text-left md:max-w-1/2">
            <p>Currently ineligible rainforest countries</p>
            <p className="text-xs text-gray-600">
              Deforestation rate over 0.5%
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <div className="shrink-0 w-8 h-6 border border-black bg-[#8FBDF1]"></div>
          <div className="text-left md:max-w-1/2">
            <p>Almost eligible</p>
            <p className="text-xs text-gray-600">
              Deforestation rate under 0.5% but increase in deforestation rate
              from 2023 to 2024
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <div className="shrink-0 w-8 h-6 border border-black bg-[#6FCF97]"></div>
          <div className="text-left md:max-w-1/2">
            <p>Fully eligible countries</p>
            <p className="text-xs text-gray-600">Pass both criteria</p>
          </div>
        </div>
      </div>
    </div>
  );
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
