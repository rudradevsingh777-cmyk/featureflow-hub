export type Priority = "urgent" | "high" | "medium" | "low" | "none";
export type TaskStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done";
export type ProjectStatus = "active" | "on_hold" | "completed" | "archived";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  project: string;
  labels: string[];
  dueDate: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  tasksCount: number;
  completedTasks: number;
  lead: string;
  color: string;
  members: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  tasksCompleted: number;
  activeTasks: number;
  status: "online" | "away" | "offline";
}

export const statusLabels: Record<TaskStatus, string> = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

export const priorityLabels: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "No Priority",
};

export const projects: Project[] = [
  { id: "p1", name: "Website Redesign", description: "Complete redesign of the company website with modern UI", status: "active", progress: 68, tasksCount: 42, completedTasks: 28, lead: "Sarah Chen", color: "oklch(0.65 0.2 250)", members: ["Sarah Chen", "Alex Kim", "Maya Patel"] },
  { id: "p2", name: "Mobile App v2", description: "Second version of the mobile application", status: "active", progress: 35, tasksCount: 56, completedTasks: 20, lead: "Alex Kim", color: "oklch(0.65 0.2 150)", members: ["Alex Kim", "Jordan Lee", "Riley Davis"] },
  { id: "p3", name: "API Migration", description: "Migrate legacy REST APIs to GraphQL", status: "active", progress: 82, tasksCount: 31, completedTasks: 25, lead: "Jordan Lee", color: "oklch(0.75 0.18 80)", members: ["Jordan Lee", "Sam Taylor"] },
  { id: "p4", name: "Analytics Dashboard", description: "Build real-time analytics dashboard for clients", status: "on_hold", progress: 15, tasksCount: 24, completedTasks: 4, lead: "Maya Patel", color: "oklch(0.6 0.2 25)", members: ["Maya Patel", "Chris Park"] },
  { id: "p5", name: "Design System", description: "Unified component library and design tokens", status: "active", progress: 90, tasksCount: 18, completedTasks: 16, lead: "Riley Davis", color: "oklch(0.65 0.15 310)", members: ["Riley Davis", "Sarah Chen"] },
  { id: "p6", name: "CI/CD Pipeline", description: "Automated testing and deployment infrastructure", status: "completed", progress: 100, tasksCount: 15, completedTasks: 15, lead: "Sam Taylor", color: "oklch(0.55 0.15 200)", members: ["Sam Taylor", "Jordan Lee"] },
];

