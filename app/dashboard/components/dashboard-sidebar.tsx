"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, BookOpen, BarChart, Settings, PlusCircle } from "lucide-react"

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
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 md:block md:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold">Learn Gap</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-2">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700",
                  pathname === item.href ? "bg-gray-200 dark:bg-gray-700" : "transparent",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Button className="w-full" asChild>
            <Link href="/onboarding">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Curriculum
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

