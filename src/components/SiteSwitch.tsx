import Link from "next/link";
import { CaliWatchWordmark, TfffWatchWordmark } from "./BrandMarks";

export const CALI_WATCH_URL = "https://caliwatch.org";

/** Switch between the two Planet trackers. Ported from Cali Watch; own site first. */
export default function SiteSwitch() {
  return (
    <div
      role="group"
      aria-label="Switch site"
      className="inline-flex shrink-0 items-center rounded-full p-0.5 bg-white border border-base-gray"
    >
      <span
        aria-current="page"
        className="flex items-center rounded-full px-2.5 py-2.5 bg-primary-planet-green text-white"
      >
        <TfffWatchWordmark className="h-2.5" />
      </span>
      <Link
        href={CALI_WATCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Open Cali Watch in a new tab"
        className="flex items-center rounded-full px-2.5 py-2.5 transition-colors text-theme-base/70 hover:bg-primary-light hover:text-theme-base"
      >
        <CaliWatchWordmark className="h-2.5" />
      </Link>
    </div>
  );
}
