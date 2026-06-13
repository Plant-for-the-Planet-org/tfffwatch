import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Project Card surface — the only Card the app imports. Covers the ~30 repeated
// section/card shells. Plain styled element (shadcn Card is non-radix); variants
// map to the existing tokens so the look is unchanged.
const cardVariants = cva("", {
  variants: {
    variant: {
      // bg-primary-light / secondary-light + outer-rounding + outer-padding-3
      solid: "bg-primary-light outer-rounding outer-padding-3",
      solidSecondary: "bg-secondary-light outer-rounding outer-padding-3",
      // white + subtle border (news/policy/press content cards)
      content: "bg-white border border-primary-medium-light rounding-xl padding-3",
      // neutral bordered
      bordered: "border border-base-gray rounding-xl padding-3",
      // chart surface
      chart: "bg-background border border-primary-light rounding-lg outer-padding-3",
      plain: "",
    },
  },
  defaultVariants: { variant: "content" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ variant, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}
