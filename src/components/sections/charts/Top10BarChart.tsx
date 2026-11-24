import Image from "next/image";

// Placeholder: reuses the JRC image until an MMU-specific chart is provided.
export function Top10CountriesChart() {
  return (
    <div>
      <Image
        width={1440}
        height={833}
        src="/assets/Top-10-JRC.png"
        alt="Top 10 countries by forest cover loss"
      />
    </div>
  );
}
