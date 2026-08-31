import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Code2, GraduationCap, ListChecks } from "lucide-react";

import { CtaFooter } from "@/components/landing/cta-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { resources, type Resource } from "@/components/landing/data";

const title = "Resources — Competitive Coders";
const description =
  "Curated problem ladders, editorials, contest templates and courses to level up your competitive programming across Codeforces, LeetCode and CodeChef.";

const categoryIcon: Record<Resource["category"], typeof BookOpen> = {
  Ladder: ListChecks,
  Editorial: BookOpen,
  Template: Code2,
  Course: GraduationCap,
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
  component: ResourcesPage,
});

function ResourcesPage() {
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
            {resources.map((resource) => {
              const Icon = categoryIcon[resource.category];
              return (
                <a
                  key={resource.title}
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
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                    Open resource
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      </main>
      <CtaFooter />
    </div>
  );
}
