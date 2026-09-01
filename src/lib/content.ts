import { z } from "zod";

export type ContestStatus = "upcoming" | "live" | "completed";

export type ContestRow = {
  id: string;
  title: string;
  platform: string;
  difficulty: string;
  description: string | null;
  prize: string | null;
  tags: string[];
  participants: number;
  banner_url: string | null;
  external_url: string | null;
  starts_at: string;
  ends_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ResourceRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  href: string;
  author: string | null;
  platform: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export const CONTEST_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;
export const CONTEST_STATUSES: ContestStatus[] = ["upcoming", "live", "completed"];
export const RESOURCE_CATEGORIES = [
  "Ladder",
  "Editorial",
  "Template",
  "Course",
  "Competitive Programming",
  "Data Structures",
  "Algorithms",
  "Roadmap",
  "Interview Prep",
] as const;
export const RESOURCE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

/** Only http(s) links are accepted anywhere in the admin panel. */
export const safeUrl = z
  .string()
  .trim()
  .max(2000)
  .url("Enter a valid URL")
  .refine((value) => /^https?:\/\//i.test(value), "Only http(s) links are allowed");

export const contestSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  platform: z.string().trim().min(1, "Platform is required").max(80),
  difficulty: z.enum(CONTEST_DIFFICULTIES),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  prize: z.string().trim().max(120).optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  participants: z.number().int().min(0).max(10_000_000),
  banner_url: z.string().trim().max(2000).optional().or(z.literal("")),
  external_url: safeUrl.optional().or(z.literal("")),
  starts_at: z.string().min(1, "Start time is required"),
  ends_at: z.string().optional().or(z.literal("")),
  status: z.enum(["upcoming", "live", "completed"]),
});

export const resourceSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(140),
  description: z.string().trim().min(2, "Description is required").max(600),
  category: z.string().trim().min(1).max(60),
  level: z.enum(RESOURCE_LEVELS),
  href: safeUrl,
  author: z.string().trim().max(80).optional().or(z.literal("")),
  platform: z.string().trim().max(80).optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
});

export type ContestInput = z.infer<typeof contestSchema>;
export type ResourceInput = z.infer<typeof resourceSchema>;

const DHAKA = "Asia/Dhaka";

/** Formats an ISO timestamp in Bangladesh Standard Time (UTC+6). */
export function formatDhaka(iso: string | null | undefined, withTime = true): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: DHAKA,
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit", hour12: true } : {}),
  }).format(date) + (withTime ? " BST" : "");
}

/**
 * Converts an ISO instant into the `datetime-local` value that represents the
 * same moment in Bangladesh time, so admins always author in local time.
 */
export function isoToDhakaInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DHAKA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour") === "24" ? "00" : get("hour")}:${get("minute")}`;
}

/** Inverse of {@link isoToDhakaInput}: Dhaka wall-clock input -> UTC ISO. */
export function dhakaInputToIso(value: string): string | null {
  if (!value) return null;
  // Bangladesh has no DST, so the offset is a constant +06:00.
  const iso = new Date(`${value}:00+06:00`);
  return Number.isNaN(iso.getTime()) ? null : iso.toISOString();
}

/** Derives the live status from the schedule when the admin hasn't pinned one. */
export function derivedStatus(contest: Pick<ContestRow, "starts_at" | "ends_at">): ContestStatus {
  const now = Date.now();
  const start = new Date(contest.starts_at).getTime();
  const end = contest.ends_at ? new Date(contest.ends_at).getTime() : start + 3 * 60 * 60 * 1000;
  if (now < start) return "upcoming";
  if (now <= end) return "live";
  return "completed";
}

export function effectiveStatus(contest: ContestRow): ContestStatus {
  if (contest.status === "completed") return "completed";
  return derivedStatus(contest);
}
