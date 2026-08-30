import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpenCheck, Handshake, Trophy, type LucideIcon } from "lucide-react";
import { PenUnderline } from "./pen-underline";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  link?: string;
};

const features: Feature[] = [
  {
    icon: Trophy,
    title: "Weekly Rated Contests",
    description:
      "Compete in organized rounds, track your global rating, and dissect problems with live post-contest editorials.",
    points: ["Multi-div brackets", "Virtual contests", "Automated rating tracking"],
    link: "#contests",
  },
  {
    icon: BookOpenCheck,
    title: "Structured Ladders",
    description:
      "Follow curated problem progressions organized by rating tiers to systematically build algorithmic intuition.",
    points: ["Topic-wise progressions", "Core pattern sheets", "Interview-ready topics"],
    link: "#contests",
  },
  {
    icon: Handshake,
    title: "Active Global Community",
    description:
      "Connect with 48,000+ passionate problem solvers for code reviews, hint sharing, and contest preparation.",
    points: ["Code review & hints", "Discussion channels", "Editorial discussions"],
    link: "#community",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Platform Focus
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl text-foreground">
            Everything you need to go from <PenUnderline>stuck</PenUnderline> to specialist.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass-panel h-full flex flex-col justify-between rounded-[24px] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-ambient)] border border-border/80"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6 stroke-[2.2]" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-border/70 pt-5">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
