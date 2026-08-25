import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";
import { LeadsTable } from "./leads-table";

type LeadQueryRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  chatbots: { name: string } | { name: string }[] | null;
};

export default async function LeadsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("leads")
    .select("id, name, email, phone, created_at, chatbots!inner(name, user_id)")
    .eq("chatbots.user_id", user.id)
    .order("created_at", { ascending: false });

  const leads: Lead[] = ((data ?? []) as LeadQueryRow[]).map((row) => {
    const chatbot = Array.isArray(row.chatbots) ? row.chatbots[0] : row.chatbots;

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      created_at: row.created_at,
      chatbot_name: chatbot?.name ?? "Unknown",
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
      <p className="mt-1 text-sm text-slate-600">
        Everyone captured across your chatbots.
      </p>
      <LeadsTable leads={leads} />
    </div>
  );
}
