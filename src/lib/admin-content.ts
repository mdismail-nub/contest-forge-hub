import { supabase } from "@/integrations/supabase/client";
import type { ContestInput, ContestRow, ResourceInput, ResourceRow } from "./content";
import { dhakaInputToIso } from "./content";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
const MAX_BANNER_BYTES = 5 * 1024 * 1024;
const ALLOWED_BANNER_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

/** Validates and uploads a banner, returning a long-lived signed URL. */
export async function uploadBanner(file: File): Promise<string> {
  if (!ALLOWED_BANNER_TYPES.includes(file.type)) {
    throw new Error("Banner must be a PNG, JPG, WEBP or GIF image.");
  }
  if (file.size > MAX_BANNER_BYTES) {
    throw new Error("Banner must be smaller than 5 MB.");
  }
  const ext = (file.name.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${crypto.randomUUID()}.${ext || "png"}`;

  const { error } = await supabase.storage
    .from("contest-banners")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);

  const { data, error: signError } = await supabase.storage
    .from("contest-banners")
    .createSignedUrl(path, TEN_YEARS);
  if (signError || !data?.signedUrl) throw new Error("Could not generate the banner URL.");
  return data.signedUrl;
}

function contestPayload(input: ContestInput) {
  return {
    title: input.title,
    platform: input.platform,
    difficulty: input.difficulty,
    description: input.description?.trim() ? input.description.trim() : null,
    prize: input.prize?.trim() ? input.prize.trim() : null,
    tags: input.tags,
    participants: input.participants,
    banner_url: input.banner_url?.trim() ? input.banner_url.trim() : null,
    external_url: input.external_url?.trim() ? input.external_url.trim() : null,
    starts_at: dhakaInputToIso(input.starts_at) ?? new Date().toISOString(),
    ends_at: input.ends_at ? dhakaInputToIso(input.ends_at) : null,
    status: input.status,
  };
}

export async function createContest(input: ContestInput): Promise<ContestRow> {
  const { data, error } = await supabase
    .from("contests")
    .insert(contestPayload(input))
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ContestRow;
}

export async function updateContest(id: string, input: ContestInput): Promise<ContestRow> {
  const { data, error } = await supabase
    .from("contests")
    .update(contestPayload(input))
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ContestRow;
}

export async function deleteContest(id: string): Promise<void> {
  const { error } = await supabase.from("contests").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

function resourcePayload(input: ResourceInput) {
  return {
    title: input.title,
    description: input.description,
    category: input.category,
    level: input.level,
    href: input.href,
    author: input.author?.trim() ? input.author.trim() : null,
    platform: input.platform?.trim() ? input.platform.trim() : null,
    tags: input.tags,
  };
}

export async function createResource(input: ResourceInput): Promise<ResourceRow> {
  const { data, error } = await supabase
    .from("resources")
    .insert(resourcePayload(input))
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ResourceRow;
}

export async function updateResource(id: string, input: ResourceInput): Promise<ResourceRow> {
  const { data, error } = await supabase
    .from("resources")
    .update(resourcePayload(input))
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ResourceRow;
}

export async function deleteResource(id: string): Promise<void> {
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const parseTags = (value: string): string[] =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
