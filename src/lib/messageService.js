import { supabase } from "./supabaseClient";

export async function saveMessage(projectId, role, message) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("messages").insert([
    {
      project_id: projectId,
      user_id: user.id,
      role,
      message,
    },
  ]);

  if (error) throw error;
}

export async function loadMessages(projectId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
}

export async function deleteMessages(projectId) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("project_id", projectId);

  if (error) throw error;
}