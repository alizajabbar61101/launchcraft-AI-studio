import { supabase } from "./supabaseClient";

export async function updateProjectProgress(projectId) {
  // Count messages in this project
  const { count } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);

  let progress = 5;

  if (count >= 2) progress = 20;
  if (count >= 4) progress = 35;
  if (count >= 8) progress = 50;
  if (count >= 12) progress = 65;
  if (count >= 18) progress = 80;
  if (count >= 25) progress = 95;

  await supabase
    .from("projects")
    .update({
      progress,
    })
    .eq("id", projectId);

  return progress;
}