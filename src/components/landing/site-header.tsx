import { useEffect, useState } from "react";
import { Braces, Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMMUNITY_FACEBOOK_URL } from "@/components/landing/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Community", href: "#community" },
  { label: "Contests", href: "#contests" },
  { label: "Resources", href: "#resources" },
];

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return { dark, toggle: () => setDark((value) => !value) };
}

export function SiteHeader() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-panel border-x-0 border-t-0">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
              <Braces className="h-4.5 w-4.5" />
            </span>
            <span className="truncate text-base font-semibold tracking-tight">
              Competitive<span className="text-primary">Coders</span>
            </span>
          </a>

          <nav className="hidden items-center justify-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="glass"
              size="icon"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-xl"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="electric" className="hidden rounded-xl sm:inline-flex" asChild>
              <a href={COMMUNITY_FACEBOOK_URL} target="_blank" rel="noreferrer">
                Join Community
              </a>
            </Button>
            <Button
              variant="glass"
              size="icon"
              className="rounded-xl lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-border/60 transition-[max-height] duration-300 lg:hidden",
            open ? "max-h-80" : "max-h-0",
          )}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button variant="electric" className="mt-2 rounded-xl sm:hidden" asChild>
              <a href={COMMUNITY_FACEBOOK_URL} target="_blank" rel="noreferrer">
                Join Community
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
