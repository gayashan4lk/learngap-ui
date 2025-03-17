import type React from "react";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen mx-auto">
      <div className="flex min-h-screen flex-col">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
          <DashboardHeader />
        </div>
        <div className="flex flex-1 border-r pt-12">
          <DashboardSidebar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
