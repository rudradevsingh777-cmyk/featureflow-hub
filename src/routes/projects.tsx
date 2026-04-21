import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Plus, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProjects, createProject, deleteProject } from "@/lib/api";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

const projectColors = [
  "oklch(0.65 0.2 250)",
  "oklch(0.65 0.2 150)",
  "oklch(0.75 0.18 80)",
  "oklch(0.6 0.2 25)",
  "oklch(0.65 0.15 310)",
  "oklch(0.55 0.15 200)",
];

function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    try {
      const color = projectColors[projects.length % projectColors.length];
      await createProject({ name, description, color });
      setName("");
      setDescription("");
      setShowCreate(false);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project and all its tasks?")) return;
    try {
      await deleteProject(id);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor: Record<string, string> = {
    active: "bg-success",
    on_hold: "bg-warning",
    completed: "bg-primary",
    archived: "bg-muted-foreground",
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Projects"
        description="Manage and track all your team projects."
        actions={
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-3.5 w-3.5" />
            New Project
          </button>
        }
      />

      {/* Create form */}
      {showCreate && (
        <form onSubmit={handleCreate} className="rounded-lg border border-primary/30 bg-card p-4 space-y-3">
          <input
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            autoFocus
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={creating}
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20">
          <FolderKanban className="h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">No projects yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Create your first project to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project: any) => {
            const totalTasks = project.tasks?.length || 0;
            const doneTasks = project.tasks?.filter((t: any) => t.status === "done").length || 0;
            const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
            const members = project.project_members || [];

            return (
              <div
                key={project.id}
                className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-sm" style={{ background: project.color }} />
                    <h3 className="text-sm font-semibold">{project.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {doneTasks}/{totalTasks} tasks
                    </span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${progress}%`, background: project.color }} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`status-dot ${statusColor[project.status] || "bg-muted-foreground"}`} />
                    <span className="text-[10px] font-medium capitalize text-muted-foreground">
                      {project.status.replace("_", " ")}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{members.length} members</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

import { FolderKanban } from "lucide-react";
