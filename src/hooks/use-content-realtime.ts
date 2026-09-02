import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

/** Keeps contests/resources caches in sync with database changes in real time. */
export function useContentRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("public-content-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "contests" }, () => {
        void queryClient.invalidateQueries({ queryKey: ["contests"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "resources" }, () => {
        void queryClient.invalidateQueries({ queryKey: ["resources"] });
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
