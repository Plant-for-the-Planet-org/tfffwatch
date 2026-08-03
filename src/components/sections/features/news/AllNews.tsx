import { Spacer } from "@/components/ui/layout";
import { ResponsiveContainer } from "@/components/ui/Container";
import { getNews } from "@/content/news";
import JsonLd from "@/lib/json-ld";
import { buildNewsListSchema } from "@/lib/structured-data";
import { News } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";
import NewsCard from "./NewsCard";

export default async function AllNews() {
  let newsList: News[] = [];

  try {
    newsList = await getNews();

    newsList.sort((a, b) =>
      compareDesc(
        dateParse(a.date, "dd/MM/yyyy", new Date()),
        dateParse(b.date, "dd/MM/yyyy", new Date())
      )
    );
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  const visibleNews = newsList.slice(0, 12);

  return (
    <ResponsiveContainer>
      <JsonLd data={buildNewsListSchema(visibleNews)} />
      <Spacer />
      <Spacer />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 xl:gap-5">
          {visibleNews.map((el) => (
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
      <Spacer />
      <Spacer />
    </ResponsiveContainer>
  );
}
