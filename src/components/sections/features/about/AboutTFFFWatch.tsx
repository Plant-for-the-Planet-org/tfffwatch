import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import Hr from "@/components/ui/Hr";
import Link from "next/link";

export default function AboutTFFFWatch() {
  return (
    <div className="border border-base-gray rounding-xl padding-3">
      <Br cn="hidden lg:block" />
      <div className="extra-padding-x-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Report errors or suggestions</h2>
            <Br />
            <div className="typo-p">
              <p>
                TFFF Watch is currently in its public Beta phase. We welcome all
                feedback before we release the full version. Have you noticed
                errors in our results or methodology? Or do you have an idea how
                we could improve upon TFFF Watch?
              </p>
            </div>
          </div>
          <Button
            href="mailto:pakhi.das@plant-for-the-planet.org"
            type="link"
            external
          >
            Contact Us
          </Button>
        </div>
        <Br />
        <Hr />
        <Br />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Contribute</h2>
            <Br />
            <div className="typo-p">
              <p>
                TFFF Watch is a project by Plant-for-the-Planet. Please contact
                us if you’re interested in contributing.
              </p>
            </div>
          </div>
          <Button
            href="mailto:pakhi.das@plant-for-the-planet.org"
            type="link"
            external
          >
            Contact Us
          </Button>
        </div>
        <Br />
        <Hr />
        <Br />
        <div>
          <h2 className="font-bold typo-h2">Analysis Methodology</h2>
          <Br />
          <div className="typo-p">
            <h2 className="font-bold typo-h3">
              Tree cover loss estimate (GFW-based)
            </h2>
            <Br />
            <b>a. Baseline</b>
            <p>
              The baseline forest extent is calculated using the{" "}
              <Link
                href="https://www.science.org/doi/10.1126/science.1244693"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Hansen Global Forest Watch
              </Link>{" "}
              (GFW) Tree Cover dataset. First, all tropical and subtropical
              broadleaf moist forest areas within the 74 TFFF-specified
              countries are identified using the Ecoregion-Based Approach from{" "}
              <Link
                href="https://academic.oup.com/bioscience/article/67/6/534/3102935"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Dinerstein et al., (2017)
              </Link>
              Within these zones, the tree cover from the year 2000 is
              considered the forest baseline. This baseline is then updated
              annually by subtracting the cumulative area of tree cover loss and
              adding areas of forest gain observed from 2000 to 2012. The result
              is a dynamically evolving baseline that reflects changes in forest
              extent over time.
            </p>
            <Br />
            <b>b. Deforestation</b>
            <p>
              Annual deforestation is assessed by identifying the total area of
              tree cover loss that occurs within the defined forest baseline
              during the reporting year. In this estimate, all tree cover loss
              not associated with fire is classified as deforestation. These
              values are aggregated at the country level to quantify area lost
              annually and evaluate performance against TFFF criteria.
            </p>
            <Br />
            <b>c. Degradation</b>
            <p>
              Forest degradation is assessed using the Global Forest Watch
              fire-related forest loss dataset developed by{" "}
              <Link
                href="https://www.frontiersin.org/journals/remote-sensing/articles/10.3389/frsen.2022.825190/full"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tyukavina et al
              </Link>
              . Fire-related loss is extracted and overlaid onto the forest
              baseline to determine areas where degradation (defined as fire
              damage within standing forests) has occurred. Only fire-induced
              tree cover loss is included in the degradation category, aligning
              with TFFF definitions, while all other causes of loss are assigned
              to deforestation.
            </p>
            <Br />

            <h2 className="font-bold typo-h3">
              Standard estimate (JRC + GFW-based)
            </h2>
            <Br />
            <b>a. Baseline</b>
            <p>
              The baseline is generated using two complementary datasets.
              Tropical areas that fall within the spatial coverage of the JRC
              Tropical Moist Forest (TMF) dataset (
              <Link
                href="https://www.science.org/doi/10.1126/sciadv.abe1603"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                Vancutsem et al., 2021
              </Link>{" "}
              ) are analyzed using TMF classifications. In these zones, forest
              cover is defined as a combination of undisturbed and
              non-fire-related degraded forest. Non-fire degradation is not
              considered a loss under TFFF rules; therefore, these areas are
              classified as remaining forest.
            </p>
            <p>
              Subtropical regions located outside the TMF dataset extent are
              analyzed using the Hansen Tree Cover dataset using the same
              process as in the Tree Cover Loss Estimate. The combination of
              TMF-derived tropical baselines and Hansen-derived subtropical
              baselines ensures full geographic coverage across all TFFF
              countries.
            </p>
            <Br />
            <b>b. Deforestation</b>
            <p>
              Annual deforestation in tropical regions is calculated by
              comparing total forest area (undisturbed plus non-fire degraded
              forest) between the current year and the previous year using TMF
              data. A reduction in forest area is classified as deforestation.
              In subtropical regions, deforestation is calculated identically to
              the GFW-based method, as these areas rely on the Hansen dataset.
            </p>
            <Br />
            <b>c. Degradation</b>
            <p>
              Degradation is identified in tropical regions by intersecting the
              TMF degraded forest class with the MODIS burned area product. Only
              areas confirmed by both datasets as burned and classified as
              degraded are included in the degradation category, in accordance
              with TFFF definitions that consider only fire-related degradation.
              In subtropical regions, fire-related degradation is assessed using
              the Hansen-based fire loss data in the same manner as the Tree
              Cover Loss Estimate.
            </p>
            <Br />

            <Br></Br>
            <b>Feedback</b>
            <p>
              We are continuing to refine our methodology and would welcome any
              feedback at{" "}
              <Link
                href="mailto:tushar.bharadwaj@plant-for-the-planet.org"
                className="underline text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                tushar.bharadwaj@plant-for-the-planet.org
              </Link>
              .
            </p>
          </div>
          <Br />
          {/* <div className="text-center md:text-left">
            <Button
              href="https://docs.google.com/document/d/1-WlaepOLsm4P6F603NSfyc_ffaoWTeLTfG1hvJayfp4/edit?usp=sharing"
              type="link"
              external
            >
              Detailed Methodology
            </Button>
          </div> */}
        </div>
        <Br />
        <Hr />
        <Br />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="shrink">
            <h2 className="font-bold typo-h2">Data Access</h2>
            <Br />
            <div className="typo-p">
              <p>
                Access all country investment tracker and rainforest country
                financial data in a Google Sheet.
              </p>
            </div>
          </div>
          <Button
            href="https://docs.google.com/spreadsheets/d/13MUmpCrbldgWTlNRIvq58N3O721_ufP7rTyNxX1V0Vk/edit?gid=1842175288#gid=1842175288"
            type="link"
            external
          >
            Access Data
          </Button>
        </div>
      </div>
      <Br cn="hidden lg:block" />
    </div>
  );
}
