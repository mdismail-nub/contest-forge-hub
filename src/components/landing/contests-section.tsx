import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarClock, Gift, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useContentRealtime } from "@/hooks/use-content-realtime";
import { contestsQueryOptions } from "@/lib/content-queries";
import { effectiveStatus, formatDhaka, type ContestRow } from "@/lib/content";
import { avatarStack, COMMUNITY_FACEBOOK_URL, COMMUNITY_WHATSAPP_URL } from "./data";
import { PenUnderline } from "./pen-underline";
import { pad, useCountdownTo } from "./use-countdown";

function CountdownStrip({ startsAt }: { startsAt: string }) {
  const { days, hours, minutes, seconds, ready } = useCountdownTo(startsAt);
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
          className="rounded-xl border border-border/80 bg-background/80 px-2 py-1 font-bold text-foreground"
        >
          {value}
          <span className="ml-0.5 text-[0.65rem] font-normal text-muted-foreground">{unit}</span>
        </span>
      ))}
    </div>
  );
}

function ContestCard({ contest }: { contest: ContestRow }) {
  const status = effectiveStatus(contest);

  return (
    <article className="group glass-panel flex flex-col justify-between rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-ambient)] border border-border/80">
      <div>
        {contest.banner_url && (
          <img
            src={contest.banner_url}
            alt={`${contest.title} banner`}
            loading="lazy"
            className="mb-4 h-32 w-full rounded-2xl object-cover"
          />
        )}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {contest.platform}
            </p>
            <h3 className="mt-1.5 text-base font-bold tracking-tight text-foreground">
              {contest.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground">
            {contest.difficulty}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold text-primary">
            {status}
          </span>
          {contest.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary/80 px-2.5 py-0.5 font-mono text-[0.7rem] font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3.5 border-t border-border/70 pt-5">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <CalendarClock className="h-4 w-4 shrink-0 text-primary" />
          {status === "upcoming" ? (
            <CountdownStrip startsAt={contest.starts_at} />
          ) : (
            <span className="min-w-0 truncate">{formatDhaka(contest.starts_at)}</span>
          )}
        </div>
        {contest.prize && (
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Gift className="h-4 w-4 shrink-0 text-primary" />
            <span className="min-w-0 truncate">{contest.prize}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {avatarStack.slice(0, 4).map((initials) => (
                <span
                  key={initials}
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-card bg-secondary text-[0.55rem] font-bold text-secondary-foreground"
                >
                  {initials}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {contest.participants.toLocaleString()} joined
            </span>
          </div>
          <Button
            variant="electric"
            size="sm"
            className="rounded-full px-4 text-xs font-semibold"
            asChild
          >
            <a
              href={contest.external_url || COMMUNITY_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              Join Round
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ContestsSection() {
  useContentRealtime();
  const { data, isLoading } = useQuery(contestsQueryOptions);
  const contests = (data ?? []).filter((contest) => effectiveStatus(contest) !== "completed");

  return (
    <section id="contests" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Upcoming Contests
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl text-foreground">
              Your next <PenUnderline delay={0.1}>rating jump</PenUnderline> starts on the clock.
            </h2>
          </div>
          <Button
            variant="glass"
            size="sm"
            className="shrink-0 rounded-full px-4 font-semibold"
            asChild
          >
            <a href={COMMUNITY_WHATSAPP_URL} target="_blank" rel="noreferrer">
              Join Official Group <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-72 rounded-[24px]" />)
            : contests.map((contest) => <ContestCard key={contest.id} contest={contest} />)}
        </div>

        {!isLoading && contests.length === 0 && (
          <p className="mt-10 rounded-[24px] border border-dashed border-border/80 p-10 text-center text-sm text-muted-foreground">
            No rounds scheduled right now — join the community to hear first.
          </p>
        )}
      </div>
    </section>
  );
}
