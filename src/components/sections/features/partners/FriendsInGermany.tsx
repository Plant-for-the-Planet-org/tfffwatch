import Br from "@/components/ui/Br";
import Image from "next/image";

const persons = [
  {
    name: "Dr. Pilar Angelica",
    role: "Professor (CICY)",
    src: "profile-01.png",
  },
  {
    name: "Ricardo Romero",
    role: "Former Program Manager",
    src: "profile-01.png",
  },
  {
    name: "Prof. Stuart Pimm",
    role: "Doris Duke Professor",
    src: "profile-01.png",
  },
  {
    name: "Teresa Muthoni",
    role: "Africa Project Manager",
    src: "profile-01.png",
  },
  {
    name: "Dr. Peter Borchardt",
    role: "Restoration Specialist",
    src: "profile-01.png",
  },
];

export default function FriendsInGermany() {
  return (
    <div>
      <Br />
      <div className="text-center">
        <h2 className="font-bold typo-p">Friends of TFFF Germany</h2>
        <p className="typo-p">
          We call on the German government to invest into the TFFF
        </p>
      </div>
      <Br />
      <div className="flex gap-4 justify-center xl:justify-between flex-wrap">
        {persons.map((el, key) => (
          <div
            key={key}
            className="group w-[224px] xl:grow aspect-[3/4] flex flex-col gap-y-4 justify-center items-center bg-primary-light rounding-lg"
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
            <div className="text-center typo-p">
              <p>
                <b>{el.name}</b>
              </p>
              <p className="text-sm">{el.role}</p>
            </div>
          </div>
        ))}
      </div>
      <Br />
    </div>
  );
}
