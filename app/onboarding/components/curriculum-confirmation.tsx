"use client"

import { useRouter } from "next/navigation"
import { useOnboarding } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, RefreshCw } from "lucide-react"

export function CurriculumConfirmation() {
  const router = useRouter()
  const { curriculum, addCurriculum, setStep } = useOnboarding()

  const handleTryAgain = () => {
    setStep(2)
  }

  const handleConfirm = () => {
    if (curriculum) {
      addCurriculum(curriculum)
      router.push("/dashboard")
    }
  }

  if (!curriculum) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold">Your Curriculum is Ready!</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We've created a personalized learning path based on your goals and background.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{curriculum.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>{curriculum.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {curriculum.modules.length} modules • Estimated completion:{" "}
              {curriculum.modules.reduce((total, module) => {
                const duration = module.duration.split(" ")[0]
                return total + Number.parseInt(duration)
              }, 0)}{" "}
              weeks
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Not satisfied with this curriculum? You can try again with a different learning goal.
        </p>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button variant="outline" className="flex-1" onClick={handleTryAgain}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button className="flex-1" onClick={handleConfirm}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm and Proceed
          </Button>
        </div>
      </div>
    </div>
  )
}

