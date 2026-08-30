import { createFileRoute } from "@tanstack/react-router";

import { ContestsSection } from "@/components/landing/contests-section";
import { CtaFooter } from "@/components/landing/cta-footer";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { Hero } from "@/components/landing/hero";
import { LeaderboardSection } from "@/components/landing/leaderboard-section";
import { SiteHeader } from "@/components/landing/site-header";
import { TrustBar } from "@/components/landing/trust-bar";

const title = "Competitive Coders — Contests, Ladders & Mentorship";
const description =
  "Join 48,000+ competitive programmers. Weekly rated contests, curated problem ladders, and peer mentorship across Codeforces, LeetCode and CodeChef.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <FeatureGrid />
        <ContestsSection />
        <LeaderboardSection />
      </main>
      <CtaFooter />
    </div>
  );
}
