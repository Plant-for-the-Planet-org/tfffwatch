import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default async function WhatsAppInvite() {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3">
      <Br />
      <Br />
      <div className="flex flex-col items-center">
        <Image
          height={100}
          width={100}
          className="text-center"
          src="/assets/WhatsApp.png"
          alt="WhatsApp Icon"
        />
        <Br />
        <h2 className="text-center font-bold typo-h2">Join the Conversation</h2>
        <Br />
        <p className="text-center typo-p">
          Stay in the loop with latest on TFFF Updates and policy news - right
          in your pocket
        </p>
        <Br />
        <Button
          type="link"
          external
          href="https://chat.whatsapp.com/IpyHiUsJRHwBaiRjkTWa6T?mode=wwt"
        >
          Join Our WhatsApp Group
        </Button>
      </div>
      <Br />
      <Br />
    </div>
  );
}
