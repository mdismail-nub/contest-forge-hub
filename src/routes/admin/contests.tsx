import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { Loader2, Pencil, Plus, Search, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useContentRealtime } from "@/hooks/use-content-realtime";
import {
  CONTEST_DIFFICULTIES,
  CONTEST_STATUSES,
  contestSchema,
  effectiveStatus,
  formatDhaka,
  isoToDhakaInput,
  type ContestInput,
  type ContestRow,
} from "@/lib/content";
import { contestsQueryOptions } from "@/lib/content-queries";
import {
  createContest,
  deleteContest,
  parseTags,
  updateContest,
  uploadBanner,
} from "@/lib/admin-content";

export const Route = createFileRoute("/admin/contests")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Manage contests — Competitive Coders" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminContests,
});

const emptyForm: ContestInput = {
  title: "",
  platform: "Competitive Coders",
  difficulty: "Intermediate",
  description: "",
  prize: "",
  tags: [],
  participants: 0,
  banner_url: "",
  external_url: "",
  starts_at: "",
  ends_at: "",
  status: "upcoming",
};

const statusStyles: Record<string, string> = {
  upcoming: "bg-secondary text-secondary-foreground",
  live: "bg-primary/15 text-primary",
  completed: "bg-muted text-muted-foreground",
};

function AdminContests() {
  useContentRealtime();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(contestsQueryOptions);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ContestRow | null>(null);
  const [form, setForm] = useState<ContestInput>(emptyForm);
  const [tagText, setTagText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<ContestRow | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data ?? []).filter((contest) => {
      const matchesTerm =
        !term ||
        contest.title.toLowerCase().includes(term) ||
        contest.platform.toLowerCase().includes(term) ||
        contest.tags.some((tag) => tag.toLowerCase().includes(term));
      const matchesStatus = statusFilter === "all" || effectiveStatus(contest) === statusFilter;
      return matchesTerm && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["contests"] });

  const save = useMutation({
    mutationFn: async (input: ContestInput) =>
      editing ? updateContest(editing.id, input) : createContest(input),
    onSuccess: async () => {
      await invalidate();
      toast.success(editing ? "Contest updated." : "Contest published.");
      setOpen(false);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteContest(id),
    onSuccess: async () => {
      await invalidate();
      toast.success("Contest deleted.");
      setPendingDelete(null);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setTagText("");
    setOpen(true);
  };

  const openEdit = (contest: ContestRow) => {
    setEditing(contest);
    setForm({
      title: contest.title,
      platform: contest.platform,
      difficulty: (CONTEST_DIFFICULTIES.find((d) => d === contest.difficulty) ??
        "Intermediate") as ContestInput["difficulty"],
      description: contest.description ?? "",
      prize: contest.prize ?? "",
      tags: contest.tags,
      participants: contest.participants,
      banner_url: contest.banner_url ?? "",
      external_url: contest.external_url ?? "",
      starts_at: isoToDhakaInput(contest.starts_at),
      ends_at: isoToDhakaInput(contest.ends_at),
      status: (contest.status as ContestInput["status"]) ?? "upcoming",
    });
    setTagText(contest.tags.join(", "));
    setOpen(true);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const candidate = { ...form, tags: parseTags(tagText) };
    const parsed = contestSchema.safeParse(candidate);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    save.mutate(parsed.data);
  };

  const onBannerPick = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadBanner(file);
      setForm((prev) => ({ ...prev, banner_url: url }));
      toast.success("Banner uploaded.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Contests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Schedule rounds, upload banners and control what shows on the site.
          </p>
        </div>
        <Button variant="electric" className="rounded-full" onClick={openCreate}>
          <Plus className="h-4 w-4" /> New contest
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, platform or tag"
            className="pl-9"
            aria-label="Search contests"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-48" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {CONTEST_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status[0]!.toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {isLoading && [0, 1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-[20px]" />)}
        {!isLoading && rows.length === 0 && (
          <div className="rounded-[20px] border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No contests match your filters.
          </div>
        )}
        {rows.map((contest) => {
          const status = effectiveStatus(contest);
          return (
            <article
              key={contest.id}
              className="flex flex-col gap-3 rounded-[20px] border border-border/80 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-bold tracking-tight text-foreground">
                    {contest.title}
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                  <span className="rounded-full bg-accent/70 px-2.5 py-0.5 text-[0.7rem] font-semibold text-accent-foreground">
                    {contest.difficulty}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {contest.platform} · starts {formatDhaka(contest.starts_at)}
                </p>
                {contest.tags.length > 0 && (
                  <p className="font-mono text-[0.7rem] text-muted-foreground">
                    {contest.tags.join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="glass" size="sm" className="rounded-full" onClick={() => openEdit(contest)}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  className="rounded-full text-destructive"
                  onClick={() => setPendingDelete(contest)}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit contest" : "New contest"}</DialogTitle>
            <DialogDescription>
              Times are entered and shown in Bangladesh Standard Time (UTC+6).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="c-title">Title</Label>
                <Input
                  id="c-title"
                  value={form.title}
                  maxLength={120}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-platform">Platform</Label>
                <Input
                  id="c-platform"
                  value={form.platform}
                  maxLength={80}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Difficulty</Label>
                <Select
                  value={form.difficulty}
                  onValueChange={(value) =>
                    setForm({ ...form, difficulty: value as ContestInput["difficulty"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTEST_DIFFICULTIES.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="c-desc">Description</Label>
                <Textarea
                  id="c-desc"
                  rows={3}
                  maxLength={1000}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-start">Starts at (BST)</Label>
                <Input
                  id="c-start"
                  type="datetime-local"
                  value={form.starts_at}
                  onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-end">Ends at (BST)</Label>
                <Input
                  id="c-end"
                  type="datetime-local"
                  value={form.ends_at}
                  onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value as ContestInput["status"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTEST_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status[0]!.toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-participants">Participants</Label>
                <Input
                  id="c-participants"
                  type="number"
                  min={0}
                  value={form.participants}
                  onChange={(e) =>
                    setForm({ ...form, participants: Number(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-prize">Prize</Label>
                <Input
                  id="c-prize"
                  maxLength={120}
                  value={form.prize}
                  onChange={(e) => setForm({ ...form, prize: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-link">Registration link</Label>
                <Input
                  id="c-link"
                  type="url"
                  placeholder="https://…"
                  value={form.external_url}
                  onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="c-tags">Tags (comma separated)</Label>
                <Input
                  id="c-tags"
                  value={tagText}
                  onChange={(e) => setTagText(e.target.value)}
                  placeholder="Graphs, DP, Greedy"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Banner</Label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => void onBannerPick(e.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="glass"
                    size="sm"
                    className="rounded-full"
                    disabled={uploading}
                    onClick={() => fileRef.current?.click()}
                  >
                    {uploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    Upload image
                  </Button>
                  {form.banner_url ? (
                    <img
                      src={form.banner_url}
                      alt="Contest banner preview"
                      className="h-12 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP or GIF up to 5 MB.
                    </span>
                  )}
                  {form.banner_url && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setForm({ ...form, banner_url: "" })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="electric"
                className="rounded-full"
                disabled={save.isPending || uploading}
              >
                {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save changes" : "Publish contest"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={pendingDelete !== null} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this contest?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingDelete?.title}” will be removed from the public site. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingDelete && remove.mutate(pendingDelete.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
