import Image from "next/image";

export default function TFFFHero() {
  return (
    <div data-hero className="relative hero-under-header">
      <div className="website-container relative md:absolute z-20 inset-x-0 bottom-0">
        <div className="outer-padding-3 h-full">
          {/* One frosted strip as the backdrop, with the two items side by side on it. */}
          <div data-hero-content className="grid gap-4 xl:gap-5 grid-cols-1 md:grid-cols-2 mt-64 sm:mt-42 md:mt-0 rounding-xl padding-3 bg-black/50 backdrop-blur-xl border border-white/10">
            <div className="text-white">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 aspect-square">
                  <Image
                    className="p-3 aspect-square rounding-lg bg-white/5 border border-white/5"
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
            <div className="text-white">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 aspect-square">
                  <Image
                    className="p-3 aspect-square rounding-lg bg-white/5 border border-white/5"
                    height={64}
                    width={64}
                    src={"/assets/tf-white.svg"}
                    alt="TF"
                  />
                </div>
                {/* The page H1: the site name plus its one-line purpose, so the
                    headline carries the primary keywords. Spans keep the look. */}
                <h1>
                  <span className="block font-bold typo-h2">TFFF Watch</span>
                  <span className="block typo-p">
                    is an independent platform tracking investments into the
                    TFFF and estimates future payouts to rainforest countries
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Darkens the top so the white header logo and menu read on the image. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[11] h-32 pointer-events-none bg-gradient-to-b from-black/40 to-transparent"
      />
      <div className="absolute inset-0 z-10 md:relative">
        <Image
          height="700"
          width="1440"
          // Top of the page and behind the header: load it first (LCP).
          priority
          // Serve the original file as-is: no resize to 1920px, no q=75 WebP.
          unoptimized
          className="w-full h-full md:max-h-[64vh] object-cover object-center"
          src="/assets/home-hero-forest.jpg"
          alt="Tropical rainforest canopy seen from above"
        />
      </div>
    </div>
  );
}
