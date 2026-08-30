import { Medal } from "lucide-react";

import { leaderboard } from "./data";

export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel overflow-hidden rounded-2xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-6 py-5">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold tracking-tight">Season leaderboard</h2>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                Updated after every rated round
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
              <Medal className="h-3.5 w-3.5" /> Season 12
            </span>
          </div>

          <ul className="divide-y divide-border">
            {leaderboard.map((row) => (
              <li
                key={row.handle}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-accent/50"
              >
                <span className="w-6 shrink-0 font-mono text-sm text-muted-foreground">
                  {row.rank}
                </span>
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    {row.handle.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-sm">{row.handle}</span>
                    <span className="block text-xs text-muted-foreground">{row.country}</span>
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-sm font-semibold tabular-nums">
                    {row.rating}
                  </span>
                  <span
                    className={
                      row.delta >= 0
                        ? "block text-xs font-medium text-primary"
                        : "block text-xs font-medium text-destructive"
                    }
                  >
                    {row.delta >= 0 ? "+" : "−"}
                    {Math.abs(row.delta)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
