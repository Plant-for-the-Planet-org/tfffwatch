// Branded primitives — nominal types over `string` so a raw string can't be
// passed where a domain id/year is expected. Brands erase at runtime (the
// `as*` constructors are zero-cost assertions); use them at parse/construction
// boundaries (fetch seam, geojson read, country lookup).
declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

export type Iso2 = Brand<string, "Iso2">;
export type CountrySlug = Brand<string, "CountrySlug">;
export type Year = Brand<string, "Year">;

export const asIso2 = (v: string): Iso2 => v as Iso2;
export const asCountrySlug = (v: string): CountrySlug => v as CountrySlug;
export const asYear = (v: string): Year => v as Year;
