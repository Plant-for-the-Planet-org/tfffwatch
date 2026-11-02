import Image from "next/image";

type SectionHeaderProps = {
  icon?: string;
  title: string;
  alt?: string;
};

export default function SectionHeader({
  icon,
  title,
  alt,
}: SectionHeaderProps) {
  return (
    <h2 className="font-bold typo-h2 flex items-center gap-2">
      {icon && <Image width={32} height={32} src={icon} alt={alt || title} />}
      {title}
    </h2>
  );
}
