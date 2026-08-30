import { ArrowUpRight, Braces, Github, Linkedin, Twitter, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";

const footerNav = [
  {
    title: "Platform",
    links: ["Contests", "Leaderboard", "Problem ladders", "Editorials"],
  },
  {
    title: "Community",
    links: ["Discord", "Mentorship", "Study pods", "Events"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Privacy", "Terms"],
  },
];

const socials = [
  { label: "GitHub", icon: Github },
  { label: "Twitter", icon: Twitter },
  { label: "LinkedIn", icon: Linkedin },
  { label: "YouTube", icon: Youtube },
];

export function CtaFooter() {
  return (
    <footer id="resources" className="scroll-mt-24 px-4 pb-10 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-navy-foreground sm:px-12 sm:py-20">
        <div className="glow-orb -right-20 -top-20 h-72 w-72 opacity-60" aria-hidden="true" />
        <div className="glow-orb -bottom-24 left-0 h-64 w-64 opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Start your first rated round{" "}
            <span className="text-serif-accent text-primary">this weekend.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
            Free forever for individual coders. Bring your handle, sync your platforms, and get your
            first mentor match in under five minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="electric" size="xl">
              Join Community <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button variant="onNavy" size="xl" asChild>
              <a href="#contests">Explore Contests</a>
            </Button>
          </div>
        </div>

        <div className="relative mt-16 grid gap-10 border-t border-navy-foreground/12 pt-10 md:grid-cols-[1.2fr_2fr]">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Braces className="h-4.5 w-4.5" />
              </span>
              <span className="truncate text-base font-semibold">
                Competitive<span className="text-primary">Coders</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-navy-foreground/60">
              The training ground for coders who want their rating graph to point up and to the
              right.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#top"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-navy-foreground/15 text-navy-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-navy-foreground/50">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-navy-foreground/75 transition-colors hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 grid gap-2 border-t border-navy-foreground/12 pt-6 text-xs text-navy-foreground/50 sm:grid-cols-[minmax(0,1fr)_auto]">
          <p>© {new Date().getFullYear()} Competitive Coders. All rights reserved.</p>
          <p className="font-mono">built for people who love {"{"}brackets{"}"}</p>
        </div>
      </div>
    </footer>
  );
}
