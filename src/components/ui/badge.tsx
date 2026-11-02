import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Project Badge / Chip — covers CountryListChips states + the card date badges.
const badge = cva("inline-flex items-center text-nowrap", {
  variants: {
    variant: {
      pledged: "border border-primary bg-primary-light text-base-text",
      unpledged: "border border-secondary bg-secondary-light text-base-text",
      selected: "border border-base-text bg-base-text text-white",
      overlay: "bg-black/70 backdrop-blur-md text-white",
      neutral: "border border-base-gray bg-white text-base-text",
    },
    size: {
      chip: "rounded-full px-5 py-1.5 text-sm",
      badge: "rounded-full px-3 py-1 text-xs",
    },
  },
  defaultVariants: { variant: "neutral", size: "badge" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ variant, size, className, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant, size }), className)} {...props} />;
}
