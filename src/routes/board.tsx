import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { tasks, statusLabels, priorityLabels } from "@/lib/mock-data";
import type { TaskStatus, Priority } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/board")({
  component: BoardPage,
});

const columns: TaskStatus[] = ["backlog", "todo", "in_progress", "in_review", "done"];

const columnEmoji: Record<TaskStatus, string> = {
  backlog: "📋",
  todo: "⭕",
  in_progress: "🔵",
  in_review: "🟡",
  done: "✅",
};

const priorityBorder: Record<Priority, string> = {
  urgent: "border-l-[oklch(0.6_0.2_25)]",
  high: "border-l-[oklch(0.7_0.18_50)]",
  medium: "border-l-[oklch(0.75_0.18_80)]",
  low: "border-l-[oklch(0.65_0.15_230)]",
  none: "border-l-border",
};

function BoardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Board" description="Kanban view of all tasks." />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status);
          return (
            <div key={status} className="kanban-column flex flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{columnEmoji[status]}</span>
                  <span className="text-xs font-semibold">{statusLabels[status]}</span>
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {columnTasks.length}
                  </span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 space-y-2 p-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="kanban-card border-l-2"
                    style={{
                      borderLeftColor:
                        task.priority === "urgent"
                          ? "oklch(0.6 0.2 25)"
                          : task.priority === "high"
                          ? "oklch(0.7 0.18 50)"
                          : task.priority === "medium"
                          ? "oklch(0.75 0.18 80)"
                          : task.priority === "low"
                          ? "oklch(0.65 0.15 230)"
                          : "var(--border)",
                    }}
                  >
                    <div className="text-xs font-medium">{task.title}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{task.project}</span>
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[8px] font-medium"
                        title={task.assignee}
                      >
                        {task.assignee.split(" ").map((n) => n[0]).join("")}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      {task.labels.slice(0, 2).map((label) => (
                        <span
                          key={label}
                          className="rounded bg-accent px-1.5 py-0.5 text-[9px] text-muted-foreground"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {columnTasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
