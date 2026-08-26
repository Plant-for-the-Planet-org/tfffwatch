import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Typography wrappers built on the project's existing `typo-*` scale
// (src/styles/dynamics.css). The app should import these instead of repeating
// `font-bold typo-h2` / `typo-p` / `text-center text-foreground` inline.

const headingVariants = cva("", {
  variants: {
    level: {
      1: "typo-h1",
      2: "typo-h2",
      3: "typo-h3",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    tone: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary-dark",
    },
  },
  defaultVariants: { level: 2, weight: "bold", align: "left", tone: "default" },
});

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  /** Render a different heading tag than the visual level (a11y). */
  as?: "h1" | "h2" | "h3" | "h4";
}

export function Heading({
  level = 2,
  weight,
  align,
  tone,
  as,
  className,
  ...props
}: HeadingProps) {
  const Tag = (as ?? (`h${level}` as "h1" | "h2" | "h3")) as React.ElementType;
  return (
    <Tag
      className={cn(headingVariants({ level, weight, align, tone }), className)}
      {...props}
    />
  );
}

const textVariants = cva("typo-p", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "",
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary-dark",
    },
  },
  defaultVariants: { align: "left", weight: "normal", tone: "default" },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export function Text({
  align,
  weight,
  tone,
  as = "p",
  className,
  ...props
}: TextProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(textVariants({ align, weight, tone }), className)}
      {...props}
    />
  );
}

// Small print (captions, helper text). Smaller than the typo-p base.
export function Muted({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

// Inline label / eyebrow.
export function Label({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-sm font-semibold text-base-text", className)}
      {...props}
    />
  );
}
