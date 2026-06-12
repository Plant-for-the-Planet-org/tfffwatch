"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import Br from "@/components/ui/Br";
import EndorsementMap from "@/components/maps/world/EndorsementMap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CountrySignatories() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCountryClick = (country: {
    iso2: string;
    slug: string;
    name: string;
  }) => {
    // You can add navigation or other actions when a country is clicked
    console.log("Selected country:", country);
  };

  return (
    <div className="border border-base-gray rounded-xl padding-3">
      <div className="flex flex-col divide-y divide-base-gray">
        <div className="flex flex-col sm:flex-row justify-between flex-wrap">
          <h2 className="font-bold typo-h2 flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src={"/assets/investment-endorsement.svg"}
              alt={"Signatory of the TFFF Declaration"}
            />
            <p>
              Signatory of the{" "}
              <Link
                href="https://tfff.earth/wp-content/uploads/2025/11/Declaration-on-the-Launch-of-the-TFFF.pdf"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                TFFF Declaration
              </Link>
            </p>
          </h2>
          <Br cn="sm:none" />
          <Button
            type="button"
            cn="min-w-40"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            All signatories
          </Button>
        </div>

        {/* Dialog with Map */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="max-w-[90vw] max-h-[90vh] xl:max-w-[75vw]"
        >
          <div className="h-full w-full bg-primary-light rounded-lg overflow-hidden">
            <EndorsementMap onCountryClick={handleCountryClick} />
          </div>
        </Dialog>

        {/* <ContentSection
          icon="/assets/investment-endorsement.svg"
          title="Signatory of the TFFF Declaration"
          className="mb-4"
        >
          <RichToHTML content="See all signatories" />
          <Br />
          <div className="h-[500px] bg-primary-light w-full rounded-lg overflow-hidden">
            <EndorsementMap onCountryClick={handleCountryClick} />
          </div>
        </ContentSection> */}
      </div>
    </div>
  );
}
