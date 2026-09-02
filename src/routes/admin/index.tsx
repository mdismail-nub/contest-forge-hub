import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, LibraryBig, Radio, Timer } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { contestsQueryOptions, resourcesQueryOptions } from "@/lib/content-queries";
import { effectiveStatus, formatDhaka } from "@/lib/content";
import { useContentRealtime } from "@/hooks/use-content-realtime";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin dashboard — Competitive Coders" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

function StatCard({
  label,
  value,
  icon: Icon,
  loading,
}: {
  label: string;
  value: number;
  icon: typeof CalendarDays;
  loading: boolean;
}) {
  return (
    <div className="rounded-[20px] border border-border/80 bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-8 w-16" />
      ) : (
        <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
          {value}
        </p>
      )}
    </div>
  );
}

function AdminDashboard() {
  useContentRealtime();
  const contests = useQuery(contestsQueryOptions);
  const resources = useQuery(resourcesQueryOptions);

  const rows = contests.data ?? [];
  const upcoming = rows.filter((c) => effectiveStatus(c) === "upcoming");
  const live = rows.filter((c) => effectiveStatus(c) === "live");
  const resourceRows = resources.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of everything published on the public site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total contests"
          value={rows.length}
          icon={CalendarDays}
          loading={contests.isLoading}
        />
        <StatCard
          label="Upcoming"
          value={upcoming.length}
          icon={Timer}
          loading={contests.isLoading}
        />
        <StatCard label="Live now" value={live.length} icon={Radio} loading={contests.isLoading} />
        <StatCard
          label="Resources"
          value={resourceRows.length}
          icon={LibraryBig}
          loading={resources.isLoading}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[20px] border border-border/80 bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-foreground">Next contests</h2>
            <Link to="/admin/contests" className="text-xs font-semibold text-primary">
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {contests.isLoading &&
              [0, 1, 2].map((i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
            {!contests.isLoading && upcoming.length === 0 && (
              <p className="text-sm text-muted-foreground">No upcoming contests scheduled.</p>
            )}
            {upcoming.slice(0, 5).map((contest) => (
              <div
                key={contest.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{contest.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{contest.platform}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDhaka(contest.starts_at)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-border/80 bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-foreground">Recent resources</h2>
            <Link to="/admin/resources" className="text-xs font-semibold text-primary">
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {resources.isLoading &&
              [0, 1, 2].map((i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
            {!resources.isLoading && resourceRows.length === 0 && (
              <p className="text-sm text-muted-foreground">No resources published yet.</p>
            )}
            {resourceRows.slice(0, 5).map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{resource.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{resource.category}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDhaka(resource.created_at, false)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
