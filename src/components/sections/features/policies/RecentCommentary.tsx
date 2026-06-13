import PolicyCard from "@/components/sections/features/policies/PolicyCard";
import { Spacer } from "@/components/ui/layout";
import { Button } from "@/components/ui/Button";
import { ResponsiveContainer } from "@/components/ui/Container";
import { api, urls } from "@/lib/http";
import { formatDateFromExcelToData } from "@/lib/date";
import { Policy } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";

export default async function RecentCommentary() {
  let policyList: Policy[] = [];

  try {
    policyList = await api<Policy[]>({
      url: urls.policyBriefs,
      method: "GET",
      token: "", // Add token if required
    });

    policyList.sort((a, b) =>
      compareDesc(
        dateParse(a.date, "dd.MM.yyyy", new Date()),
        dateParse(b.date, "dd.MM.yyyy", new Date())
      )
    );
  } catch (error) {
    console.error("Error fetching policy papers:", error);
  }

  return (
    <ResponsiveContainer>
      <div className="bg-primary-light outer-rounding outer-padding-3">
        <Spacer />
        <h2 className="text-center font-bold typo-h2">
          📰 Recent Policy Papers & Commentary
        </h2>
        <Spacer />
        <Spacer />
        <div>
          <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
            {policyList.slice(0, 3).map((el) => (
              <Fragment key={el.id}>
                <PolicyCard
                  title={el.title!}
                  summary={el.summary!}
                  image={el.featured_image!}
                  publisher={el.publisher!}
                  datetime={formatDateFromExcelToData(el.date)}
                  url={el.url}
                />
              </Fragment>
            ))}
          </div>
        </div>
        <Spacer />
        <Spacer />
        <div className="flex justify-center">
          <Button type="link" external href="/policy-papers-commentary">
            See All
          </Button>
        </div>
        <Spacer />
      </div>
    </ResponsiveContainer>
  );
}
