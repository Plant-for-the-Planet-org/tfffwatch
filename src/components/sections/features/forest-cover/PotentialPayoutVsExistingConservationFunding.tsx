import Br from "@/components/ui/Br";
import PotentialPayoutVsExistingConservationFundingBarChart from "../../charts/PotentialPayoutVsExistingConservationFundingBarChart";

export default function PotentialPayoutVsExistingConservationFunding() {
  return (
    <div className="bg-secondary-light rounding-xl overflow-clip">
      <div className="padding-3">
        <Br />
        <div className="text-center">
          <h2 className="typo-h2">
            <b>Potential TFFF Payout vs Existing Conservation Funding</b>
          </h2>
        </div>
        <Br />
        <PotentialPayoutVsExistingConservationFundingBarChart />
        <Br />
      </div>
      <div className="bg-secondary/5 my-2 padding-3 text-xs md:text-sm">
        <p>
          <b>Note</b>: Conservation funding figures are based on limited data
          and may differ in scope, quality, and purpose. These will continue to
          be updated these data as we prepare for the full launch.
        </p>
      </div>
    </div>
  );
}
