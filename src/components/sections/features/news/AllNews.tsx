import Br from "@/components/ui/Br";
import { ResponsiveContainer } from "@/components/ui/Container";
import { api, urls } from "@/lib/http";
import { News } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";
import NewsCard from "./NewsCard";

export default async function AllNews() {
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
      <Br />
      <Br />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 xl:gap-5">
          {newsList.slice(0, 12).map((el) => (
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
    </ResponsiveContainer>
  );
}
