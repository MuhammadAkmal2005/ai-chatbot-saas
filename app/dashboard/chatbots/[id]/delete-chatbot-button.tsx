"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteChatbot } from "../../actions";

export function DeleteChatbotButton({ chatbotId, chatbotName }: { chatbotId: string; chatbotName: string }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4" />
        Delete chatbot
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
      <p className="text-sm text-cloud">
        Delete <strong>{chatbotName}</strong>? This removes its embed, all
        captured leads, and chat history permanently. This can&apos;t be
        undone.
      </p>
      <div className="mt-3 flex gap-2">
        <form
          action={async () => {
            setDeleting(true);
            await deleteChatbot(chatbotId);
          }}
        >
          <button
            type="submit"
            disabled={deleting}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Yes, delete it"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="rounded-xl border border-surface-2 px-4 py-2 text-sm font-medium text-cloud hover:bg-surface-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}