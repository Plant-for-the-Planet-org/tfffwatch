import Br from "@/components/ui/Br";
import SectionHeader from "@/components/ui/SectionHeader";

type ContentSectionProps = {
  icon?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function ContentSection({
  icon,
  title,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <div className={className}>
      <Br />
      <div>
        <SectionHeader icon={icon} title={title} />
        <Br />
        <div className="typo-p">{children}</div>
      </div>
      <Br />
    </div>
  );
}
