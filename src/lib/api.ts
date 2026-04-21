import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
export type DbProject = Tables["projects"]["Row"];
export type DbTask = Tables["tasks"]["Row"];
export type DbProfile = Tables["profiles"]["Row"];
export type DbActivity = Tables["activities"]["Row"];
export type DbProjectMember = Tables["project_members"]["Row"];

// ── Projects ──

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_members(user_id, role), tasks(id, status)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createProject(project: { name: string; description: string; color: string }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...project, owner_id: user.id })
    .select()
    .single();

  if (error) throw error;

  // Add owner as member
  await supabase.from("project_members").insert({
    project_id: data.id,
    user_id: user.id,
    role: "owner",
  });

  return data;
}

export async function updateProject(id: string, updates: Partial<Tables["projects"]["Update"]>) {
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

// ── Tasks ──

export async function fetchTasks(projectId?: string) {
  let query = supabase
    .from("tasks")
    .select("*, projects(name, color), profiles:assignee_id(full_name)")
    .order("created_at", { ascending: false });

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTask(task: {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  project_id: string;
  assignee_id?: string;
  due_date?: string;
  labels?: string[];
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...task, created_by: user.id })
    .select("*, projects(name, color), profiles:assignee_id(full_name)")
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: Partial<Tables["tasks"]["Update"]>) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*, projects(name, color), profiles:assignee_id(full_name)")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

// ── Team / Profiles ──

export async function fetchProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name");

  if (error) throw error;
  return data;
}

export async function updateProfile(id: string, updates: Partial<Tables["profiles"]["Update"]>) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ── Activities ──

export async function fetchActivities(limit = 20) {
  const { data, error } = await supabase
    .from("activities")
    .select("*, profiles:user_id(full_name)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function logActivity(activity: {
  action: string;
  description: string;
  project_id?: string;
  task_id?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("activities").insert({
    ...activity,
    user_id: user.id,
  });
}

// ── Project Members ──

export async function addProjectMember(projectId: string, userId: string, role: string = "member") {
  const { error } = await supabase
    .from("project_members")
    .insert({ project_id: projectId, user_id: userId, role });

  if (error) throw error;
}

export async function removeProjectMember(projectId: string, userId: string) {
  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("project_id", projectId)
    .eq("user_id", userId);

  if (error) throw error;
}

// ── Dashboard Stats ──

export async function fetchDashboardStats() {
  const [tasksRes, projectsRes, profilesRes] = await Promise.all([
    supabase.from("tasks").select("id, status, priority, created_at"),
    supabase.from("projects").select("id, status, name, progress:tasks(status)"),
    supabase.from("profiles").select("id, status"),
  ]);

  return {
    tasks: tasksRes.data ?? [],
    projects: projectsRes.data ?? [],
    profiles: profilesRes.data ?? [],
  };
}
