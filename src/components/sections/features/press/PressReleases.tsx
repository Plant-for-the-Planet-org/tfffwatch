import PressReleaseCard from "@/components/sections/features/press/PressReleaseCard";
import Br from "@/components/ui/Br";
import { api, urls } from "@/lib/http";
import { PressRelease } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";

export default async function PressReleases() {
  let pressReleaseList: PressRelease[] = [];

  try {
    pressReleaseList = await api<PressRelease[]>({
      url: urls.pressReleases,
      method: "GET",
      token: "", // Add token if required
    });

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
      <Br />
      <h2 className="text-center font-bold typo-h2">📝 Press Release</h2>
      <Br />
      <Br />
      <div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 overflow-x-scroll overscroll-x-auto"> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 place-items-center place-content-center-safe"> */}
        <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
          {/* <div className="flex gap-3 md:gap-4 xl:gap-5"> */}
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
      {/* <Br />
      <Br /> */}
      {/* <div className="flex justify-center">
        <Button type="link" external>
          See All
        </Button>
      </div> */}
      <Br />
    </div>
  );
}
