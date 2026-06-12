"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";

export default function HowTFFFWorksFlowChartArrows() {
  const { width } = useWindowSize();
  const [gridBreak, setGridBreak] = useState("112%");

  useEffect(() => {
    if (!width) return;
    if (width > 768) setGridBreak("106%");
  }, [width]);

  return (
    <div>
      <div className="md:hidden">
        <Xarrow
          strokeWidth={1}
          color="black"
          start={"sponsors-to-tfif"}
          path="grid"
          end={"tfif-from-sponsors"}
          startAnchor={"left"}
          endAnchor={"top"}
        />
        <Xarrow
          strokeWidth={1}
          color="black"
          start={"markets-to-tfif"}
          path="grid"
          end={"tfif-from-markets"}
          startAnchor={"right"}
          endAnchor={"top"}
        />
      </div>
      <div className="hidden md:block">
        <Xarrow
          strokeWidth={1}
          color="black"
          start={"sponsors-to-tfif-desktop"}
          path="grid"
          end={"tfif-from-sponsors-desktop"}
          startAnchor={"bottom"}
          endAnchor={"top"}
        />
        <Xarrow
          strokeWidth={1}
          color="black"
          start={"markets-to-tfif-desktop"}
          path="grid"
          end={"tfif-from-markets-desktop"}
          startAnchor={"bottom"}
          endAnchor={"top"}
        />
      </div>
      <Xarrow
        strokeWidth={2}
        color="#27AE60"
        start={"tfif-to-tfff"}
        startAnchor={"bottom"}
        path="grid"
        end={"tfff-from-tfif"}
        endAnchor={"top"}
      />
      <Xarrow
        strokeWidth={2}
        color="#27AE60"
        start={"tfif-to-investors"}
        startAnchor={"right"}
        path="grid"
        end={"investors-from-tfif"}
        endAnchor={"right"}
        gridBreak={gridBreak}
        showHead={false}
      />
      <Xarrow
        strokeWidth={2}
        color="#27AE60"
        start={"tfff-to-recipients"}
        startAnchor={"bottom"}
        path="grid"
        end={"recipients-from-tfff"}
        endAnchor={"top"}
      />
    </div>
  );
}
