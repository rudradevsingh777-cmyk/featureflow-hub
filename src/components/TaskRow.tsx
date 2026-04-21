import type { Task, Priority } from "@/lib/mock-data";
import { priorityLabels, statusLabels } from "@/lib/mock-data";

const priorityClass: Record<Priority, string> = {
  urgent: "priority-urgent",
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
  none: "priority-none",
};

export function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-accent/50">
      <div className={`status-dot shrink-0 ${priorityClass[task.priority]}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground truncate">{task.title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{task.project}</span>
          <span>·</span>
          <span>{statusLabels[task.status]}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {task.labels.slice(0, 2).map((label) => (
          <span
            key={label}
            className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground"
          >
            {label}
          </span>
        ))}
        <span className="text-xs text-muted-foreground">{task.assignee.split(" ")[0]}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
            task.priority === "urgent"
              ? "bg-destructive/20 text-destructive"
              : task.priority === "high"
              ? "bg-warning/20 text-warning"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>
    </div>
  );
}
