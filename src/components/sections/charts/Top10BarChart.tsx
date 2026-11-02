import Image from "next/image";

export function GFWTop10CountriesChart() {
  return (
    <div>
      <Image
        width={1440}
        height={833}
        src="/assets/Top-10-GFW.png"
        alt="Top 10 countries by tree cover loss (Global Forest Watch)"
      />
    </div>
  );
}
export function JRC10CountriesChart() {
  return (
    <div>
      <Image
        width={1440}
        height={833}
        src="/assets/Top-10-JRC.png"
        alt="Top 10 countries by forest cover loss (JRC)"
      />
    </div>
  );
}
