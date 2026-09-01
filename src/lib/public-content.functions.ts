import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import type { ContestRow, ResourceRow } from "./content";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const listContests = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("contests")
    .select("*")
    .order("starts_at", { ascending: true });
  if (error) {
    console.error("[contests] load failed", error.message);
    return [] as ContestRow[];
  }
  return (data ?? []) as ContestRow[];
});

export const listResources = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[resources] load failed", error.message);
    return [] as ResourceRow[];
  }
  return (data ?? []) as ResourceRow[];
});
