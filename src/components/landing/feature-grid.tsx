import { BookOpenCheck, Handshake, Trophy, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  anchor: string;
};

const features: Feature[] = [
  {
    icon: Trophy,
    title: "Weekly & Monthly Contests",
    description:
      "Rated rounds every Saturday and a flagship monthly cup with editorial livestreams and prize pools.",
    points: ["Div 1–3 brackets", "Virtual re-runs anytime", "Automated rating updates"],
    anchor: "contests",
  },
  {
    icon: BookOpenCheck,
    title: "Curated Resources",
    description:
      "Problem ladders, pattern notebooks, and annotated editorials mapped to your current rating band.",
    points: ["600+ tagged problems", "Pattern cheat-sheets", "Interview-ready tracks"],
    anchor: "resources",
  },
  {
    icon: Handshake,
    title: "Peer Mentorship",
    description:
      "Get matched with a higher-rated mentor for weekly code review, pair solving, and contest post-mortems.",
    points: ["1:1 review sessions", "Accountability pods", "Mock interview swaps"],
    anchor: "community",
  },
];

export function FeatureGrid() {
  return (
    <section id="community" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            Why coders stay
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Everything you need to go from{" "}
            <span className="text-serif-accent">stuck</span> to specialist.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              id={feature.anchor}
              className="group glass-panel scroll-mt-24 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{point}</span>
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
