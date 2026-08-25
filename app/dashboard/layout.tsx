import Link from "next/link";
import { Bot, LayoutDashboard, Settings, Users } from "lucide-react";
import { LogoutButton } from "./logout-button";

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
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-4">
        <Link href="/dashboard" className="px-3 py-2 text-lg font-semibold text-indigo-600">
          Chatbot SaaS
        </Link>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <LogoutButton />
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
