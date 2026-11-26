import { NextResponse } from "next/server";
import type { LayerData, MmuLayer } from "@/components/maps/shared/types";

// Proxies the Layers public TFFF API (MMU layers) so the API key stays on
// the server. Docs: layers repo,
// apps/documentation/docs/layers-system/api-reference/tfff-endpoints.md
// Layers backend URL. Set LAYERS_API_URL to use another backend, e.g.
// http://localhost:<port> for a local one. Defaults to the staging backend.
// The API key is NOT hardcoded: set LAYERS_API_KEY (needs the `tfff`
// permission) on the host. It must be a key issued by the same backend.
const DEFAULT_LAYERS_API_URL =
  "https://layers-v2-backend-1635093a7069.herokuapp.com";
const ISO2_RE = /^[A-Z]{2}$/;
const YEAR_RE = /^\d{4}$/;

// Layers API layer keys: remaining forest, forest loss (not fire), fire loss.
type MmuLayerKey = "mmu_forest" | "mmu_deforestation" | "mmu_degradation";

type TfffLayerItem = {
  layerKey?: string;
  tileUrl?: string;
  visParams?: { palette?: string | string[] };
};

function toLayer(item: TfffLayerItem | undefined): MmuLayer | null {
  if (!item?.tileUrl) return null;
  const palette = item.visParams?.palette;
  return {
    tileUrl: item.tileUrl,
    palette: Array.isArray(palette)
      ? palette
      : palette
        ? palette.split(",").map((c) => c.trim())
        : [],
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { iso2, year } = body as { iso2?: unknown; year?: unknown };

  if (typeof iso2 !== "string" || !ISO2_RE.test(iso2)) {
    return NextResponse.json(
      { message: "Invalid 'iso2' parameter" },
      { status: 400 }
    );
  }
  if (typeof year !== "string" || !YEAR_RE.test(year)) {
    return NextResponse.json(
      { message: "Invalid 'year' parameter" },
      { status: 400 }
    );
  }

  const baseUrl = process.env.LAYERS_API_URL || DEFAULT_LAYERS_API_URL;
  const apiKey = process.env.LAYERS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Layers API is not configured" },
      { status: 500 }
    );
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/tfff-layers/by-country/${iso2}?year=${year}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "x-api-key": apiKey },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch layers data" },
        { status: response.status }
      );
    }

    const { items = [] } = (await response.json()) as {
      items?: TfffLayerItem[];
    };

    const byKey = (key: MmuLayerKey) =>
      items.find((item) => item.layerKey === key);

    // Empty items = not generated or not published yet. That is a normal
    // empty state, not an error, so every slot is simply null.
    const result: LayerData = {
      forest: toLayer(byKey("mmu_forest")),
      deforestation: toLayer(byKey("mmu_deforestation")),
      degradation: toLayer(byKey("mmu_degradation")),
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch layers data" },
      { status: 502 }
    );
  }
}
