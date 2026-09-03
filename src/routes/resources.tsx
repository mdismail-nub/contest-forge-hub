import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, BookOpen, Code2, GraduationCap, ListChecks, Map } from "lucide-react";

import { CtaFooter } from "@/components/landing/cta-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useContentRealtime } from "@/hooks/use-content-realtime";
import { resourcesQueryOptions } from "@/lib/content-queries";

const title = "Resources — Competitive Coders";
const description =
  "Curated problem ladders, editorials, contest templates and courses to level up your competitive programming across Codeforces, LeetCode and CodeChef.";

const categoryIcon: Record<string, typeof BookOpen> = {
  Ladder: ListChecks,
  Editorial: BookOpen,
  Template: Code2,
  Course: GraduationCap,
  Roadmap: Map,
  "Data Structures": Code2,
  Algorithms: Code2,
  "Competitive Programming": ListChecks,
  "Interview Prep": GraduationCap,
};

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://contest-forge-hub.lovable.app/resources" },
    ],
    links: [{ rel: "canonical", href: "https://contest-forge-hub.lovable.app/resources" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(resourcesQueryOptions),
  component: ResourcesPage,
});

function ResourcesPage() {
  useContentRealtime();
  const { data, isLoading } = useQuery(resourcesQueryOptions);
  const resources = data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="px-4 pt-16 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Learning vault
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
              Curated resources for every rating.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Structured ladders, editorial breakdowns and contest-ready templates — maintained by
              the Competitive Coders community.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-60 rounded-[24px]" />)
              : resources.map((resource) => {
                  const Icon = categoryIcon[resource.category] ?? BookOpen;
                  return (
                    <a
                      key={resource.id}
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group glass-panel flex flex-col justify-between rounded-[24px] border border-border/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-ambient)]"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground">
                            {resource.level}
                          </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          {resource.category}
                        </p>
                        <h2 className="text-base font-bold tracking-tight text-foreground">
                          {resource.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {resource.description}
                        </p>
                        {(resource.author || resource.platform) && (
                          <p className="text-xs font-medium text-muted-foreground">
                            {[resource.author, resource.platform].filter(Boolean).join(" • ")}
                          </p>
                        )}
                      </div>
                      <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                        Open resource
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  );
                })}
          </div>

          {!isLoading && resources.length === 0 && (
            <p className="mx-auto mt-6 max-w-6xl rounded-[24px] border border-dashed border-border/80 p-10 text-center text-sm text-muted-foreground">
              Resources are being curated — check back soon.
            </p>
          )}
        </section>
      </main>
      <CtaFooter />
    </div>
  );
}
