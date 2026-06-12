import Br from "@/components/ui/Br";
import Hr from "@/components/ui/Hr";
import Image from "next/image";
import Link from "next/link";

export default function HowTFFFWorksContent() {
  return (
    <div className="extra-padding-x-4">
      <div>
        <h2 className="font-bold typo-h2 flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src="/assets/howtfffworks-purpose.svg"
            alt="Purpose"
          />
          Purpose
        </h2>
        <Br />
        <div className="typo-p">
          <p>
            First introduced at COP28, the TFFF proposes raising $125 billion in
            capital. The fund’s core objective is to reward tropical forest
            countries that are already maintaining or reducing deforestation
            rates but require ongoing financial support to continue doing so.
            Although more than 140 countries{" "}
            <Link
              className="text-primary-dark font-semibold underline"
              href="https://www.unccd.int/news-stories/statements/glasgow-leaders-declaration-forests-and-land-use"
              rel="noopener noreferrer"
              target="_blank"
            >
              pledged at COP26 in Glasgow
            </Link>{" "}
            to end deforestation by 2030, current deforestation rates show that
            we are not on track to meet this goal. The TFFF seeks to address
            this shortfall by offering a long-term, performance-based funding
            model that rewards forest conservation.
          </p>
          <Br />
          <p>
            Under the proposed model, tropical forest countries can receive
            annual payments of $4 per hectare of preserved forest. However,
            payments are subject to deductions:
          </p>
          <Br />
          <ul className="typo-p list-disc ml-4.5">
            <li>$400-$800 are deducted per hectare deforested.</li>
            <li>$140 per hectare degraded.</li>
          </ul>
        </div>
      </div>
      <Br />
      <Br />
      <Hr />
      <Br />
      <Br />
      <div>
        <h2 className="font-bold typo-h2 flex items-center gap-2">
          <div className="shrink-0 rounded-full bg-black">
            <Image
              className="h-4 w-4 m-2"
              width={32}
              height={32}
              src="/assets/howtfffworks-structure-governance.svg"
              alt="Structure and Governance"
            />
          </div>
          Structure and Governance
        </h2>
        <Br />
        <div className="typo-p">
          <p>The TFFF is structured as a two-arm facility.</p>
          <Br />
          <ol className="typo-p list-decimal ml-4.5">
            <li>
              The Tropical Forest Investment Fund (TFIF): will serve as the
              financial engine, which will mobilize capital through a blended
              finance model and invest it in low-risk, fixed-income instruments
              such as government bonds.
            </li>
            <li>
              The Tropical Forest Facility (referred to simply as &ldquo;the
              Facility&rdquo;): will oversee the implementation of the reward
              system that channels payments to eligible tropical forest
              countries (TFCs).
            </li>
          </ol>
          <Br />
          <p>
            Both these arms have different legal identities, governance
            structures, and operational mandates. The Facility and the TFIF will
            have their own governance structures and separate charters, which
            will be mutually consistent and cross-referenced.
          </p>
          {/* <p>
            These two arms will be coordinated by a central secretariat that
            ensures coherence between fund management and conservation outcomes.
            Each arm will be managed by separate trustees to maintain
            independent financial oversight, though a single institution may
            perform both roles if strict separation of accounts is upheld
          </p> */}
        </div>
      </div>
      <Br />
      <Br />
      <Hr />
      <Br />
      <Br />
      <div>
        <h2 className="font-bold typo-h2 flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src="/assets/howtfffworks-financing.svg"
            alt="Financing"
          />
          Financing
        </h2>
        <Br />
        <div className="typo-p">
          <p>
            The TFFF is intended to operate as a blended finance model, with two
            parts: a <b>$25 billion sponsor tranche</b> and a{" "}
            <b>$100 billion senior debt tranche</b>.
          </p>
          <Br />
          <ul className="typo-p list-disc ml-4.5">
            <li>
              The <b>$25 billion sponsor tranche</b> will consist of long-term
              loans, guarantees, or grants provided by high-income countries and
              other supporters, with repayment terms tied to the yield of
              long-term US Treasury notes.
            </li>
            <li>
              The remaining <b>$100 billion senior debt tranche</b> will be
              raised by issuing bonds to institutional investors. It aims to
              offer returns similar to those of multilateral development banks
              (MDBs). The fund will be independently managed and will engage The
              World Bank as its treasury and financial manager.
            </li>
          </ul>
        </div>
      </div>
      <Br />
      <Br />
      <Hr />
      <Br />
      <Br />
      <div>
        <h2 className="font-bold typo-h2 flex items-center gap-2">
          <div className="shrink-0 rounded-full bg-black">
            <Image
              className="h-4 w-4 m-2"
              width={32}
              height={32}
              src="/assets/howtfffworks-investment-strategy.svg"
              alt="Investment Strategy"
            />
          </div>
          Investment Strategy
        </h2>
        <Br />
        <div className="typo-p">
          <p>
            TFIF proposes to adopt an investment strategy that primarily seeks
            climate and sustainability-related investments in ODA-eligible
            countries (e.g., green, blue, or sustainable bonds) to qualify under{" "}
            <Link
              className="text-primary-dark font-semibold underline"
              href="https://unfccc.int/sites/default/files/resource/UNFCCC_NCQG2023_flyer_web.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Collective Quantificatied Goal
            </Link>{" "}
            (NCQG) criteria, secondarily prioritizes ODA-eligible vanilla
            sovereign debt excluding items on a negative exclusion list, and may
            also invest in instruments issued by non-ODA eligible countries and
            developed market economies.
          </p>
        </div>
      </div>
      <Br />
      <Br />
      <Hr />
      <Br />
      <Br />
      <div>
        <h2 className="font-bold typo-h2 flex items-center gap-2">
          <div className="shrink-0 rounded-full bg-black">
            <Image
              className="h-4 w-4 m-2"
              width={32}
              height={32}
              src="/assets/howtfffworks-impact-significance.svg"
              alt="Expected Impact and Broader Significance"
            />
          </div>
          Expected Impact and Broader Significance
        </h2>
        <Br />
        <div className="typo-p">
          <p>
            The TFFF represents a major shift in how the global community
            approaches financing for forest conservation. Its
            simplicity—offering a flat payment per hectare for preserved
            forests—and its strong penalty mechanism (with a 100:1 ratio for
            deforestation losses) provide clear and transparent incentives for
            forest countries. This contrasts with more complex mechanisms like
            REDD+, which rely on intricate carbon accounting, or payment for
            ecosystem services (PES) schemes that focus on specific management
            practices.
          </p>
          <Br />
          <p>
            The TFFF has the potential to become the largest single source of
            conservation finance in history. Its expected contributions to
            global climate stability, biodiversity protection, and improved
            livelihoods for forest-dependent communities mark it as a
            potentially transformative model.
          </p>
        </div>
      </div>
      <Br />
      <Br />
      <Hr />
      <Br />
      <Br />
      <div className="bg-white padding-3 rounded-md text-center typo-p">
        <p>
          “
          <i>
            If the TFFF achieves its ambition, it will be a turning point in
            global forest finance.
          </i>
          ”
        </p>
        <p className="font-[600]">
          – Carlos Rittl, Wildlife Conservation Society
        </p>
      </div>
    </div>
  );
}
