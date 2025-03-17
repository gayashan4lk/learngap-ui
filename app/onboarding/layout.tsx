"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mb-4 py-4">
          <h1 className="text-center text-3xl font-bold">
            Create Your Learning Path
          </h1>
          <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
            Complete the steps below to generate your personalized curriculum
          </p>
        </div>
        {/* <div className="container mx-auto py-8">{children}</div> */}
        <div className="container max-w-3xl mx-auto">{children}</div>
      </div>
    </QueryClientProvider>
  );
}
