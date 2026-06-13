import { Spacer } from "@/components/ui/layout";
import SectionHeader from "@/components/ui/SectionHeader";

type ContentSectionProps = {
  icon: string;
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
      <Spacer />
      <div>
        <SectionHeader icon={icon} title={title} />
        <Spacer />
        <div className="typo-p">{children}</div>
      </div>
      <Spacer />
    </div>
  );
}
