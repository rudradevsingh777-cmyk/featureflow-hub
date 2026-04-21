import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatCard({ label, value, change, changeType = "neutral", icon: Icon }: StatCardProps) {
  const changeColor =
    changeType === "positive" ? "text-success" : changeType === "negative" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
      {change && (
        <div className={`mt-1 text-xs font-medium ${changeColor}`}>{change}</div>
      )}
    </div>
  );
}
