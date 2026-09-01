import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { claimFirstAdmin } from "@/lib/admin.functions";
import { fetchIsAdmin } from "@/hooks/use-admin";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in — Competitive Coders" },
      { name: "description", content: "Secure sign-in for the Competitive Coders admin console." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user && (await fetchIsAdmin(data.user.id))) {
        navigate({ to: "/admin", replace: true });
      }
    })();
  }, [navigate]);

  const finish = async (userId: string) => {
    let admin = await fetchIsAdmin(userId);
    if (!admin) {
      // Bootstrap: the first account can claim admin while none exists.
      const result = await claimFirstAdmin();
      admin = result.ok;
      if (!result.ok) {
        await supabase.auth.signOut();
        toast.error("This account is not authorised for the admin console.");
        setBusy(false);
        return;
      }
    }
    toast.success("Welcome back.");
    navigate({ to: "/admin", replace: true });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || password.length < 8) {
      toast.error("Enter a valid email and a password of at least 8 characters.");
      return;
    }
    setBusy(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/login` },
      });
      if (error) {
        toast.error(error.message);
        setBusy(false);
        return;
      }
      if (!data.session) {
        toast.success("Account created. Confirm your email, then sign in.");
        setMode("signin");
        setBusy(false);
        return;
      }
      await finish(data.user!.id);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    if (error || !data.user) {
      toast.error(error?.message ?? "Sign in failed");
      setBusy(false);
      return;
    }
    await finish(data.user.id);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-sm rounded-[24px] border border-border/80 bg-card p-7 shadow-[var(--shadow-ambient)]">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-foreground">
              Admin console
            </h1>
            <p className="text-xs text-muted-foreground">Competitive Coders</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="electric" className="w-full rounded-full" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signup" ? "Create admin account" : "Sign in"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-4 w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          {mode === "signin"
            ? "First time? Create the initial admin account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
