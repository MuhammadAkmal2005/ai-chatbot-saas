import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserPlan } from "@/lib/usage";
import type { Chatbot } from "@/lib/types";
import { ChatbotEditor } from "./chatbot-editor";
import { DeleteChatbotButton } from "./delete-chatbot-button";

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
      "id, user_id, name, welcome_message, system_prompt, primary_color, header_color, avatar_url, position, is_active, widget_key, created_at"
    )
    .eq("id", params.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const chatbot = data as Chatbot;
  const plan = await getUserPlan(supabase, user.id);

  return (
    <div>
      <Link href="/dashboard" className="text-sm font-medium text-amber hover:brightness-110">
        ← Back to dashboard
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-cloud">{chatbot.name}</h1>
          <p className="mt-1 text-sm text-muted">
            Customize how your chatbot looks and what it says.
          </p>
        </div>
        <DeleteChatbotButton chatbotId={chatbot.id} chatbotName={chatbot.name} />
      </div>
      <div className="mb-6" />
      <ChatbotEditor chatbot={chatbot} isPro={plan === "pro"} />
    </div>
  );
}