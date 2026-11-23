import { NaturalEarthGeoJSONProperties } from "@/utils/types";
import type { Geometry, MultiPolygon, Polygon } from "geojson";

function projectMercator(
  lon: number,
  latInput: number,
  width: number,
  height: number
): { x: number; y: number } {
  // clamp to Mercator’s limits
  const maxLat = 90;
  const lat = Math.max(Math.min(latInput, maxLat), -maxLat);

  const λ = (lon * Math.PI) / 180;
  const φ = (lat * Math.PI) / 180;

  const x = ((λ + Math.PI) / (2 * Math.PI)) * width;
  const y =
    ((Math.PI - Math.log(Math.tan(φ) + 1 / Math.cos(φ))) / (2 * Math.PI)) *
    height;

  return { x, y };
}

/** Narrow a Geometry to Polygon */
function isPolygon(g: Geometry): g is Polygon {
  return g.type === "Polygon";
}

/** Narrow a Geometry to MultiPolygon */
function isMultiPolygon(g: Geometry): g is MultiPolygon {
  return g.type === "MultiPolygon";
}

export function downloadGeoJsonAsSvg(
  geojson: GeoJSON.FeatureCollection,
  opts: {
    width: number;
    height: number;
    filename?: string;
    backgroundColor?: string;
    strokeWidth?: number;
  }
) {
  const {
    width,
    height,
    filename = "map.svg",
    backgroundColor = "#F4FAF6",
    strokeWidth = 1,
  } = opts;

  const xmlns = "http://www.w3.org/2000/svg";
  const svgEl = document.createElementNS(xmlns, "svg");
  svgEl.setAttribute("xmlns", xmlns);
  svgEl.setAttribute("width", `${width}`);
  svgEl.setAttribute("height", `${height}`);
  svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);

  // background
  const bg = document.createElementNS(xmlns, "rect");
  bg.setAttribute("width", "100%");
  bg.setAttribute("height", "100%");
  bg.setAttribute("fill", backgroundColor);
  svgEl.appendChild(bg);

  // for each feature
  geojson.features.forEach((feat) => {
    if (
      (feat.properties as NaturalEarthGeoJSONProperties).name_long ===
      "Antarctica"
    ) {
      return;
    }

    const fill =
      (feat.properties as NaturalEarthGeoJSONProperties).colorKey || "#E9F6EE";

    const geom = feat.geometry;
    if (!isPolygon(geom) && !isMultiPolygon(geom)) return;

    const polygons = isPolygon(geom) ? [geom.coordinates] : geom.coordinates;

    polygons.forEach((rings) => {
      rings.forEach((ring) => {
        const path = document.createElementNS(xmlns, "path");
        // build "d"
        const d = ring
          .map((coord, i) => {
            const [lon, lat] = coord;
            const { x, y } = projectMercator(lon, lat, width, height);
            return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
          })
          .join(" ")
          .concat(" Z");

        path.setAttribute("d", d);
        path.setAttribute("fill", fill);
        path.setAttribute("stroke", "#FFFFFF");
        path.setAttribute("stroke-width", `${strokeWidth}`);
        svgEl.appendChild(path);
      });
    });
  });

  // serialize + download
  const xml = new XMLSerializer().serializeToString(svgEl);
  const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
