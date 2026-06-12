import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";

export default function WhatsTFFFWatch() {
  return (
    <div className="border border-base-gray rounding-xl padding-3 text-center">
      <div className="h-full flex flex-col justify-between">
        <div className="extra-padding-x-4">
          {/* <div className="xl:max-w-[33vw] mx-auto self-center-safe text-center"> */}
          <h2 className="font-bold typo-h2">What’s TFFF Watch?</h2>
          <Br />
          <p className="xl:max-w-[33vw] mx-auto typo-p">
            The TFFF does not exist yet. We use the proposed TFFF methodology
            and satellite data to show how much funding each rainforest country
            would be eligible for, if the TFFF already existed. This project is
            administered by the Plant-for-the-Planet Foundation, and independent
            of the Brazilian Government.
          </p>
        </div>
        <Br />
        <div className="xl:max-w-[30vw] self-center-safe text-center">
          <Button type="link" href="/about-tfff-watch" external>
            Our Methodology
          </Button>
        </div>
      </div>
    </div>
  );
}
