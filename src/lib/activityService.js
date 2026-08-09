import { supabase } from "./supabaseClient";

export async function addActivity(projectId, title) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("activities")
    .insert([
      {
        user_id: user.id,
        project_id: projectId,
        title,
      },
    ]);

  if (error) throw error;
}

export async function getActivities() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw error;

  return data;
}