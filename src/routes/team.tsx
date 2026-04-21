import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Plus, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProfiles } from "@/lib/api";

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles().then((data) => {
      setProfiles(data ?? []);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const statusColor: Record<string, string> = {
    online: "bg-success",
    away: "bg-warning",
    offline: "bg-muted-foreground",
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
        title="Team"
        description={`${profiles.length} member${profiles.length !== 1 ? "s" : ""} in your organization.`}
      />

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20">
          <h2 className="mt-4 text-lg font-semibold">No team members yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Invite people to collaborate on projects.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {profiles.map((member: any) => {
            const initials = (member.full_name || member.email || "?")
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div key={member.id} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                      {initials}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${statusColor[member.status] || "bg-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{member.full_name || "Unnamed"}</div>
                    <div className="text-xs text-muted-foreground capitalize">{member.role}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
