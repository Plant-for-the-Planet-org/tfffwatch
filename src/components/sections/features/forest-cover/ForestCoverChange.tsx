import Br from "@/components/ui/Br";
import ForestCoverChangeAreaChart from "../../charts/ForestCoverChangeAreaChart";

export default function ForestCoverChange() {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <Br />
      <div className="text-center">
        <h2 className="typo-h2">
          <b>Forest Cover Change</b> (ha)
        </h2>
      </div>
      <Br />
      <ForestCoverChangeAreaChart />
      <Br />
    </div>
  );
}
