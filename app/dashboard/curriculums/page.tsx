"use client"

import Link from "next/link"
import { useOnboarding } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PlusCircle, BookOpen, Clock, ArrowRight } from "lucide-react"

export default function Curriculums() {
  const { curriculums } = useOnboarding()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Curriculums</h1>
        <Button asChild>
          <Link href="/onboarding">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Curriculum
          </Link>
        </Button>
      </div>

      {curriculums.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculums.map((curriculum) => (
            <Card key={curriculum.id}>
              <CardHeader className="pb-2">
                <CardTitle>{curriculum.title}</CardTitle>
                <CardDescription>{curriculum.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{curriculum.progress}%</span>
                    </div>
                    <Progress value={curriculum.progress} />
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="mr-1 h-4 w-4" />
                    <span>{curriculum.modules.length} modules</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span>
                      {curriculum.modules.reduce((total, module) => {
                        const duration = module.duration.split(" ")[0]
                        return total + Number.parseInt(duration)
                      }, 0)}{" "}
                      weeks
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/curriculums/${curriculum.id}`}>
                    View Curriculum
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Curriculums Found</CardTitle>
            <CardDescription>
              You haven't created any curriculums yet. Get started by creating your first learning path.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/onboarding">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Curriculum
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

