import PressReleaseCard from "@/components/sections/features/press/PressReleaseCard";
import { Spacer } from "@/components/ui/layout";
import { getPressReleases } from "@/content/press";
import { PressRelease } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";

export default async function PressReleases() {
  let pressReleaseList: PressRelease[] = [];

  try {
    pressReleaseList = await getPressReleases();

    pressReleaseList.sort((a, b) =>
      compareDesc(
        dateParse(a.date, "dd/MM/yyyy", new Date()),
        dateParse(b.date, "dd/MM/yyyy", new Date())
      )
    );
  } catch (error) {
    console.error("Error fetching press releases:", error);
  }

  return (
    <div className="bg-secondary-light outer-rounding outer-padding-3">
      <Spacer />
      <h2 className="text-center font-bold typo-h2">📝 Press Release</h2>
      <Spacer />
      <Spacer />
      <div>
        <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
          {pressReleaseList.slice(0, 3).map((el) => (
            <Fragment key={el.id}>
              <PressReleaseCard
                title={el.title!}
                summary={el.summary!}
                image={el.featured_image!}
                // publisher={el.publisher!}
                // publisher={el.author}
                datetime={dateParse(
                  el.date,
                  "dd/MM/yyyy",
                  new Date()
                ).toISOString()}
                url={el.url}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <Spacer />
    </div>
  );
}
