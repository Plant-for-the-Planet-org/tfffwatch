import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

export default function Footer() {
  return (
    <footer className="bg-base-gray/30 outer-rounding outer-padding-3">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-y-4 flex-wrap typo-p">
        <div className="flex justify-center gap-2 items-center">
          <span>Built by</span>
          <Link
            className="flex items-center gap-2 group"
            href="https://www.plant-for-the-planet.org"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              width={36}
              height={36}
              src="/assets/pftp.png"
              alt="Plant for the Planet Foundation"
            />
            <span className="underline">Plant-for-the-Planet</span>
          </Link>
          {/* <span>In partnership with</span>
          <span>
            <Image
              width={36}
              height={36}
              src="/assets/oroverde.png"
              alt="Plant for the Planet Foundation"
            />
          </span> */}
          {/* <span>
            <Image
              width={36}
              height={36}
              src="/assets/rffnorway.png"
              alt="Plant for the Planet Foundation"
            />
          </span> */}
        </div>
        <div></div>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <div className="flex gap-1 justify-center items-center flex-wrap md:flex-nowrap">
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
          <div className="lg:ml-2">
            <Button
              type="link"
              external
              icon="chevron"
              href="https://donate.plant-for-the-planet.org/?to=proj_bFH0BU0Qw02RuetpQlLOMVYX&callback_url=https://www.plant-for-the-planet.org/"
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
