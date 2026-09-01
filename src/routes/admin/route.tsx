import { createFileRoute, Link, Outlet, redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CalendarDays, LayoutDashboard, LibraryBig, LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fetchIsAdmin } from "@/hooks/use-admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (location.pathname.startsWith("/admin/login")) return;
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    const admin = await fetchIsAdmin(data.user.id);
    if (!admin) throw redirect({ to: "/admin/login", search: { denied: "1" } });
  },
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/contests", label: "Contests", icon: CalendarDays, exact: false },
  { to: "/admin/resources", label: "Resources", icon: LibraryBig, exact: false },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  if (location.pathname.startsWith("/admin/login")) {
    return <Outlet />;
  }

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  };

  const nav = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = item.exact
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass-panel border-x-0 border-t-0 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="glass"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle admin navigation"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <span className="font-display text-sm font-bold tracking-tight text-foreground">
              Admin<span className="text-primary"> Console</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" className="rounded-full" asChild>
              <a href="/">View site</a>
            </Button>
            <Button variant="glass" size="sm" className="rounded-full" onClick={signOut}>
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </Button>
          </div>
        </div>
        {open && <div className="border-t border-border/70 px-4 py-3 lg:hidden">{nav}</div>}
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 rounded-[20px] border border-border/80 bg-card p-3">{nav}</div>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
