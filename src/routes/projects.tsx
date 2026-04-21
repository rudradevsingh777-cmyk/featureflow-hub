import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/lib/mock-data";
import { Plus, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const statusColor = {
    active: "bg-success",
    on_hold: "bg-warning",
    completed: "bg-primary",
    archived: "bg-muted-foreground",
  };

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
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            New Project
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ background: project.color }}
                />
                <h3 className="text-sm font-semibold">{project.name}</h3>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
              {project.description}
            </p>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${project.progress}%`, background: project.color }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className={`status-dot ${statusColor[project.status]}`} />
                <span className="text-[10px] font-medium capitalize text-muted-foreground">
                  {project.status.replace("_", " ")}
                </span>
              </div>
              <div className="flex -space-x-1.5">
                {project.members.slice(0, 3).map((member) => (
                  <div
                    key={member}
                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-accent text-[9px] font-medium"
                    title={member}
                  >
                    {member.split(" ").map((n) => n[0]).join("")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
