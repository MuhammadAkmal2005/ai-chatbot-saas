import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Chatbot } from "@/lib/types";
import { ChatbotEditor } from "./chatbot-editor";

type Props = {
  params: { id: string };
};

export default async function ChatbotEditorPage({ params }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("chatbots")
    .select(
      "id, user_id, name, welcome_message, system_prompt, primary_color, position, is_active, widget_key, created_at"
    )
    .eq("id", params.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const chatbot = data as Chatbot;

  return (
    <div>
      <Link href="/dashboard" className="text-sm font-medium text-amber hover:brightness-110">
        ← Back to dashboard
      </Link>
      <h1 className="mt-3 font-display text-2xl text-cloud">{chatbot.name}</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        Customize how your chatbot looks and what it says.
      </p>
      <ChatbotEditor chatbot={chatbot} />
    </div>
  );
}