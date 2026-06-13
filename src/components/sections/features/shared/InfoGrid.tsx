import { Spacer } from "@/components/ui/layout";
import { Button } from "@/components/ui/Button";

export default function InfoGrid() {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-5 outer-rounding outer-padding-3">
    <div className="border border-base-gray rounding-xl outer-rounding outer-padding-3">
      <div className="text-center">
        <h2 className="font-bold typo-h2">What TFFF?</h2>
        <Spacer />
        <p className="mx-auto typo-p">
          The Tropical Forest Forever Facility (TFFF) is a proposed investment
          fund. The profits of the fund are intended to reward tropical
          rainforest countries for protecting their tropical and sub-tropical
          moist broadleaf forest.
        </p>
        <Spacer />
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button type="link" href="/the-tfff-explained" external>
            About the Facility
          </Button>
          <Button type="link" href="/about-tfff-watch" external>
            Our Methodology
          </Button>
        </div>
      </div>
    </div>
  );
}
