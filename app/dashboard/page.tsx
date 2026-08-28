import { redirect } from "next/navigation";
import { Bot } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Chatbot } from "@/lib/types";
import { createChatbot } from "./actions";
import { CreateChatbotButton } from "./create-chatbot-button";
import { ChatbotsList } from "./chatbots-list";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("chatbots")
    .select("id, name, is_active")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const chatbots = (data ?? []) as Pick<Chatbot, "id" | "name" | "is_active">[];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-cloud">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Create and manage the chatbots on your websites.
          </p>
        </div>
        {chatbots.length > 0 && (
          <form action={createChatbot}>
            <CreateChatbotButton label="+ New Chatbot" />
          </form>
        )}
      </div>

      {chatbots.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-surface-2 bg-surface px-6 py-16 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-amber">
            <Bot className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-lg text-cloud">
            No chatbots yet
          </h2>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Create your first chatbot, customize its look, and embed it on your site.
          </p>
          <form action={createChatbot} className="mt-6">
            <CreateChatbotButton label="Create Your First Chatbot" variant="empty" />
          </form>
        </div>
      ) : (
        <ChatbotsList chatbots={chatbots} />
      )}
    </div>
  );
}