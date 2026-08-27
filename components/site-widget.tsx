"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const EXCLUDED_PREFIXES = ["/dashboard", "/auth", "/login", "/signup"];

export function SiteWidget() {
  const pathname = usePathname();
  const widgetKey = process.env.NEXT_PUBLIC_OWN_WIDGET_KEY;

  const isExcluded = EXCLUDED_PREFIXES.some((prefix) =>
    pathname?.startsWith(prefix)
  );

  if (!widgetKey || isExcluded) {
    return null;
  }

  return (
    <Script src="/widget.js" data-widget-key={widgetKey} strategy="afterInteractive" />
  );
}