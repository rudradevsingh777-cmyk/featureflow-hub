import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CheckSquare,
  FolderKanban,
  Users,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
import { TaskRow } from "@/components/TaskRow";
import { useEffect, useState } from "react";
import { fetchTasks, fetchProjects, fetchProfiles, fetchActivities } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [t, p, pr, a] = await Promise.all([
          fetchTasks(),
          fetchProjects(),
          fetchProfiles(),
          fetchActivities(10),
        ]);
        setTasks(t ?? []);
        setProjects(p ?? []);
        setProfiles(pr ?? []);
        setActivities(a ?? []);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeProjects = projects.filter((p: any) => p.status === "active");
  const doneTasks = tasks.filter((t: any) => t.status === "done").length;
  const completionRate = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;
  const urgentTasks = tasks.filter((t: any) => t.priority === "urgent");
  const recentTasks = tasks.slice(0, 6);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Dashboard"
        description="Here's what's happening across your projects."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={tasks.length} change={`${doneTasks} completed`} changeType="positive" icon={CheckSquare} />
        <StatCard label="Active Projects" value={activeProjects.length} icon={FolderKanban} />
        <StatCard label="Team Members" value={profiles.length} icon={Users} />
        <StatCard label="Completion Rate" value={`${completionRate}%`} changeType="positive" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Recent Tasks</h2>
            <span className="text-xs text-muted-foreground">{tasks.length} total</span>
          </div>
          {recentTasks.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No tasks yet. Create a project and start adding tasks!
            </div>
          ) : (
            recentTasks.map((task: any) => (
              <TaskRow key={task.id} task={{
                id: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                assignee: task.profiles?.full_name || "Unassigned",
                project: task.projects?.name || "Unknown",
                labels: task.labels || [],
                dueDate: task.due_date || "",
                createdAt: task.created_at,
              }} />
            ))
          )}
        </div>

        <div className="space-y-6">
          {urgentTasks.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <h3 className="text-sm font-semibold">Urgent Items</h3>
              </div>
              <div className="space-y-2">
                {urgentTasks.map((task: any) => (
                  <div key={task.id} className="rounded-md bg-destructive/5 border border-destructive/20 p-2.5">
                    <div className="text-xs font-medium text-foreground">{task.title}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      {task.projects?.name || "Unknown"} · {task.profiles?.full_name || "Unassigned"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Project Progress</h3>
            {activeProjects.length === 0 ? (
              <p className="text-xs text-muted-foreground">No active projects yet.</p>
            ) : (
              <div className="space-y-3">
                {activeProjects.slice(0, 4).map((project: any) => {
                  const totalTasks = project.tasks?.length || 0;
                  const done = project.tasks?.filter((t: any) => t.status === "done").length || 0;
                  const progress = totalTasks > 0 ? Math.round((done / totalTasks) * 100) : 0;
                  return (
                    <div key={project.id}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-muted-foreground">{progress}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                        <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: project.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
            {activities.length === 0 ? (
              <p className="text-xs text-muted-foreground">No activity yet.</p>
            ) : (
              <div className="space-y-3">
                {activities.map((item: any) => (
                  <div key={item.id} className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-3 w-3 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-xs text-foreground">
                        {item.profiles?.full_name || "Someone"} {item.description}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
