import Image from "next/image";

export function GFWTop10CountriesChart() {
  return (
    <div>
      <Image width={1440} height={833} src="/assets/Top-10-GFW.png" alt="" />
    </div>
  );
}
export function JRC10CountriesChart() {
  return (
    <div>
      <Image width={1440} height={833} src="/assets/Top-10-JRC.png" alt="" />
    </div>
  );
}
// Placeholder: reuses JRC image until an MMU-specific chart is provided.
export function MMU10CountriesChart() {
  return (
    <div>
      <Image width={1440} height={833} src="/assets/Top-10-JRC.png" alt="" />
    </div>
  );
}
