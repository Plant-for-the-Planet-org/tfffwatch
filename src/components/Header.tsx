import HeaderMenu from "@/components/HeaderMenu";
import Hr from "@/components/ui/Hr";
import Image from "next/image";
import HeaderCountry from "./HeaderCountry";
import HeaderLinks from "./HeaderLinks";
import { Spacer } from "@/components/ui/layout";
import LinkWithParams from "./ui/LinkWithParams";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-lg">
      <Spacer className="h-3 md:h-2 xl:h-3" />
      <div className="website-container padding-x-3">
        <div className="flex justify-between items-center ">
          <Logo />
          {/* <div className="hidden md:flex justify-center">
            <HeaderCountry />
          </div> */}
          <div className="hidden lg:block">
            <HeaderLinks />
          </div>
          <div className="-mr-2 lg:hidden">
            <HeaderMenu />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:hidden">
          <HeaderCountry />
        </div>
      </div>
      <Spacer className="h-3 md:h-2 xl:h-3" />
      <Hr />
    </header>
  );
}

export function Logo() {
  return (
    <div>
      <LinkWithParams href="/" preserveParams={["dataset"]}>
        <h1>
          <Image
            className=" h-[24px] w-[160px] lg:h-[48px] lg:w-[256px]"
            width={256}
            height={32}
            src="/assets/tfffwatch-header-logo.svg"
            alt="TFFF Watch"
          />
        </h1>
      </LinkWithParams>
    </div>
  );
}
