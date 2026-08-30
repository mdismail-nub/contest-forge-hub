import { ArrowUpRight, Flame, Timer, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { avatarStack, contests, leaderboard } from "./data";
import { pad, useCountdown } from "./use-countdown";

function CountdownCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/70 px-2 py-2 text-center">
      <div className="font-mono text-lg font-semibold tabular-nums sm:text-xl">{value}</div>
      <div className="mt-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
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
    <div className="glass-panel rounded-2xl p-5 shadow-[var(--shadow-ambient)]">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            <Timer className="h-3.5 w-3.5 shrink-0" /> Next contest
          </p>
          <h3 className="mt-1 truncate text-base font-semibold">{next.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {next.difficulty}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {["Days", "Hours", "Min", "Sec"].map((label, index) => (
          <CountdownCell key={label} value={cells[index]!} label={label} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex -space-x-2">
            {avatarStack.slice(0, 4).map((initials) => (
              <span
                key={initials}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-card bg-secondary text-[0.6rem] font-semibold text-secondary-foreground"
              >
                {initials}
              </span>
            ))}
          </div>
          <span className="truncate text-xs text-muted-foreground">
            {next.participants.toLocaleString()} registered
          </span>
        </div>
        <Button size="sm" variant="electric" className="shrink-0 rounded-lg">
          Register
        </Button>
      </div>
    </div>
  );
}

function LeaderboardPreview() {
  return (
    <div className="glass-panel float-slow rounded-2xl p-5 shadow-[var(--shadow-ambient)]">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h3 className="min-w-0 truncate text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Live leaderboard
        </h3>
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> live
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {leaderboard.map((row) => (
          <li
            key={row.handle}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-accent/60"
          >
            <span className="w-5 shrink-0 font-mono text-xs text-muted-foreground">{row.rank}</span>
            <span className="min-w-0 truncate font-mono text-sm">{row.handle}</span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="font-mono text-sm font-semibold tabular-nums">{row.rating}</span>
              <span
                className={
                  row.delta >= 0
                    ? "flex items-center gap-0.5 text-xs font-medium text-primary"
                    : "flex items-center gap-0.5 text-xs font-medium text-destructive"
                }
              >
                {row.delta >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(row.delta)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
      <div className="glow-orb -top-32 left-[-10%] h-80 w-80" aria-hidden="true" />
      <div className="glow-orb right-[-12%] top-24 h-96 w-96 opacity-25" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <Flame className="h-3.5 w-3.5 text-primary" />
            48,000+ coders shipping solutions weekly
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Sharpen your <span className="text-primary">algorithms</span> with a{" "}
            <span className="text-serif-accent">relentless</span> community of competitive coders.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Weekly rated contests, curated problem ladders, and mentors who actually review your
            code. One place to train, compete, and climb the global rankings.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="electric" size="xl">
              Join Community <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#contests">Explore Contests</a>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { value: "48K+", label: "Active members" },
              { value: "320+", label: "Contests hosted" },
              { value: "1.9M", label: "Solutions judged" },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="text-xl font-semibold tracking-tight sm:text-2xl">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-w-0 space-y-4">
          <CountdownWidget />
          <LeaderboardPreview />
          <div className="glass-panel grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
              <Users className="h-4 w-4" />
            </span>
            <p className="min-w-0 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">213 coders</span> joined a live editorial
              room in the last hour.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
