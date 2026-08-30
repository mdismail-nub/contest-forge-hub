import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Flame, Timer, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { avatarStack, COMMUNITY_FACEBOOK_URL, contests } from "./data";
import { PenUnderline } from "./pen-underline";
import { pad, useCountdown } from "./use-countdown";

function CountdownCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/80 px-2.5 py-2.5 text-center transition-colors">
      <div className="font-mono text-lg font-bold tabular-nums sm:text-xl text-foreground">
        {value}
      </div>
      <div className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function CountdownWidget() {
  const next = contests[0]!;
  const { days, hours, minutes, seconds, ready } = useCountdown(next.startsInMs);
  const cells = ready
    ? [pad(days), pad(hours), pad(minutes), pad(seconds)]
    : ["--", "--", "--", "--"];

  return (
    <div className="glass-panel rounded-[24px] p-6 shadow-[var(--shadow-ambient)] border border-border/80">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Timer className="h-3.5 w-3.5 shrink-0" /> Next Contest
          </p>
          <h3 className="mt-1 truncate text-base font-bold tracking-tight text-foreground">
            {next.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground">
          {next.difficulty}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {["Days", "Hours", "Min", "Sec"].map((label, index) => (
          <CountdownCell key={label} value={cells[index]!} label={label} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border/60 pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex -space-x-2">
            {avatarStack.slice(0, 4).map((initials) => (
              <span
                key={initials}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-card bg-secondary text-[0.6rem] font-bold text-secondary-foreground"
              >
                {initials}
              </span>
            ))}
          </div>
          <span className="truncate text-xs font-medium text-muted-foreground">
            {next.participants.toLocaleString()} registered
          </span>
        </div>
        <Button
          size="sm"
          variant="electric"
          className="shrink-0 rounded-full px-4 font-semibold text-xs"
          asChild
        >
          <a href="#contests">Register</a>
        </Button>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
      <div className="glow-orb -top-32 left-[-10%] h-80 w-80" aria-hidden="true" />
      <div className="glow-orb right-[-12%] top-24 h-96 w-96 opacity-25" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <Flame className="h-3.5 w-3.5 text-primary" />
            48,000+ coders worldwide
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl text-foreground">
            Sharpen your <span className="text-primary">algorithms</span> with a{" "}
            <PenUnderline>relentless</PenUnderline> community.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Weekly rated contests, curated problem ladders, and peer mentorship to elevate your
            competitive programming rank.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              variant="electric"
              size="xl"
              className="rounded-full px-6 font-semibold shadow-xs"
              asChild
            >
              <a href={COMMUNITY_FACEBOOK_URL} target="_blank" rel="noreferrer">
                Join Community <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="glass" size="xl" className="rounded-full px-6 font-semibold" asChild>
              <a href="#contests">Explore Contests</a>
            </Button>
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-5">
            {[
              { value: "48K+", label: "Members" },
              { value: "320+", label: "Contests" },
              { value: "1.9M", label: "Submissions" },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs font-medium text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-w-0 space-y-4">
          <CountdownWidget />
          <div className="glass-panel grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl px-4 py-3 border border-border/70">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </span>
            <p className="min-w-0 text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">213 coders</span> joined a live
              editorial room in the last hour.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
