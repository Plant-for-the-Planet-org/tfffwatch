import Image from "next/image";
import Link from "next/link";
import SiteSwitch from "./SiteSwitch";
import { Button } from "./ui/Button";

const DONATE_URL =
  "https://donate.plant-for-the-planet.org/?to=proj_bFH0BU0Qw02RuetpQlLOMVYX&callback_url=https://www.plant-for-the-planet.org/";

// Same layout as Cali Watch's footer. One line from `xl`. Below that: mobile
// stacks switch + Donate (one row, both about 36px tall), then maker, then
// legal; `lg` keeps maker, legal and Donate on the first row and drops the
// switch to a second row.
export default function Footer() {
  return (
    <footer className="bg-base-gray/30 outer-rounding outer-padding-3">
      <div className="typo-p flex flex-col items-center gap-3 lg:flex-row lg:flex-wrap lg:gap-x-4 lg:gap-y-3">
        <Link
          className="group flex items-center gap-2 lg:mr-auto"
          href="https://www.plant-for-the-planet.org"
          target="_blank"
          rel="noreferrer"
        >
          <span>Built by</span>
          <Image
            width={36}
            height={36}
            src="/assets/pftp.png"
            alt="Plant for the Planet Foundation"
          />
          <span className="underline">Plant-for-the-Planet</span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-1 text-center">
          <Link
            className="hover:underline"
            href="https://www.plant-for-the-planet.org/imprint/"
            target="_blank"
            rel="noreferrer"
          >
            Imprint
          </Link>
          ·
          <Link
            className="hover:underline"
            href="https://www.plant-for-the-planet.org/terms-and-conditions"
            target="_blank"
            rel="noreferrer"
          >
            Terms & Conditions
          </Link>
          ·
          <Link
            className="hover:underline"
            href="https://www.plant-for-the-planet.org"
            target="_blank"
            rel="noreferrer"
          >
            Plant-for-the-Planet Foundation
          </Link>
          <span> © {new Date().getFullYear()}</span>
        </div>

        {/* First row on mobile; on desktop its two children join the footer row. */}
        <div className="order-first mb-2 flex items-center justify-center gap-2 lg:contents">
          <div className="lg:order-last lg:flex lg:basis-full lg:justify-end xl:order-none xl:basis-auto">
            <SiteSwitch />
          </div>
          <Button
            type="link"
            external
            icon="chevron"
            href={DONATE_URL}
            cn="min-w-0 px-3 py-2"
          >
            Donate
          </Button>
        </div>
      </div>
    </footer>
  );
}
