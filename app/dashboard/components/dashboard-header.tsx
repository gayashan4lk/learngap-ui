import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, User } from "lucide-react";

export function DashboardHeader() {
  // Static data instead of dynamic data
  const userInfo = {
    name: "John Doe",
  };

  return (
    <header className="border">
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        <Link href="/dashboard" className="font-medium">
          Learn Gap
        </Link>
        <div className="flex justify-end gap-2">
          <Button asChild>
            <Link href="/onboarding/objectives">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Curriculum
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border-2 border-gray-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userInfo.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/settings">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
