import Image from "next/image";

export default function HowTFFFWorksFlowChart() {
  return (
    <div className="">
      <Image
        className="mx-auto hidden md:block"
        src="/assets/explainer/flowchart-web.png"
        alt="How TFFF Works"
        width={1000}
        height={1000}
      />
      <Image
        className="mx-auto md:hidden"
        src="/assets/explainer/flowchart-mobile.png"
        alt="How TFFF Works"
        width={1000}
        height={1000}
      />
      {/* <div className="max-w-3xl mx-auto border border-dashed border-primary rounding-xl padding-2 relative">
        <div
          id="investors-from-tfif"
          className="absolute top-[50%] -right-[4px]"
        >
          <Image
            className="rotate-180 translate-x-1"
            width={12}
            height={12}
            src={"/assets/flowchart-arrow-green.svg"}
            alt=""
          />
        </div>
        <h3 className="font-bold text-center">Investors</h3>
        <Br />
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <div className="border border-base-gray p-2 rounded-xl bg-white flex gap-2 items-center relative">
            <div
              className="md:hidden absolute -left-[10px]"
              id="sponsors-to-tfif"
            ></div>
            <Image
              className="flex-1/6 bg-[#EEF5FF] aspect-square p-2 rounded-md"
              width={52}
              height={36}
              src="/assets/sponsors.svg"
              alt="Sponsors"
            />
            <div className="flex-5/6">
              <p className="typo-p">Sponsors</p>
              <p className="text-xs">(governments & foundations)</p>
            </div>
          </div>
          <div className="border border-base-gray p-2 rounded-xl bg-white flex gap-2 items-center relative">
            <div
              className="md:hidden absolute -right-[10px]"
              id="markets-to-tfif"
            ></div>
            <Image
              className="flex-1/6 bg-[#EEF5FF] aspect-square p-2 rounded-md"
              width={36}
              height={52}
              src="/assets/financial-markets.svg"
              alt="Financial markets"
            />
            <div className="flex-5/6">
              <p className="typo-p">Financial markets</p>
              <p className="text-xs">
                (e.g. institutional investors, sovereign wealth funds,
                endowments)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-2 max-w-2xl mx-auto grid grid-cols-2 md:gap-8">
        <div className="w-full md:w-2/3 justify-self-start text-left md:justify-self-center md:text-right relative">
          <div
            className="hidden md:block absolute top-0 -right-[12px]"
            id="sponsors-to-tfif-desktop"
          ></div>
          <div
            id="tfif-from-sponsors-desktop"
            className="hidden md:block absolute bottom-0 -right-[12px]"
          ></div>
          <p className="text-xs uppercase">Sponsor Capital</p>
          <p className="font-semibold text-sm">$25bn invested</p>
          <p className="text-xs">
            as long-dated concessional loans, grants or guarantees
            <span className="block">(min $1 bn for board seat)</span>
          </p>
        </div>
        <div className="w-full md:w-2/3 justify-self-end text-right md:justify-self-center md:text-left relative">
          <div
            className="hidden md:block absolute top-0 -left-[12px]"
            id="markets-to-tfif-desktop"
          ></div>
          <div
            id="tfif-from-markets-desktop"
            className="hidden md:block absolute bottom-0 -left-[12px]"
          ></div>
          <p className="text-xs uppercase">Senior Market Debt</p>
          <p className="font-semibold text-sm">$100bn invested</p>
          <p className="text-xs">as market-rate fixed income bonds</p>
        </div>
      </div>

      <Br cn="md:hidden" />
      <Br />

      <div className="max-w-3xl mx-auto relative padding-3 bg-white rounding-xl">
        <div
          id="tfif-from-sponsors"
          className="md:hidden absolute -left-[12px] -top-8"
        ></div>
        <div
          id="tfif-from-markets"
          className="md:hidden absolute -right-[12px] -top-8"
        ></div>
        <div
          id="tfif-to-investors"
          className="absolute left-[52%] -bottom-[16px]"
        ></div>
        <div
          id="tfif-to-tfff"
          className="absolute left-[50%] -bottom-[18px]"
        ></div>

        <div className="absolute flex justify-center inset-x-0 translate-y-[-80%]">
          <Image
            className="w-12 md:w-[8%] border border-primary-light rounded-xl aspect-square p-2 md:p-3 bg-white"
            width={36}
            height={42}
            src="/assets/tfif.svg"
            alt="TFIF"
          />
        </div>
        <div className="mt-5 text-center">
          <h3 className="text-primary-dark font-bold">
            Tropical Forest Investment Fund (TFIF)
          </h3>
          <Br />
          <p>
            The fund, hosted by the <b>World Bank</b>, invests the{" "}
            <b>$125 bn</b> into capital markets with expected returns of
          </p>
          <h2 className="text-primary-dark font-bold typo-h2">
            ~7.6% or ~$9.5 bn
          </h2>
          <Br />
          <p className="text-xs">
            The fund will primarily invest in fixed-income instruments in
            ODA-eligible countries.
          </p>
          <Br />

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2 ">
              <div></div>
              <div className="bg-primary-light border-primary border-2 border-dashed rounded-full px-6 py-2.5">
                <p className="text-primary-dark text-xs font-semibold">
                  TFIF Board
                </p>
              </div>
              <div></div>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center justify-between">
              <div></div>
              <div className="place-self-center bg-primary rounded-lg px-6 py-2.5">
                <p className="text-white text-xs font-semibold">TFIF CFO</p>
              </div>
              <div className="place-self-center bg-primary rounded-lg px-6 py-2.5">
                <p className="text-white text-xs font-semibold">TFIF CIO</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center justify-between">
              <div></div>
              <div className="place-self-center bg-black rounded-lg px-6 py-2.5">
                <p className="text-white text-xs font-semibold">
                  Treasury Manager
                </p>
              </div>
              <div className="place-self-center bg-base-gray rounded-lg px-6 py-2.5">
                <p className="text-base-text text-xs font-semibold">
                  External Manager(s)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto relative padding-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-right self-center">
            <p className="font-bold text-primary-dark">~2.7%</p>
            <p className="text-xs">
              remains after investor interest payments and goes to the TFFF
            </p>
          </div>
          <div className="text-left self-center">
            <p className="font-bold text-primary-dark">~4.9%</p>
            <p className="text-xs">interest payments to investors</p>
          </div>
        </div>
      </div>

      <Br cn="md:hidden" />
      <Br />

      <div className="max-w-sm mx-auto relative p-2 bg-primary-dark rounding-xl">
        <div
          id="tfff-from-tfif"
          className="absolute left-[50%] -top-[28px]"
        ></div>
        <div
          id="tfff-to-recipients"
          className="absolute left-[50%] -bottom-[8px]"
        ></div>

        <div className="absolute flex justify-center inset-x-0 translate-y-[-70%]">
          <Image
            className="w-12 md:w-[15%] border border-primary-light rounded-xl aspect-square p-1 md:p-2 bg-white"
            width={36}
            height={42}
            src="/assets/TFFF-logo.svg"
            alt="TFFF"
          />
        </div>
        <div className="mt-5 text-center">
          <Br />
          <h3 className="text-white font-bold">
            Tropical Forest Forever Facility (TFFF)
          </h3>
          <p className="text-white typo-p">hosted by the World Bank</p>
          <Br />
        </div>
      </div>

      <div className="max-w-sm mx-auto relative padding-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-right self-center"></div>
          <div className="text-left self-center">
            <p className="text-xs">
              Success-based payouts to rainforest countries
            </p>
          </div>
        </div>
      </div>

      <HowTFFFWorksFlowChartArrows /> */}
    </div>
  );
}
