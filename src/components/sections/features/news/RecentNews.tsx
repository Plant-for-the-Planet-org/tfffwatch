import Br from "@/components/ui/Br";
import { ResponsiveContainer } from "@/components/ui/Container";
import { api, urls } from "@/lib/http";
import { News } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";
import NewsCard from "./NewsCard";
import { Button } from "@/components/ui/Button";

export default async function RecentNews() {
  let newsList: News[] = [];

  try {
    newsList = await api<News[]>({
      url: urls.news,
      method: "GET",
      token: "", // Add token if required
    });

    newsList.sort((a, b) =>
      compareDesc(
        dateParse(a.date, "dd/MM/yyyy", new Date()),
        dateParse(b.date, "dd/MM/yyyy", new Date())
      )
    );
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <ResponsiveContainer>
      <div className="bg-secondary-light outer-rounding outer-padding-3">
        <Br />
        <h2 className="text-center font-bold typo-h2">🌿 Recent News</h2>
        <Br />
        <Br />
        <div>
          <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
            {newsList.slice(0, 3).map((el) => (
              <Fragment key={el.id}>
                <NewsCard
                  title={el.title!}
                  summary={el.summary!}
                  image={el.featured_image!}
                  publisher={el.publisher!}
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
        <Br />
        <Br />

        <div className="flex justify-center">
          <Button type="link" external href="/news">
            See All
          </Button>
        </div>

        <Br />
      </div>
    </ResponsiveContainer>
  );
}
