"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, LayoutDashboard, Menu, Settings, Users, X } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chatbots", label: "My Chatbots", icon: Bot },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink text-cloud md:flex">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-surface-2 bg-surface px-4 py-3 md:hidden">
        <Link href="/dashboard" className="font-display text-lg text-cloud">
          Chatbot SaaS
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-cloud hover:bg-surface-2"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r border-surface-2 bg-surface p-4">
            <div className="flex items-center justify-between px-1 py-2">
              <span className="font-display text-lg text-cloud">Chatbot SaaS</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-cloud hover:bg-surface-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-1 flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-cloud"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <LogoutButton />
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-2 bg-surface p-4 md:flex">
        <div className="flex items-center justify-between px-3 py-2">
          <Link href="/dashboard" className="font-display text-lg text-cloud">
            Chatbot SaaS
          </Link>
          <ThemeToggle />
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-cloud"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <LogoutButton />
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-4 pt-20 sm:p-6 md:p-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}