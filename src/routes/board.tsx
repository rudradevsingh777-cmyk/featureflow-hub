import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { statusLabels } from "@/lib/mock-data";
import type { TaskStatus } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTasks, updateTask } from "@/lib/api";

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

function BoardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data ?? []);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error(err);
    }
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
      <PageHeader title="Board" description="Kanban view of all tasks." />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((status) => {
          const columnTasks = tasks.filter((t: any) => t.status === status);
          return (
            <div key={status} className="kanban-column flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{columnEmoji[status]}</span>
                  <span className="text-xs font-semibold">{statusLabels[status]}</span>
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {columnTasks.length}
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-2 p-3">
                {columnTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="kanban-card border-l-2"
                    style={{
                      borderLeftColor:
                        task.priority === "urgent" ? "oklch(0.6 0.2 25)" :
                        task.priority === "high" ? "oklch(0.7 0.18 50)" :
                        task.priority === "medium" ? "oklch(0.75 0.18 80)" :
                        task.priority === "low" ? "oklch(0.65 0.15 230)" :
                        "var(--border)",
                    }}
                  >
                    <div className="text-xs font-medium">{task.title}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{task.projects?.name || "Unknown"}</span>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[8px] font-medium" title={task.profiles?.full_name || "Unassigned"}>
                        {(task.profiles?.full_name || "?").split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </div>
                    </div>
                    {/* Status change buttons */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {columns.filter((s) => s !== status).map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(task.id, s)}
                          className="rounded bg-accent px-1.5 py-0.5 text-[8px] text-muted-foreground hover:bg-primary/20 hover:text-primary"
                        >
                          → {statusLabels[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {columnTasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-muted-foreground">No tasks</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
