"use client";

import { Suspense } from "react";
import DatasetTabs from "./DatasetTabs";
import { DATASET_LABEL } from "@/domain/dataset";

interface DatasetTabsWrapperProps {
  tabsClassName?: string;
  activeTabClassName?: string;
}

function DatasetTabsFallback() {
  return (
    <div className="flex gap-1 p-1 bg-[#E4F6EB] rounded-xl border border-primary-light">
      <div className="px-2 py-1 sm:px-4 sm:py-2 text-sm font-medium rounded-lg bg-white text-[#333333] shadow-sm">
        <span className="sm:hidden">{DATASET_LABEL.short}</span>
        <span className="hidden sm:inline">{DATASET_LABEL.full}</span>
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
