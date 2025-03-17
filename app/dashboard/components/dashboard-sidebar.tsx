"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  BarChart,
  Settings,
  PlusCircle,
  Loader,
  MessageCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "My Curriculums",
    href: "/dashboard/curriculums",
    icon: BookOpen,
  },
  {
    title: "My Analyzes",
    href: "/dashboard/analyzes",
    icon: BarChart,
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: Loader,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
];

export function DashboardSidebar() {
  // Static pathname instead of dynami
  const pathname = usePathname();

  return (
    <div className="hidden border-r border-l md:block md:w-56">
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-1 p-2">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                pathname === item.href ? "bg-muted" : "transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
