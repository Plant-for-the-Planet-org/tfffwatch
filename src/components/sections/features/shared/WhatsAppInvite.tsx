import { Spacer } from "@/components/ui/layout";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default async function WhatsAppInvite() {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3">
      <Spacer />
      <Spacer />
      <div className="flex flex-col items-center">
        <Image
          height={100}
          width={100}
          className="text-center"
          src="/assets/WhatsApp.png"
          alt="WhatsApp Icon"
        />
        <Spacer />
        <h2 className="text-center font-bold typo-h2">
          Rapid TFFF News Updates
        </h2>
        <Spacer />
        <p className="text-center typo-p">
          Short updates for key TFFF developments, about twice a month
        </p>
        <Spacer />
        <Button
          type="link"
          external
          href="https://chat.whatsapp.com/IpyHiUsJRHwBaiRjkTWa6T?mode=wwt"
        >
          Join the channel
        </Button>
      </div>
      <Spacer />
      <Spacer />
    </div>
  );
}
