import { useState } from "react";

import { platforms } from "./data";

function PlatformBadge({ name, detail, logo }: { name: string; detail: string; logo: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="glass-panel flex shrink-0 items-center gap-3 rounded-2xl px-5 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-card text-xs font-bold text-primary">
        {broken ? (
          name.slice(0, 2).toUpperCase()
        ) : (
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-5 w-5"
            loading="lazy"
            onError={() => setBroken(true)}
          />
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{name}</span>
        <span className="block truncate text-xs text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}

export function TrustBar() {
  return (
    <section aria-label="Integrated platforms" className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Synced with the platforms you already grind on
        </p>

        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max gap-4">
            {[...platforms, ...platforms].map((platform, index) => (
              <PlatformBadge key={`${platform.name}-${index}`} {...platform} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
