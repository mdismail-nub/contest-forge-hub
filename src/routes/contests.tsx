import { createFileRoute } from "@tanstack/react-router";

import { ContestsSection } from "@/components/landing/contests-section";
import { CtaFooter } from "@/components/landing/cta-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { TrustBar } from "@/components/landing/trust-bar";

const title = "Contests — Competitive Coders";
const description =
  "Weekly sprints, monthly grandmaster cups and beginner ladders. Track live countdowns, prize pools and registration for every Competitive Coders round.";

export const Route = createFileRoute("/contests")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://contest-forge-hub.lovable.app/contests" },
    ],
    links: [{ rel: "canonical", href: "https://contest-forge-hub.lovable.app/contests" }],
  }),
  component: ContestsPage,
});

function ContestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="px-4 pt-16 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Contest calendar
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
              Every round, one calendar.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Rated mirrors, in-house arenas and structured ladders. Set your reminder, warm up with
              the editorial vault, and climb with the community.
            </p>
          </div>
        </section>
        <ContestsSection />
        <TrustBar />
      </main>
      <CtaFooter />
    </div>
  );
}
