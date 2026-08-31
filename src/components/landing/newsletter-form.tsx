import React, { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  source = "footer",
  className,
}: {
  source?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return;

    setStatus("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: value,
      source,
    });

    if (error) {
      if (error.code === "23505") {
        setStatus("success");
        setMessage("You're already on the list!");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
      return;
    }

    setStatus("success");
    setMessage("Subscribed! Contest updates are on the way.");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubscribe} className={cn("relative mt-3", className)}>
      <div className="flex items-center rounded-full border border-border/80 bg-background px-3 py-1.5 shadow-xs focus-within:border-foreground/40">
        <span className="pl-1 font-mono text-xs text-muted-foreground">@</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          aria-label="Email address"
          className="w-full bg-transparent px-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe to newsletter"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>
      {message && (
        <p
          className={cn(
            "mt-1.5 pl-3 text-[0.7rem] font-medium",
            status === "error" ? "text-destructive" : "text-emerald-500",
          )}
        >
          {message}
        </p>
      )}
    </form>
  );
}
