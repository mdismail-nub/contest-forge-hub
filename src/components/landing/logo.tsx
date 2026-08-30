import React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

/**
 * Competitive Coders Official Responsive SVG Wordmark
 *
 * Designed with custom geometric rounded letterforms, distinctive tall/descender stems,
 * clean circular curves, the signature < / > glyph, and responsive theme support.
 *
 * Automatically inherits the parent font color via `currentColor` for seamless
 * light / dark mode switching.
 */
export function CompetitiveCodersLogo({
  className,
  size = "md",
  alt = "competitive coders",
  ...props
}: LogoProps) {
  const sizeClasses = {
    sm: "h-5 sm:h-6 w-auto",
    md: "h-6 sm:h-7 md:h-8 w-auto",
    lg: "h-8 sm:h-10 md:h-11 w-auto",
    xl: "h-11 sm:h-14 md:h-16 w-auto",
  };

  return (
    <svg
      viewBox="0 0 940 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
      className={cn(
        "inline-block shrink-0 transition-colors duration-200 select-none",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <title>{alt}</title>
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="7.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ================= word 1: "competitive" ================= */}

        {/* 1. 'c' (x: 48) */}
        <path d="M 66 40 A 24 24 0 1 0 66 72" />

        {/* 2. 'o' (x: 104) */}
        <circle cx="104" cy="56" r="24" />

        {/* 3. 'm' (x: 145) */}
        <path d="M 145 80 L 145 32 M 145 44 C 148 35 157 32 166 32 C 177 32 182 38 182 48 L 182 80 M 182 44 C 185 35 194 32 203 32 C 214 32 219 38 219 48 L 219 80" />

        {/* 4. 'p' (x: 236) */}
        <path d="M 236 104 L 236 32 M 236 39 A 24 24 0 1 1 236 73" />

        {/* 5. 'e' (x: 280) */}
        <path d="M 278 56 L 324 56 A 23 23 0 0 0 279 51 A 23 23 0 0 0 320 71" />

        {/* 6. 't' with distinctive descender tail (x: 344) */}
        <path d="M 344 14 L 344 94 C 344 102 340 106 332 106 M 333 32 L 357 32" />

        {/* 7. 'i' (x: 374) */}
        <path d="M 374 32 L 374 80" />
        <circle cx="374" cy="17" r="4.2" fill="currentColor" stroke="none" />

        {/* 8. 't' tall ascender (x: 398) */}
        <path d="M 398 14 L 398 70 C 398 76 402 80 409 80 L 413 80 M 389 32 L 410 32" />

        {/* 9. 'i' (x: 430) */}
        <path d="M 430 32 L 430 80" />
        <circle cx="430" cy="17" r="4.2" fill="currentColor" stroke="none" />

        {/* 10. 'v' (x: 448) */}
        <path d="M 448 32 L 464 79 L 480 32" />

        {/* 11. 'e' (x: 496) */}
        <path d="M 494 56 L 540 56 A 23 23 0 0 0 495 51 A 23 23 0 0 0 536 71" />

        {/* ================= word 2: "coders" ================= */}

        {/* 12. 'c' (x: 588) */}
        <path d="M 606 40 A 24 24 0 1 0 606 72" />

        {/* 13. Brand glyph '</>' in place of 'o' (x: 620-664) */}
        {/* '<' */}
        <path d="M 632 42 L 620 56 L 632 70" strokeWidth="6.8" />
        {/* '/' */}
        <path d="M 646 36 L 638 76" strokeWidth="6.8" />
        {/* '>' */}
        <path d="M 652 42 L 664 56 L 652 70" strokeWidth="6.8" />

        {/* 14. 'd' (x: 722) */}
        <path d="M 722 14 L 722 80 M 722 73 A 24 24 0 1 1 722 39" />

        {/* 15. 'e' (x: 738) */}
        <path d="M 738 56 L 784 56 A 23 23 0 0 0 739 51 A 23 23 0 0 0 780 71" />

        {/* 16. 'r' (x: 802) */}
        <path d="M 802 80 L 802 32 M 802 46 C 806 37 814 32 824 33" />

        {/* 17. 's' (x: 848) */}
        <path d="M 850 41 C 847 35 839 32 831 34 C 823 36 820 41 821 46 C 823 54 849 52 851 62 C 852 70 845 78 834 79 C 825 79 819 75 817 68" />
      </g>
    </svg>
  );
}
