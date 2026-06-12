import Br from "@/components/ui/Br";
import Image from "next/image";

const NGOs = [
  { src: "planet-logo.jpg" },
  { src: "wwf-logo.jpg" },
  { src: "oroverde-logo.jpg" },
  { src: "rfnorway-logo.jpg" },
  { src: "logo-5.jpg" },
  { src: "logo-6.jpg" },
  { src: "logo-7.jpg" },
  { src: "logo-8.jpg" },
];

export default function EngagingNGOs() {
  return (
    <div className="bg-secondary-light rounding-xl padding-3">
      <Br />
      <div className="text-center">
        <h2 className="font-bold typo-p">Constructively Enganging NGOs</h2>
        <p className="typo-p">
          Over 100 organisations support the establishment of the TFFF
        </p>
      </div>
      <Br />
      <div className="flex gap-4 justify-center flex-wrap">
        {NGOs.map((el, key) => (
          <div
            key={key}
            className="w-[128px] aspect-square flex justify-center items-center bg-white p-2 rounding-lg"
          >
            <Image
              width={16 * 5}
              height={16 * 7}
              src={`/assets/ngos/${el.src}`}
              alt={el.src}
            />
          </div>
        ))}
      </div>
      <Br />
    </div>
  );
}
