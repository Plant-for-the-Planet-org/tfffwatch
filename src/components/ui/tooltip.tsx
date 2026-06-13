"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./shadcn/tooltip";
import { cn } from "@/lib/utils";

// Project tooltip wrapper. App imports from here, never from ui/shadcn.
// `InfoTooltip` mirrors the old PersistentTooltip API (trigger + content),
// now keyboard- and screen-reader-accessible via Radix.
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };

export function InfoTooltip({
  trigger,
  content,
  className,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent className={cn(className)}>{content}</TooltipContent>
    </Tooltip>
  );
}
