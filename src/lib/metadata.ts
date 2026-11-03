import type { Metadata } from "next";

// Per-page Open Graph block. Next.js replaces `openGraph` as a whole, so a page
// that sets `url` must repeat the root's `type` and `siteName`, and the image:
// app/opengraph-image.jpg only applies to the root segment once a child page
// sets its own `openGraph`. Title and description still fall through from the
// page's own metadata.
export function pageOpenGraph(path: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: "TFFF Watch",
    url: path,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1500,
        height: 998,
        type: "image/jpeg",
      },
    ],
  };
}
