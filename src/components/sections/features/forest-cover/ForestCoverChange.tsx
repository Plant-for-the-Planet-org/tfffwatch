import { Spacer } from "@/components/ui/layout";
import { LazyForestCoverChangeAreaChart as ForestCoverChangeAreaChart } from "../../charts/lazy";

export default function ForestCoverChange() {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <Spacer />
      <div className="text-center">
        <h2 className="typo-h2">
          <b>Forest Cover Change</b> (ha)
        </h2>
      </div>
      <Spacer />
      <ForestCoverChangeAreaChart />
      <Spacer />
    </div>
  );
}
