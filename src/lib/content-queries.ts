import { queryOptions } from "@tanstack/react-query";

import { listContests, listResources } from "./public-content.functions";

export const contestsQueryOptions = queryOptions({
  queryKey: ["contests"],
  queryFn: () => listContests(),
  staleTime: 0,
});

export const resourcesQueryOptions = queryOptions({
  queryKey: ["resources"],
  queryFn: () => listResources(),
  staleTime: 0,
});
