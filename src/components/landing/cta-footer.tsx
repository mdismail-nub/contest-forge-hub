import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Code2, Facebook, Send, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMMUNITY_FACEBOOK_URL } from "./data";
import { CompetitiveCodersLogo } from "./logo";

const membersOnOrbit = [
  {
    top: "18%",
    left: "32%",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    label: "Div 1",
  },
  {
    top: "14%",
    left: "68%",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    label: "ICPC",
  },
  {
    top: "42%",
    left: "14%",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
    label: "Master",
  },
  {
    top: "40%",
    left: "84%",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80",
    label: "IOI",
  },
  {
    top: "72%",
    left: "28%",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80",
    label: "Candidate",
  },
  {
    top: "76%",
    left: "70%",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=80&auto=format&fit=crop&q=80",
    label: "Specialist",
  },
];

const platformLinks = [
  { label: "Upcoming Contests", href: "#contests" },
  { label: "Platform Focus", href: "#features" },
  { label: "Community Hub", href: "#community" },
  { label: "Editorial Vault", href: "https://youtube.com/@competitivecoders", external: true },
];

const socialLinks = [
  { label: "Facebook Group", href: "https://www.facebook.com/share/g/1DFfRP4NY5/" },
  { label: "Facebook Page", href: "https://www.facebook.com/share/197aN9pJz4/" },
  { label: "YouTube", href: "https://youtube.com/@competitivecoders" },
  { label: "Telegram", href: "https://t.me/competitivecoders" },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029VbDaODnFXUuk3Ssnck3K" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/competitive-coders/" },
];

export function CtaFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer
      id="community"
      className="relative mt-20 border-t border-border/60 bg-muted/20 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* TOP ELEVATED ORBIT CTA CARD */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-border/80 bg-card p-8 sm:p-12 md:p-14 shadow-sm">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6 z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Join Section 0
              </span>

              <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
                Join our Global Community
              </h2>

              <p className="max-w-md text-sm text-muted-foreground leading-relaxed sm:text-base">
                Connect with 48,000+ passionate programmers for daily discussions, contest
                post-mortems, and algorithm mastery.
              </p>

              <div className="pt-2">
                <Button
                  size="lg"
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold px-6 py-2.5 h-11 text-xs sm:text-sm gap-2 shadow-xs group"
                  asChild
                >
                  <a href={COMMUNITY_FACEBOOK_URL} target="_blank" rel="noreferrer">
                    <span>Join the community</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Concentric Orbit Rings & Avatars */}
            <div className="relative flex items-center justify-center lg:col-span-6 h-64 sm:h-72 w-full select-none overflow-hidden">
              <div className="absolute h-28 w-28 rounded-full border border-dashed border-border/80" />
              <div className="absolute h-48 w-48 rounded-full border border-dashed border-border/70" />
              <div className="absolute h-64 w-64 rounded-full border border-dashed border-border/50" />
              <div className="absolute h-80 w-80 rounded-full border border-dashed border-border/30" />

              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card shadow-sm text-primary">
                <Code2 className="h-7 w-7 stroke-[2.2]" />
              </div>

              {membersOnOrbit.map((member, i) => (
                <div
                  key={i}
                  style={{ top: member.top, left: member.left }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125"
                >
                  <div className="relative group cursor-pointer">
                    <img
                      src={member.img}
                      alt="Coder avatar"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-2 border-background object-cover shadow-sm ring-1 ring-border/80"
                    />
                    <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground/90 px-1.5 py-0.5 text-[0.6rem] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                      {member.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 4-COLUMN MINIMAL FOOTER NAVIGATION */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            <a href="#" aria-label="Home">
              <CompetitiveCodersLogo size="md" />
            </a>
            <p className="max-w-xs text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
              The open platform empowering competitive coders to master algorithms, climb global
              ladders, and excel in competitive programming.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="text-muted-foreground transition-colors hover:text-foreground inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    {item.external && <ArrowUpRight className="h-3 w-3 opacity-60" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Socials
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Newsletter
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Receive contest updates, problem solutions, and early access to rounds.
            </p>

            <NewsletterForm source="footer" />
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Competitive Coders · All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="font-mono text-[0.7rem] text-muted-foreground/80">
              Built for algorithmic problem solvers
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href="https://youtube.com/@competitivecoders"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://t.me/competitivecoders"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.facebook.com/share/g/1DFfRP4NY5/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
