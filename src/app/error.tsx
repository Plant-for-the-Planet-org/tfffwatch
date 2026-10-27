"use client";

import { Logo } from "@/components/Header";
import { Spacer } from "@/components/ui/layout";
import { PageError, parseError } from "@/utils/errors";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
}: // reset,
{
  error: PageError;
  reset: () => void;
}) {
  const { code, message, details } = parseError(error);

  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 outer-padding-3 bg-white z-50">
      <div className="rounding-lg bg-primary-light h-full">
        <div className="h-full flex flex-col items-center justify-center">
          <Spacer />
          <Logo />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Image
            className="p-4"
            width={352}
            height={256}
            src={
              code === "404" ? "/assets/error-404.png" : "/assets/error-500.png"
            }
            alt=""
          />
          <Spacer />
          <Spacer />
          <div className="text-center max-w-xl p-3">
            <h1 className="typo-h2 font-bold">{message}</h1>
            <Spacer />
            <p className="typo-p">{details}</p>
          </div>
          {/* <p >{message}</p>
          {details && <p className="mt-2 text-sm text-gray-500">{details}</p>}
          <button
            onClick={() => reset()}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try Again
          </button> */}
        </div>
      </div>
    </div>
  );
}
