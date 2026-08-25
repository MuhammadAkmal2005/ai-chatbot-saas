"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createChatbot() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("chatbots")
    .insert({
      user_id: user.id,
      name: "My Chatbot",
      welcome_message: "Hi! How can I help you today?",
      system_prompt:
        "You are a support agent. Be friendly and try to collect the visitor's email if they ask a question you can't answer.",
      primary_color: "#4f46e5",
      position: "bottom-right",
      is_active: true,
      widget_key: crypto.randomUUID(),
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Could not create chatbot.");
  }

  redirect(`/dashboard/chatbots/${data.id}`);
}
