import React from "react";

import ccLogo from "@/assets/cc-logo.png.asset.json";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

const sizeClasses = {
  sm: "h-5 sm:h-6",
  md: "h-7 sm:h-8 md:h-9",
  lg: "h-9 sm:h-11 md:h-12",
  xl: "h-12 sm:h-14 md:h-16",
};

/**
 * Official Competitive Coders wordmark. The uploaded brand asset is used
 * as-is — never recreated, recolored, or replaced with text.
 */
export function CompetitiveCodersLogo({ className, size = "md", alt = "Competitive Coders" }: LogoProps) {
  return (
    <img
      src={ccLogo.url}
      alt={alt}
      width={1920}
      height={628}
      decoding="async"
      className={cn("w-auto max-w-full select-none object-contain", sizeClasses[size], className)}
    />
  );
}
