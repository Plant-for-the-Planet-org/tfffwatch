import Br from "@/components/ui/Br";
import ContentSection from "@/components/ui/ContentSection";
import { formatDateAgo } from "@/utils/datetime-helper";
import { InvestmentTrackerForCountry } from "@/utils/types";
import RichToHTML from "./RichToHTML";
import { hasContent } from "@/utils/content-helper";

type Props = Partial<InvestmentTrackerForCountry> & {
  how_an_investment_could_work?: string;
};

export default function InvestmentTrackerContent({
  last_updated,
  status,
  background,
  endorsements,
  CSOs,
  responsibile_government_office,
}: Props) {
  return (
    <div className="border border-base-gray rounded-xl padding-3">
      <div className="text-end text-[#828282] italic">
        <p>Updated {formatDateAgo(last_updated!)}</p>
      </div>
      <Br cn="hidden lg:block" />

      <div className="extra-padding-x-4 flex flex-col divide-y divide-base-gray">
        {hasContent(status) && (
          <ContentSection icon="/assets/investment-status.svg" title="Status">
            <RichToHTML content={status!} />
          </ContentSection>
        )}

        {hasContent(responsibile_government_office) && (
          <ContentSection
            icon="/assets/investment-responsible-government-office.svg"
            title="Responsible Government Office"
          >
            <RichToHTML content={responsibile_government_office!} />
          </ContentSection>
        )}

        {hasContent(background) && (
          <ContentSection
            icon="/assets/investment-background.svg"
            title="Other engagements for tropical forests"
          >
            <RichToHTML content={background!} />
          </ContentSection>
        )}

        {hasContent(endorsements) && (
          <ContentSection
            icon="/assets/investment-endorsement.svg"
            title="Statements"
          >
            <RichToHTML content={endorsements!} />
          </ContentSection>
        )}

        {hasContent(CSOs) && (
          <ContentSection
            icon="/assets/investment-csos.svg"
            title="CSOs working on TFFF"
          >
            <RichToHTML content={CSOs!} />
          </ContentSection>
        )}
      </div>
      <Br cn="hidden lg:block" />
    </div>
  );
}
