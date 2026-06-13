import { Spacer } from "@/components/ui/layout";
import Image from "next/image";
import Link from "next/link";

const persons = [
  {
    name: "Felix Finkbeiner",
    role: "Founder of Plant-for-the-Planet Forests & Monitoring",
    src: "felix-finkbeiner.png",
    linkedin: "https://www.linkedin.com/in/felixfinkbeiner/",
    email: "mailto:felix.finkbeiner@plant-for-the-planet.org",
    phone: "",
  },
  {
    name: "Pakhi Das",
    role: "Policy Advisor at Plant-for-the-Planet TFFF Investment Tracking",
    src: "pakhi-das.png",
    linkedin: "https://www.linkedin.com/in/pakhidas/",
    email: "mailto:pakhi.das@plant-for-the-planet.org",
    phone: "",
  },
];

export default function PressAnalysts() {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3">
      <Spacer />
      <h2 className="text-center font-bold typo-h2">TFFF Analysts</h2>
      <p className="text-center typo-p">‎ </p>
      <Spacer />
      <Spacer />
      <div className="flex gap-4 justify-center flex-wrap">
        {persons.map((el, key) => (
          <div
            key={key}
            className="group bg-white w-[244px] aspect-[3/4] flex flex-col gap-y-4 justify-center items-center rounding-lg py-6"
          >
            <div className="aspect-square rounded-full h-36 w-36 overflow-hidden">
              <Image
                className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                width={16 * 9}
                height={16 * 9}
                src={`/assets/persons/${el.src}`}
                alt={el.src}
              />
            </div>
            <div className="text-center typo-p px-4">
              <p>
                <b>{el.name}</b>
              </p>
              <p className="text-sm">{el.role}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              {el.linkedin && (
                <Link
                  className="rounded-full bg-[#219653] p-1.5 transition-transform hover:-translate-y-1"
                  href={el.linkedin ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={16 * 1}
                    height={16 * 1}
                    src="/assets/press-contact-linkedin.svg"
                    alt="linkedin"
                  />
                </Link>
              )}
              {el.email && (
                <Link
                  className="rounded-full bg-[#219653] p-1.5 py-2 transition-transform hover:-translate-y-1"
                  href={el.email ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={16 * 1}
                    height={16 * 1}
                    src="/assets/press-contact-email.svg"
                    alt="email"
                  />
                </Link>
              )}
              {el.phone && (
                <Link
                  className="rounded-full bg-[#219653] p-1.5 transition-transform hover:-translate-y-1"
                  href={el.phone ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={16 * 1}
                    height={16 * 1}
                    src="/assets/press-contact-phone.svg"
                    alt="phone"
                  />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <Spacer />
    </div>
  );
}
