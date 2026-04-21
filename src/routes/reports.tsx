import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { tasks, projects, teamMembers } from "@/lib/mock-data";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const statusCounts = {
    backlog: tasks.filter((t) => t.status === "backlog").length,
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    in_review: tasks.filter((t) => t.status === "in_review").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const maxCount = Math.max(...Object.values(statusCounts));

  const priorityCounts = {
    urgent: tasks.filter((t) => t.priority === "urgent").length,
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Reports" description="Analytics and insights across your projects." />

      <div className="grid grid-cols-2 gap-6">
        {/* Task by status */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Tasks by Status</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className="w-20 text-xs capitalize text-muted-foreground">
                  {status.replace("_", " ")}
                </span>
                <div className="flex-1 h-6 rounded bg-muted overflow-hidden">
                  <div
                    className="h-full rounded bg-primary transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-xs font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority breakdown */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Priority Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(priorityCounts).map(([priority, count]) => {
              const colors: Record<string, string> = {
                urgent: "bg-destructive/20 text-destructive border-destructive/30",
                high: "bg-warning/20 text-warning border-warning/30",
                medium: "bg-info/20 text-info border-info/30",
                low: "bg-muted text-muted-foreground border-border",
              };
              return (
                <div key={priority} className={`rounded-lg border p-4 text-center ${colors[priority]}`}>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="mt-1 text-xs capitalize">{priority}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team performance */}
        <div className="col-span-2 rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Team Performance</h3>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                  {member.avatar}
                </div>
                <div className="mt-2 text-xs font-medium truncate">{member.name.split(" ")[0]}</div>
                <div className="mt-1">
                  <div className="text-lg font-bold">{member.tasksCompleted}</div>
                  <div className="text-[10px] text-muted-foreground">completed</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
