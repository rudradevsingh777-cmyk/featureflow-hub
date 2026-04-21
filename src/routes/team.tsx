import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { teamMembers } from "@/lib/mock-data";
import { Plus, Mail } from "lucide-react";

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  const statusColor = {
    online: "bg-success",
    away: "bg-warning",
    offline: "bg-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Team"
        description={`${teamMembers.length} members across your organization.`}
        actions={
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            Invite Member
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {member.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${statusColor[member.status]}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{member.name}</div>
                <div className="text-xs text-muted-foreground">{member.role}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-surface p-2.5 text-center">
                <div className="text-lg font-bold">{member.tasksCompleted}</div>
                <div className="text-[10px] text-muted-foreground">Completed</div>
              </div>
              <div className="rounded-md bg-surface p-2.5 text-center">
                <div className="text-lg font-bold">{member.activeTasks}</div>
                <div className="text-[10px] text-muted-foreground">Active</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              {member.email}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
