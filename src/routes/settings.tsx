import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { User, Bell, Palette, Shield, Database, Globe } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

const sections = [
  { icon: User, title: "Profile", description: "Manage your account details and preferences" },
  { icon: Bell, title: "Notifications", description: "Configure email and push notification settings" },
  { icon: Palette, title: "Appearance", description: "Customize theme, colors, and display options" },
  { icon: Shield, title: "Security", description: "Two-factor authentication and session management" },
  { icon: Database, title: "Data & Privacy", description: "Export data, manage privacy settings" },
  { icon: Globe, title: "Integrations", description: "Connect with Slack, GitHub, Jira, and more" },
];

function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Settings" description="Manage your workspace preferences." />

      <div className="grid grid-cols-2 gap-4">
        {sections.map((section) => (
          <button
            key={section.title}
            className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-primary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <section.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">{section.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{section.description}</div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
