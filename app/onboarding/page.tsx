"use client"

import { useOnboarding } from "../context/onboarding-context"
import { UserInfoForm } from "./components/user-info-form"
import { LearningGoalForm } from "./components/learning-goal-form"
import { CurriculumDisplay } from "./components/curriculum-display"
import { CurriculumConfirmation } from "./components/curriculum-confirmation"
import { Steps } from "./components/steps"

export default function Onboarding() {
  const { step } = useOnboarding()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold">Create Your Learning Path</h1>
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
          Complete the steps below to generate your personalized curriculum
        </p>
      </div>

      <Steps />

      <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        {step === 1 && <UserInfoForm />}
        {step === 2 && <LearningGoalForm />}
        {step === 3 && <CurriculumDisplay />}
        {step === 4 && <CurriculumConfirmation />}
      </div>
    </div>
  )
}

