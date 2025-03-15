"use client"

import { useOnboarding } from "@/app/context/onboarding-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, BookOpen } from "lucide-react"

export default function ProgressPage() {
  const { curriculums } = useOnboarding()

  // Calculate overall progress across all curriculums
  const overallProgress = curriculums.length
    ? Math.round(curriculums.reduce((sum, curr) => sum + curr.progress, 0) / curriculums.length)
    : 0

  // Calculate total learning time in weeks
  const totalLearningTime = curriculums.reduce(
    (total, curriculum) =>
      total +
      curriculum.modules.reduce((moduleTotal, module) => {
        const duration = module.duration.split(" ")[0]
        return moduleTotal + Number.parseInt(duration)
      }, 0),
    0,
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Learning Progress</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Curriculums</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              <div className="text-2xl font-bold">{curriculums.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              <div className="text-2xl font-bold">{totalLearningTime} weeks</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="curriculums">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="curriculums">Curriculum Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculums" className="space-y-4 pt-4">
          {curriculums.length > 0 ? (
            curriculums.map((curriculum) => (
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

                    <div className="grid gap-4 md:grid-cols-3">
                      {curriculum.modules.map((module) => (
                        <Card key={module.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{module.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-xs">
                              <span>Progress</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="mt-1" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Curriculums Found</CardTitle>
                <CardDescription>You haven't created any curriculums yet.</CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="skills" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Track your progress in developing specific skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curriculums.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>JavaScript</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>React</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Node.js</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p>No skills data available yet.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start a curriculum to begin tracking your skills development.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

