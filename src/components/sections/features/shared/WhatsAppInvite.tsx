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
        <h2 className="text-center font-bold typo-h2">Join the Conversation</h2>
        <Spacer />
        <p className="text-center typo-p">
          Stay in the loop with latest on TFFF Updates and policy news - right
          in your pocket
        </p>
        <Spacer />
        <Button
          type="link"
          external
          href="https://chat.whatsapp.com/IpyHiUsJRHwBaiRjkTWa6T?mode=wwt"
        >
          Join Our WhatsApp Group
        </Button>
      </div>
      <Spacer />
      <Spacer />
    </div>
  );
}
