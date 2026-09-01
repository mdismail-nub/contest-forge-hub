import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * One-time bootstrap: the very first signed-in user may claim the admin role
 * while no admin exists yet. Once an admin exists this always refuses.
 */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) throw new Error("Could not verify admin state");
    if ((count ?? 0) > 0) {
      return { ok: false as const, reason: "An admin already exists for this site." };
    }

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });

    if (error) throw new Error("Could not grant admin role");
    return { ok: true as const };
  });
