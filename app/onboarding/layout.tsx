import type React from "react"
import { OnboardingProvider } from "../context/onboarding-context"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto py-8">{children}</div>
      </div>
    </OnboardingProvider>
  )
}

