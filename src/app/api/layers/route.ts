import { NextResponse } from "next/server";

const layersAPIParams = (countryName: string, yearShorthand: string) =>
  `https://layers.plant-for-the-planet.org/tttf-data/${countryName}/${yearShorthand}`;
// const layersAPIParams = (countryCode: string, yearShorthand: string) =>
//   `https://layers.plant-for-the-planet.org/tttf-data/${countryCode}/${yearShorthand}`;

// Country display name: letters (incl. accents), spaces, ., ', - ; 1-60 chars.
// Blocks path-traversal / injection chars (/, \, %, ?, #, ..) from the proxied URL.
const NAME_RE = /^[\p{L} .'-]{1,60}$/u;
const YEAR_RE = /^\d{4}$/;

export async function POST(request: Request) {
  const body = await request.json();
  const { name, year /* iso2 */ } = body;

  if (typeof name !== "string" || !NAME_RE.test(name)) {
    return NextResponse.json(
      { message: "Invalid 'name' parameter" },
      { status: 400 }
    );
  }
  if (typeof year !== "string" || !YEAR_RE.test(year)) {
    return NextResponse.json(
      { message: "Invalid 'year' parameter" },
      { status: 400 }
    );
  }

  const url = layersAPIParams(encodeURIComponent(name), year.slice(2));
  // const url = layersAPIParams(iso2, year)

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (process.env.LAYERS_API_KEY) {
      headers["x-api-key"] = process.env.LAYERS_API_KEY;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch layers data", error },
      { status: 500 }
    );
  }
}
