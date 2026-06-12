import Image from "next/image";

export default function TFFFHero() {
  return (
    <div className="relative -mt-3 md:-mt-4 xl:-mt-5">
      <div className="website-container relative md:absolute z-20 inset-x-0 bottom-0">
        <div className="outer-padding-3 h-full">
          <div className="grid gap-4 xl:gap-5 grid-cols-1 md:grid-cols-2 mt-64 sm:mt-42 md:mt-0">
            <div className="text-white rounding-xl padding-3 bg-black/50 backdrop-blur-xl">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 aspect-square">
                  <Image
                    className="p-3 aspect-square rounding-lg bg-black/25 backdrop-blur-2xl"
                    height={64}
                    width={64}
                    src={"/assets/TFFF-logo-white.svg"}
                    alt="TFFF"
                  />
                </div>
                <div>
                  <h2 className="font-bold typo-h2">The TFFF</h2>
                  <p className="typo-p">
                    or Tropical Forest Forever Facility, is an investment fund.
                    The fund’s profits reward countries for protecting their
                    rainforest.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-white rounding-xl padding-3 bg-black/50 backdrop-blur-xl">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 aspect-square">
                  <Image
                    className="p-3 aspect-square rounding-lg bg-black/25 backdrop-blur-2xl"
                    height={64}
                    width={64}
                    src={"/assets/tf-white.svg"}
                    alt="TF"
                  />
                </div>
                <div>
                  <h2 className="font-bold typo-h2">TFFF Watch</h2>
                  <p className="typo-p">
                    is an independent platform tracking investments into the
                    TFFF and estimates future payouts to rainforest countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 md:relative">
        <Image
          height="700"
          width="1440"
          loading="lazy"
          decoding="async"
          // priority
          // fetchPriority="high"
          className="w-full h-full md:max-h-[64vh] object-cover object-center"
          src="/assets/tropical-rainforest.webp"
          alt="Tropical Rainforest with Big Trees"
        />
      </div>
    </div>
  );
}
