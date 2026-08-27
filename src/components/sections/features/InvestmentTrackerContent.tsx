import Br from "@/components/ui/Br";
import ContentSection from "@/components/ui/ContentSection";
import { formatDateAgo } from "@/utils/datetime-helper";
import { InvestmentTrackerForCountry } from "@/utils/types";
import RichToHTML from "./RichToHTML";
import ExpandableImage from "./ExpandableImage";
import { hasContent, parseImageUrls } from "@/utils/content-helper";

type Props = Partial<InvestmentTrackerForCountry> & {
  how_an_investment_could_work?: string;
};

export default function InvestmentTrackerContent({
  last_updated,
  status,
  key_developments,
  background,
  financial_details,
  images_post_financial_details,
  endorsements,
  responsibile_government_office,
}: Props) {
  const financialDetailsImages = parseImageUrls(images_post_financial_details);
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

        {hasContent(key_developments) && (
          <ContentSection
            icon="/assets/investment-key-developments.svg"
            title="Key Developments"
          >
            <RichToHTML content={key_developments!} />
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

        {hasContent(financial_details) && (
          <ContentSection
            icon="/assets/investment-finance-details.svg"
            title="Financial Details"
          >
            <RichToHTML content={financial_details!} />
            {financialDetailsImages.length > 0 && (
              <div className="flex flex-col items-center gap-4 mt-4">
                {financialDetailsImages.map((url, index) => (
                  <ExpandableImage
                    key={url + index}
                    src={url}
                    className="w-full max-w-2xl"
                  />
                ))}
              </div>
            )}
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

        {/* CSO section disabled, do not show on site. Keep for possible future re-enable.
        {hasContent(CSOs) && (
          <ContentSection
            icon="/assets/investment-csos.svg"
            title="CSOs working on TFFF"
          >
            <RichToHTML content={CSOs!} />
          </ContentSection>
        )}
        */}
      </div>
      <Br cn="hidden lg:block" />
    </div>
  );
}
