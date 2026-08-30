import { ArrowRight, CalendarClock, Gift, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { avatarStack, contests, type Contest } from "./data";
import { pad, useCountdown } from "./use-countdown";

function CountdownStrip({ startsInMs }: { startsInMs: number }) {
  const { days, hours, minutes, seconds, ready } = useCountdown(startsInMs);
  const parts: Array<[string, string]> = ready
    ? [
        [pad(days), "d"],
        [pad(hours), "h"],
        [pad(minutes), "m"],
        [pad(seconds), "s"],
      ]
    : [
        ["--", "d"],
        ["--", "h"],
        ["--", "m"],
        ["--", "s"],
      ];

  return (
    <div className="flex items-center gap-1.5 font-mono text-sm tabular-nums">
      {parts.map(([value, unit]) => (
        <span
          key={unit}
          className="rounded-lg border border-border/70 bg-background/70 px-2 py-1 font-semibold"
        >
          {value}
          <span className="ml-0.5 text-[0.65rem] font-normal text-muted-foreground">{unit}</span>
        </span>
      ))}
    </div>
  );
}

function ContestCard({ contest }: { contest: Contest }) {
  return (
    <article className="group glass-panel flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {contest.platform}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{contest.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {contest.difficulty}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {contest.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4 shrink-0 text-primary" />
          <CountdownStrip startsInMs={contest.startsInMs} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Gift className="h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0 truncate">{contest.prize}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex -space-x-2">
            {avatarStack.slice(0, 5).map((initials) => (
              <span
                key={initials}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-card bg-secondary text-[0.6rem] font-semibold text-secondary-foreground"
              >
                {initials}
              </span>
            ))}
          </div>
          <span className="flex min-w-0 items-center gap-1 truncate text-xs text-muted-foreground">
            <Users className="h-3 w-3 shrink-0" />
            {contest.participants.toLocaleString()}
          </span>
        </div>
        <Button variant="electric" size="sm" className="shrink-0 rounded-lg">
          Enter
        </Button>
      </div>
    </article>
  );
}

export function ContestsSection() {
  return (
    <section id="contests" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              Upcoming contests
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Your next <span className="text-serif-accent">rating jump</span> starts on the clock.
            </h2>
          </div>
          <Button variant="glass" className="shrink-0 rounded-xl" asChild>
            <a href="#leaderboard">
              View full calendar <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {contests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      </div>
    </section>
  );
}
