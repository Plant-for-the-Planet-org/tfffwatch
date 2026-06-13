import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Layout / container wrappers built on the project's existing spacing tokens
// (src/styles/dynamics.css: padding-3, outer-padding-3, outer-rounding,
// rounding-*, website-container). Use these instead of repeating flex/grid/
// padding className strings and <Br /> across the app.

// Vertical rhythm — replaces the 200+ <Br /> usages.
const spacerVariants = cva("block w-full", {
  variants: {
    size: {
      sm: "h-2 md:h-3",
      md: "h-3 md:h-4 xl:h-5", // matches the legacy Br default
      lg: "h-6 md:h-8 xl:h-10",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}

export function Spacer({ size, className, ...props }: SpacerProps) {
  return (
    <div aria-hidden className={cn(spacerVariants({ size }), className)} {...props} />
  );
}

const stackVariants = cva("flex flex-col", {
  variants: {
    gap: { none: "gap-0", sm: "gap-2", md: "gap-3 md:gap-4", lg: "gap-4 md:gap-6" },
    align: { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" },
  },
  defaultVariants: { gap: "md", align: "stretch" },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export function Stack({ gap, align, className, ...props }: StackProps) {
  return <div className={cn(stackVariants({ gap, align }), className)} {...props} />;
}

const rowVariants = cva("flex flex-wrap", {
  variants: {
    justify: {
      start: "justify-start",
      center: "justify-center",
      between: "justify-between",
      end: "justify-end",
    },
    align: { start: "items-start", center: "items-center", end: "items-end", baseline: "items-baseline" },
    gap: { none: "gap-0", sm: "gap-2", md: "gap-3 md:gap-4", lg: "gap-4 md:gap-5 xl:gap-6" },
    nowrap: { true: "flex-nowrap" },
  },
  defaultVariants: { justify: "start", align: "center", gap: "md" },
});

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {}

export function Row({ justify, align, gap, nowrap, className, ...props }: RowProps) {
  return (
    <div className={cn(rowVariants({ justify, align, gap, nowrap }), className)} {...props} />
  );
}

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
    },
    gap: { sm: "gap-2 md:gap-3", md: "gap-3 md:gap-4 xl:gap-5", lg: "gap-4 md:gap-6 xl:gap-8" },
  },
  defaultVariants: { cols: 3, gap: "md" },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export function Grid({ cols, gap, className, ...props }: GridProps) {
  return <div className={cn(gridVariants({ cols, gap }), className)} {...props} />;
}

// Page-width centered container (replaces .website-container usage + the
// pass-through ResponsiveContainer).
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("website-container", className)} {...props} />;
}

// Padded/rounded section surface — covers the ~30 repeated card/section shells.
const sectionVariants = cva("", {
  variants: {
    surface: {
      none: "",
      primary: "bg-primary-light",
      secondary: "bg-secondary-light",
      white: "bg-white",
    },
    padding: { none: "", sm: "padding-2", md: "padding-3", outer: "outer-padding-3" },
    rounding: { none: "", outer: "outer-rounding", lg: "rounding-lg", xl: "rounding-xl" },
    border: { none: "", base: "border border-base-gray", primary: "border border-primary-light" },
  },
  defaultVariants: { surface: "none", padding: "outer", rounding: "outer", border: "none" },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {}

export function Section({ surface, padding, rounding, border, className, ...props }: SectionProps) {
  return (
    <div className={cn(sectionVariants({ surface, padding, rounding, border }), className)} {...props} />
  );
}