export const tasks: Task[] = [
  { id: "t1", title: "Design homepage hero section", description: "Create the main hero section with animated gradient", status: "in_progress", priority: "high", assignee: "Sarah Chen", project: "Website Redesign", labels: ["design", "frontend"], dueDate: "2026-04-25", createdAt: "2026-04-10" },
  { id: "t2", title: "Implement authentication flow", description: "OAuth2 + email/password login", status: "in_review", priority: "urgent", assignee: "Alex Kim", project: "Mobile App v2", labels: ["backend", "security"], dueDate: "2026-04-22", createdAt: "2026-04-08" },
  { id: "t3", title: "Migrate user endpoints", description: "Move user CRUD to GraphQL resolvers", status: "done", priority: "high", assignee: "Jordan Lee", project: "API Migration", labels: ["backend", "api"], dueDate: "2026-04-18", createdAt: "2026-04-05" },
  { id: "t4", title: "Setup chart components", description: "Integrate charting library for dashboard", status: "todo", priority: "medium", assignee: "Maya Patel", project: "Analytics Dashboard", labels: ["frontend", "data"], dueDate: "2026-04-30", createdAt: "2026-04-12" },
  { id: "t5", title: "Create button variants", description: "Primary, secondary, ghost, destructive variants", status: "done", priority: "medium", assignee: "Riley Davis", project: "Design System", labels: ["design", "components"], dueDate: "2026-04-15", createdAt: "2026-04-01" },
  { id: "t6", title: "Write API documentation", description: "Document all GraphQL queries and mutations", status: "in_progress", priority: "low", assignee: "Sam Taylor", project: "API Migration", labels: ["docs"], dueDate: "2026-05-01", createdAt: "2026-04-14" },
  { id: "t7", title: "Navigation component", description: "Responsive nav with mobile hamburger menu", status: "todo", priority: "high", assignee: "Sarah Chen", project: "Website Redesign", labels: ["frontend", "design"], dueDate: "2026-04-28", createdAt: "2026-04-13" },
  { id: "t8", title: "Push notifications", description: "FCM integration for Android and iOS", status: "backlog", priority: "medium", assignee: "Alex Kim", project: "Mobile App v2", labels: ["mobile", "backend"], dueDate: "2026-05-10", createdAt: "2026-04-09" },
  { id: "t9", title: "Performance benchmarks", description: "Load testing and optimization", status: "todo", priority: "urgent", assignee: "Jordan Lee", project: "API Migration", labels: ["devops", "performance"], dueDate: "2026-04-24", createdAt: "2026-04-11" },
  { id: "t10", title: "Color token system", description: "Define semantic color tokens for light/dark", status: "in_progress", priority: "high", assignee: "Riley Davis", project: "Design System", labels: ["design", "tokens"], dueDate: "2026-04-20", createdAt: "2026-04-02" },
  { id: "t11", title: "Setup E2E tests", description: "Cypress test suite for critical paths", status: "done", priority: "high", assignee: "Sam Taylor", project: "CI/CD Pipeline", labels: ["testing", "devops"], dueDate: "2026-04-12", createdAt: "2026-03-28" },
  { id: "t12", title: "Footer redesign", description: "Modern footer with sitemap and social links", status: "backlog", priority: "low", assignee: "Sarah Chen", project: "Website Redesign", labels: ["design", "frontend"], dueDate: "2026-05-05", createdAt: "2026-04-15" },
  { id: "t13", title: "Offline mode", description: "Local storage sync for offline capability", status: "backlog", priority: "medium", assignee: "Alex Kim", project: "Mobile App v2", labels: ["mobile", "frontend"], dueDate: "2026-05-15", createdAt: "2026-04-10" },
  { id: "t14", title: "Rate limiting middleware", description: "Implement API rate limiting with Redis", status: "in_progress", priority: "urgent", assignee: "Jordan Lee", project: "API Migration", labels: ["backend", "security"], dueDate: "2026-04-23", createdAt: "2026-04-06" },
  { id: "t15", title: "Real-time data widgets", description: "WebSocket-powered live updating charts", status: "backlog", priority: "high", assignee: "Maya Patel", project: "Analytics Dashboard", labels: ["frontend", "data"], dueDate: "2026-05-08", createdAt: "2026-04-13" },
];

export const teamMembers: TeamMember[] = [
  { id: "m1", name: "Sarah Chen", role: "Lead Designer", avatar: "SC", email: "sarah@team.com", tasksCompleted: 34, activeTasks: 3, status: "online" },
  { id: "m2", name: "Alex Kim", role: "Senior Developer", avatar: "AK", email: "alex@team.com", tasksCompleted: 28, activeTasks: 4, status: "online" },
  { id: "m3", name: "Jordan Lee", role: "Backend Engineer", avatar: "JL", email: "jordan@team.com", tasksCompleted: 41, activeTasks: 3, status: "away" },
  { id: "m4", name: "Maya Patel", role: "Frontend Developer", avatar: "MP", email: "maya@team.com", tasksCompleted: 22, activeTasks: 2, status: "online" },
  { id: "m5", name: "Riley Davis", role: "UI/UX Designer", avatar: "RD", email: "riley@team.com", tasksCompleted: 19, activeTasks: 2, status: "offline" },
  { id: "m6", name: "Sam Taylor", role: "DevOps Engineer", avatar: "ST", email: "sam@team.com", tasksCompleted: 31, activeTasks: 1, status: "online" },
  { id: "m7", name: "Chris Park", role: "Data Analyst", avatar: "CP", email: "chris@team.com", tasksCompleted: 15, activeTasks: 2, status: "away" },
];
