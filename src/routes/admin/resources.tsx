import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ExternalLink, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
  RESOURCE_CATEGORIES,
  RESOURCE_LEVELS,
  formatDhaka,
  resourceSchema,
  type ResourceInput,
  type ResourceRow,
} from "@/lib/content";
import { resourcesQueryOptions } from "@/lib/content-queries";
import { createResource, deleteResource, parseTags, updateResource } from "@/lib/admin-content";

export const Route = createFileRoute("/admin/resources")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Manage resources — Competitive Coders" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminResources,
});

const emptyForm: ResourceInput = {
  title: "",
  description: "",
  category: "Ladder",
  level: "Beginner",
  href: "",
  author: "",
  platform: "",
  tags: [],
};

function AdminResources() {
  useContentRealtime();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(resourcesQueryOptions);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceRow | null>(null);
  const [form, setForm] = useState<ResourceInput>(emptyForm);
  const [tagText, setTagText] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ResourceRow | null>(null);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data ?? []).filter((resource) => {
      const matchesTerm =
        !term ||
        resource.title.toLowerCase().includes(term) ||
        (resource.author ?? "").toLowerCase().includes(term) ||
        (resource.platform ?? "").toLowerCase().includes(term) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(term));
      const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter;
      return matchesTerm && matchesCategory;
    });
  }, [data, search, categoryFilter]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["resources"] });

  const save = useMutation({
    mutationFn: async (input: ResourceInput) =>
      editing ? updateResource(editing.id, input) : createResource(input),
    onSuccess: async () => {
      await invalidate();
      toast.success(editing ? "Resource updated." : "Resource published.");
      setOpen(false);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSuccess: async () => {
      await invalidate();
      toast.success("Resource deleted.");
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

  const openEdit = (resource: ResourceRow) => {
    setEditing(resource);
    setForm({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      level: (RESOURCE_LEVELS.find((l) => l === resource.level) ??
        "Beginner") as ResourceInput["level"],
      href: resource.href,
      author: resource.author ?? "",
      platform: resource.platform ?? "",
      tags: resource.tags,
    });
    setTagText(resource.tags.join(", "));
    setOpen(true);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = resourceSchema.safeParse({ ...form, tags: parseTags(tagText) });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    save.mutate(parsed.data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Resources
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Curate ladders, editorials, roadmaps and courses for the community.
          </p>
        </div>
        <Button variant="electric" className="rounded-full" onClick={openCreate}>
          <Plus className="h-4 w-4" /> New resource
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, platform or tag"
            className="pl-9"
            aria-label="Search resources"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="sm:w-56" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {RESOURCE_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border/80 bg-card">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No resources found.</p>
        ) : (
          <ul className="divide-y divide-border/70">
            {rows.map((resource) => (
              <li
                key={resource.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {resource.title}
                    </p>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold text-secondary-foreground">
                      {resource.category}
                    </span>
                    <span className="rounded-full bg-accent/70 px-2 py-0.5 text-[0.65rem] font-semibold text-accent-foreground">
                      {resource.level}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {[resource.author, resource.platform].filter(Boolean).join(" • ") || "—"} ·{" "}
                    {formatDhaka(resource.created_at, false)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button variant="glass" size="icon" className="rounded-full" asChild>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${resource.title}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button
                    variant="glass"
                    size="icon"
                    className="rounded-full"
                    onClick={() => openEdit(resource)}
                    aria-label={`Edit ${resource.title}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="glass"
                    size="icon"
                    className="rounded-full text-destructive"
                    onClick={() => setPendingDelete(resource)}
                    aria-label={`Delete ${resource.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit resource" : "New resource"}</DialogTitle>
            <DialogDescription>
              Links must be public http(s) URLs. Tags are comma separated.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="r-title">Title</Label>
              <Input
                id="r-title"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r-desc">Description</Label>
              <Textarea
                id="r-desc"
                rows={3}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm((p) => ({ ...p, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Level</Label>
                <Select
                  value={form.level}
                  onValueChange={(value) =>
                    setForm((p) => ({ ...p, level: value as ResourceInput["level"] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r-href">Resource URL</Label>
              <Input
                id="r-href"
                type="url"
                placeholder="https://"
                value={form.href}
                onChange={(e) => setForm((p) => ({ ...p, href: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="r-author">Author</Label>
                <Input
                  id="r-author"
                  value={form.author ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-platform">Platform</Label>
                <Input
                  id="r-platform"
                  value={form.platform ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, platform: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r-tags">Tags</Label>
              <Input
                id="r-tags"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
                placeholder="Graphs, DP, Greedy"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="glass" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="electric" disabled={save.isPending}>
                {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save changes" : "Publish resource"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={pendingDelete !== null} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resource?</AlertDialogTitle>
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
