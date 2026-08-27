"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; theme?: string }
      ) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const containerId = useId();
  const rendered = useRef(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    function renderWidget() {
      if (rendered.current || !window.turnstile) return;
      const el = document.getElementById(containerId);
      if (!el) return;
      window.turnstile.render(el, {
        sitekey: siteKey!,
        callback: onVerify,
        theme: "dark",
      });
      rendered.current = true;
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", renderWidget);
      return () => existing.removeEventListener("load", renderWidget);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget);
    document.head.appendChild(script);
  }, [containerId, onVerify]);

  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return null;
  }

  return <div id={containerId} className="mt-2" />;
}