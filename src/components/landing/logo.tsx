import React from "react";

import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl md:text-[1.65rem]",
  lg: "text-2xl sm:text-3xl md:text-[2rem]",
  xl: "text-3xl sm:text-4xl md:text-[2.5rem]",
};

/**
 * Competitive Coders text wordmark.
 * Rendered as real HTML text so it stays responsive, selectable, and
 * theme-aware. "Competitive" uses the brand navy; "Coders" uses electric blue.
 */
export function CompetitiveCodersLogo({ className, size = "md" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-display font-bold leading-none tracking-tight",
        sizeClasses[size],
        className,
      )}
      aria-label="Competitive Coders"
    >
      <span className="text-[var(--navy)] dark:text-[var(--foreground)]">Competitive</span>
      <span className="ml-[0.25em] text-[var(--electric)]">Coders</span>
    </span>
  );
}
