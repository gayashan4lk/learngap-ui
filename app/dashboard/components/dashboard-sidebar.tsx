import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, BarChart, Settings, PlusCircle } from "lucide-react";

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
    title: "Progress",
    href: "/dashboard/progress",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  // Static pathname instead of dynamic
  const pathname = "/dashboard";

  return (
    <div className="hidden border-r md:block md:w-56">
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
        <div className="border-t p-2">
          <Button className="w-full justify-start" variant="outline" asChild>
            <Link href="/onboarding">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Curriculum
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
