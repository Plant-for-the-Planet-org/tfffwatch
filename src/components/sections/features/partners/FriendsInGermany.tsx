import Br from "@/components/ui/Br";
import Image from "next/image";

const persons = [
  {
    name: "Dr. Pilar Angelica",
    role: "Professor (CICY)",
    src: "https://www-cdn.plant-for-the-planet.org/wp-content/uploads/2025/03/team-hs-placeholder.jpg",
  },
  {
    name: "Ricardo Romero",
    role: "Former Program Manager",
    src: "https://www-cdn.plant-for-the-planet.org/wp-content/uploads/2025/03/team-hs-placeholder.jpg",
  },
  {
    name: "Prof. Stuart Pimm",
    role: "Doris Duke Professor",
    src: "https://www-cdn.plant-for-the-planet.org/wp-content/uploads/2025/03/team-hs-placeholder.jpg",
  },
  {
    name: "Teresa Muthoni",
    role: "Africa Project Manager",
    src: "https://www-cdn.plant-for-the-planet.org/wp-content/uploads/2025/03/team-hs-placeholder.jpg",
  },
  {
    name: "Dr. Peter Borchardt",
    role: "Restoration Specialist",
    src: "https://www-cdn.plant-for-the-planet.org/wp-content/uploads/2025/03/team-hs-placeholder.jpg",
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
                src={el.src}
                alt={el.name}
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
