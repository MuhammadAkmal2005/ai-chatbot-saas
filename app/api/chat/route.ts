import Groq from "groq-sdk";
import { jsonResponse, optionsResponse } from "@/lib/api";
import { isSessionRateLimited } from "@/lib/rate-limit";
import { FREE_MONTHLY_MESSAGE_LIMIT, getMonthlyMessageCount, getUserPlan } from "@/lib/usage";
import { createClient } from "@supabase/supabase-js";

const LEAD_BLOCK_REGEX = /<!--LEAD:(\{[\s\S]*?\})-->/;

const LEAD_INSTRUCTION =
  'If the visitor shares their name, email, or phone number, or clearly wants to be contacted, respond naturally AND include a hidden JSON block at the very end of your reply in this exact format: <!--LEAD:{"name":"...","email":"...","phone":"..."}--> using null for any field not provided. Only include this block when you actually have at least one piece of contact info.';

type ChatBody = {
  widgetKey?: string;
  sessionId?: string;
  message?: string;
};

type ChatLogRow = {
  role: string;
  message: string;
};

type LeadPayload = {
  name: string | null;
  email: string | null;
  phone: string | null;
};

export function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody;
    const widgetKey = body.widgetKey?.trim();
    const sessionId = body.sessionId?.trim();
    const message = body.message?.trim();

    if (!widgetKey || !sessionId || !message) {
      return jsonResponse({ error: "Invalid request." }, 400);
    }

    if (isSessionRateLimited(sessionId)) {
      return jsonResponse({ error: "Too many requests." }, 429);
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: chatbot } = await supabase
      .from("chatbots")
      .select("id, user_id, system_prompt")
      .eq("widget_key", widgetKey)
      .eq("is_active", true)
      .maybeSingle();

    if (!chatbot) {
      return jsonResponse({ error: "Chatbot not found." }, 404);
    }

    const plan = await getUserPlan(supabase, chatbot.user_id);

    if (plan === "free") {
      const monthlyCount = await getMonthlyMessageCount(supabase, chatbot.user_id);

      if (monthlyCount >= FREE_MONTHLY_MESSAGE_LIMIT) {
        return jsonResponse(
          {
            error:
              "This chatbot has reached its free plan's monthly message limit. Its owner needs to upgrade to Pro for unlimited conversations.",
          },
          429
        );
      }
    }

    const { data: historyRows } = await supabase
      .from("chat_logs")
      .select("role, message, created_at")
      .eq("session_id", sessionId)
      .eq("chatbot_id", chatbot.id)
      .order("created_at", { ascending: false })
      .limit(10);

    const history = ((historyRows ?? []) as ChatLogRow[])
      .reverse()
      .filter((row) => row.role === "user" || row.role === "assistant")
      .map((row) => ({
        role: row.role as "user" | "assistant",
        content: row.message,
      }));

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `${chatbot.system_prompt}\n\n${LEAD_INSTRUCTION}`,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const rawReply = completion.choices[0]?.message?.content ?? "";
    const { reply, lead } = extractLead(rawReply);

    if (lead) {
      await supabase.from("leads").insert({
        chatbot_id: chatbot.id,
        session_id: sessionId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
      });
    }

    await supabase.from("chat_logs").insert([
      {
        chatbot_id: chatbot.id,
        session_id: sessionId,
        role: "user",
        message,
      },
      {
        chatbot_id: chatbot.id,
        session_id: sessionId,
        role: "assistant",
        message: reply,
      },
    ]);

    return jsonResponse({ reply });
  } catch {
    return jsonResponse({ error: "Something went wrong." }, 500);
  }
}

function extractLead(rawReply: string): { reply: string; lead: LeadPayload | null } {
  const match = rawReply.match(LEAD_BLOCK_REGEX);
  if (!match) {
    return { reply: rawReply.trim(), lead: null };
  }

  let lead: LeadPayload | null = null;

  try {
    const parsed = JSON.parse(match[1]) as Partial<LeadPayload>;
    const name = normalizeLeadField(parsed.name);
    const email = normalizeLeadField(parsed.email);
    const phone = normalizeLeadField(parsed.phone);

    if (name || email || phone) {
      lead = { name, email, phone };
    }
  } catch {
    lead = null;
  }

  return {
    reply: rawReply.replace(LEAD_BLOCK_REGEX, "").trim(),
    lead,
  };
}

function normalizeLeadField(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}