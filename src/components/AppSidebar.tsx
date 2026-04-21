import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Inbox,
  Search,
  Bell,
  Plus,
  Layers,
  Target,
  Clock,
  FileText,
  MessageSquare,
  Zap,
} from "lucide-react";

const mainNav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Tasks", to: "/tasks", icon: CheckSquare },
  { label: "Board", to: "/board", icon: Layers },
  { label: "Team", to: "/team", icon: Users },
  { label: "Calendar", to: "/calendar", icon: Calendar },
  { label: "Reports", to: "/reports", icon: BarChart3 },
];

const secondaryNav = [
  { label: "Inbox", to: "/inbox", icon: Inbox },
  { label: "Goals", to: "/goals", icon: Target },
  { label: "Time Tracking", to: "/timetracking", icon: Clock },
  { label: "Documents", to: "/documents", icon: FileText },
  { label: "Messages", to: "/messages", icon: MessageSquare },
  { label: "Automations", to: "/automations", icon: Zap },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
          P
        </div>
        <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
          ProjectFlow
        </span>
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-2 px-3 py-3">
        <button className="nav-item flex-1 justify-center gap-1.5 border border-border text-xs">
          <Search className="h-3.5 w-3.5" />
          Search
        </button>
        <button className="nav-item justify-center border border-border" style={{ padding: "0.5rem" }}>
          <Bell className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* New button */}
      <div className="px-3 pb-2">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-3.5 w-3.5" />
          New Task
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Main
        </div>
        {mainNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-item ${isActive(item.to) ? "nav-item-active" : ""}`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}

        <div className="mb-1 mt-4 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Tools
        </div>
        {secondaryNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-item ${isActive(item.to) ? "nav-item-active" : ""}`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3">
        <Link to="/settings" className={`nav-item ${isActive("/settings") ? "nav-item-active" : ""}`}>
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-2 flex items-center gap-2.5 rounded-md px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-sidebar-foreground truncate">John Doe</div>
            <div className="text-[10px] text-muted-foreground truncate">john@team.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
