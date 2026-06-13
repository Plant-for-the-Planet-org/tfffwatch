const _v = process.env.NEXT_PUBLIC_VERSION || "";
const _map_version = process.env.NEXT_PUBLIC_MAP_VERSION || "0.9";
const _enable_umami = process.env.NEXT_PUBLIC_ENABLE_UMAMI || "false";

export const env = {
  v: _v,
  mapVersion: _map_version,
  enableUmami: _enable_umami,
};
