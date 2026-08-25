"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Chatbot, ChatbotPosition } from "@/lib/types";

type Props = {
  chatbot: Chatbot;
};

export function ChatbotEditor({ chatbot }: Props) {
  const [name, setName] = useState(chatbot.name);
  const [welcomeMessage, setWelcomeMessage] = useState(chatbot.welcome_message);
  const [systemPrompt, setSystemPrompt] = useState(chatbot.system_prompt);
  const [primaryColor, setPrimaryColor] = useState(chatbot.primary_color);
  const [position, setPosition] = useState<ChatbotPosition>(chatbot.position);
  const [isActive, setIsActive] = useState(chatbot.is_active);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="${process.env.NEXT_PUBLIC_SITE_URL}/widget.js" data-widget-key="${chatbot.widget_key}"></script>`;

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("chatbots")
      .update({
        name,
        welcome_message: welcomeMessage,
        system_prompt: systemPrompt,
        primary_color: primaryColor,
        position,
        is_active: isActive,
      })
      .eq("id", chatbot.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  async function copyEmbedCode() {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const previewAlign = position === "bottom-left" ? "items-start" : "items-end";

  const contrastText = useMemo(
    () => (isLightColor(primaryColor) ? "#0f172a" : "#ffffff"),
    [primaryColor]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Chatbot Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="welcome" className="block text-sm font-medium text-slate-700">
            Welcome Message
          </label>
          <textarea
            id="welcome"
            rows={3}
            value={welcomeMessage}
            onChange={(event) => setWelcomeMessage(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-700">
            AI Instructions — tell the AI how to behave, e.g. &apos;You are a support
            agent for [business]. Be friendly and try to collect the visitor&apos;s email
            if they ask a question you can&apos;t answer.&apos;
          </label>
          <textarea
            id="prompt"
            rows={6}
            value={systemPrompt}
            onChange={(event) => setSystemPrompt(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-slate-700">
            Primary Color
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              id="color"
              type="color"
              value={normalizeHex(primaryColor)}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="h-10 w-14 cursor-pointer rounded-xl border border-slate-300 bg-white p-1"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-slate-700">
            Position
          </label>
          <select
            id="position"
            value={position}
            onChange={(event) => setPosition(event.target.value as ChatbotPosition)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-left">Bottom left</option>
          </select>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3">
          <div>
            <p className="text-sm font-medium text-slate-900">Active</p>
            <p className="text-xs text-slate-500">
              Inactive chatbots will not appear on your website.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isActive}
            onClick={() => setIsActive((value) => !value)}
            className={`relative h-6 w-11 rounded-full transition ${
              isActive ? "bg-indigo-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                isActive ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {saved && (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Changes saved.
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Live preview</h2>
          <p className="mt-1 text-xs text-slate-500">
            Updates as you edit. This is a visual mockup — it does not call the AI.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <div className={`flex min-h-[420px] flex-col justify-end p-4 ${previewAlign}`}>
              <div className="mb-3 w-full max-w-[280px] overflow-hidden rounded-xl bg-white shadow-sm">
                <div
                  className="px-4 py-3 text-sm font-semibold"
                  style={{ backgroundColor: primaryColor, color: contrastText }}
                >
                  {name || "Chatbot"}
                </div>
                <div className="p-4">
                  <div className="max-w-[90%] rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    {welcomeMessage || "Hi! How can I help you today?"}
                  </div>
                  <div className="mt-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400">
                    Type a message...
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Chat bubble preview"
                className="flex h-14 w-14 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: primaryColor, color: contrastText }}
              >
                <MessageCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">Embed Code</h2>
            <button
              type="button"
              onClick={copyEmbedCode}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Code"}
            </button>
          </div>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
            {embedCode}
          </pre>
          <p className="mt-3 text-xs text-slate-500">
            Paste this snippet before the closing {`</body>`} tag on your website
          </p>
        </div>
      </div>
    </div>
  );
}

function normalizeHex(value: string) {
  if (!value) return "#4f46e5";
  const hex = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) return hex;
  if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return hex.startsWith("#") ? hex : `#${hex}`;
}

function isLightColor(value: string) {
  const hex = normalizeHex(value).slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
