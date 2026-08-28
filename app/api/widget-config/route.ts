import { jsonResponse, optionsResponse } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";

export function OPTIONS() {
  return optionsResponse();
}

export async function GET(request: Request) {
  try {
    const widgetKey = new URL(request.url).searchParams.get("widgetKey")?.trim();

    if (!widgetKey) {
      return jsonResponse({ error: "Missing widgetKey." }, 400);
    }

    const supabase = createClient();
    const { data: chatbot } = await supabase
      .from("chatbots")
      .select("name, welcome_message, primary_color, header_color, avatar_url, position")
      .eq("widget_key", widgetKey)
      .eq("is_active", true)
      .maybeSingle();

    if (!chatbot) {
      return jsonResponse({ error: "Chatbot not found." }, 404);
    }

    return jsonResponse({
      name: chatbot.name,
      welcome_message: chatbot.welcome_message,
      primary_color: chatbot.primary_color,
      header_color: chatbot.header_color,
      avatar_url: chatbot.avatar_url,
      position: chatbot.position,
    });
  } catch {
    return jsonResponse({ error: "Something went wrong." }, 500);
  }
}