import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CheckSquare,
  FolderKanban,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
import { TaskRow } from "@/components/TaskRow";
import { tasks, projects, teamMembers } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const recentTasks = tasks.slice(0, 6);
  const activeProjects = projects.filter((p) => p.status === "active");
  const urgentTasks = tasks.filter((t) => t.priority === "urgent");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Dashboard"
        description="Welcome back, John. Here's what's happening today."
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Tasks"
          value={tasks.length}
          change="+12 this week"
          changeType="positive"
          icon={CheckSquare}
        />
        <StatCard
          label="Active Projects"
          value={activeProjects.length}
          change="2 ahead of schedule"
          changeType="positive"
          icon={FolderKanban}
        />
        <StatCard
          label="Team Members"
          value={teamMembers.length}
          change={`${teamMembers.filter((m) => m.status === "online").length} online`}
          changeType="neutral"
          icon={Users}
        />
        <StatCard
          label="Completion Rate"
          value="78%"
          change="+5% from last week"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent tasks */}
        <div className="col-span-2 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Recent Tasks</h2>
            <span className="text-xs text-muted-foreground">{tasks.length} total</span>
          </div>
          {recentTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Urgent */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-semibold">Urgent Items</h3>
            </div>
            <div className="space-y-2">
              {urgentTasks.map((task) => (
                <div key={task.id} className="rounded-md bg-destructive/5 border border-destructive/20 p-2.5">
                  <div className="text-xs font-medium text-foreground">{task.title}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{task.project} · {task.assignee}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Active projects summary */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Project Progress</h3>
            <div className="space-y-3">
              {activeProjects.slice(0, 4).map((project) => (
                <div key={project.id}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                        background: project.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { text: "Sarah completed hero section design", time: "2m ago" },
                { text: "Alex pushed auth flow to review", time: "15m ago" },
                { text: "Jordan merged rate limiter PR", time: "1h ago" },
                { text: "Riley updated design tokens", time: "2h ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-3 w-3 text-muted-foreground shrink-0" />
                  <div>
                    <div className="text-xs text-foreground">{item.text}</div>
                    <div className="text-[10px] text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
