import { supabase } from "./supabaseClient";

export async function createProject(project) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: user.id,
        name: project.name,
        idea: project.idea,
        audience: project.audience,
        progress: 0,
        status: "Planning",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getProjects() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function deleteProject(id) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}