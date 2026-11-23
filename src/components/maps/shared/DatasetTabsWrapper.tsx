"use client";

import { Suspense } from "react";
import DatasetTabs from "./DatasetTabs";
import { DatasetType } from "./types";

interface DatasetTabsWrapperProps {
  tabsClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  disabled?: boolean;
  defaultDataset?: DatasetType;
}

function DatasetTabsFallback() {
  return (
    <div className="flex gap-1 p-1 bg-primary-medium-light rounded-xl border border-primary-light">
      <div className="px-4 py-2 typo-p font-medium rounded-lg bg-white text-[#333333] shadow-sm">
        Standard Estimate (JRC + GFW)
      </div>
      <div className="px-4 py-2 typo-p font-medium rounded-lg bg-transparent text-[#828282]">
        Tree-cover-change Estimate (GFW)
      </div>
    </div>
  );
}

export default function DatasetTabsWrapper(props: DatasetTabsWrapperProps) {
  return (
    <Suspense fallback={<DatasetTabsFallback />}>
      <DatasetTabs {...props} />
    </Suspense>
  );
}
