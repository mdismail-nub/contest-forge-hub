import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PenUnderlineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function PenUnderline({ children, className, delay = 0 }: PenUnderlineProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use IntersectionObserver to animate when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block whitespace-nowrap mx-1 group/pen", className)}
    >
      <span className="relative z-10 text-serif-accent italic">{children}</span>
      <svg
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute -bottom-2.5 left-[-2%] w-[104%] h-3.5 sm:h-4.5 overflow-visible text-primary select-none drop-shadow-[0_1px_3px_rgba(0,102,255,0.3)] transition-transform duration-300 group-hover/pen:scale-y-110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Top pen-drawn stroke line */}
        <path
          d="M 2.5 8 C 42 4.5, 115 3.8, 162 6.5 C 176 7.3, 190 7.8, 197.5 9"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: `${delay + 0.15}s` }}
          className={cn("opacity-95", isVisible ? "pen-stroke-primary" : "opacity-0")}
        />
        {/* Bottom pen-drawn stroke line with natural offset and pressure curve */}
        <path
          d="M 9 18 C 48 14.5, 118 13.8, 160 16.2 C 174 17, 184 17.6, 191.5 18.5"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: `${delay + 0.45}s` }}
          className={cn("opacity-85", isVisible ? "pen-stroke-secondary" : "opacity-0")}
        />
      </svg>
    </span>
  );
}
