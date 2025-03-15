"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useOnboarding, type Curriculum, type CurriculumModule } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Clock, ExternalLink, Video, FileText, Layers } from "lucide-react"

export default function CurriculumDetail() {
  const params = useParams()
  const { curriculums } = useOnboarding()
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [activeModule, setActiveModule] = useState<CurriculumModule | null>(null)

  useEffect(() => {
    const found = curriculums.find((c) => c.id === params.id)
    if (found) {
      setCurriculum(found)
      setActiveModule(found.modules[0])
    }
  }, [curriculums, params.id])

  if (!curriculum) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium">Curriculum not found</h3>
        </div>
      </div>
    )
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />
      case "Article":
        return <FileText className="h-4 w-4" />
      case "Course":
        return <Layers className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{curriculum.title}</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{curriculum.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Completion</span>
              <span>{curriculum.progress}%</span>
            </div>
            <Progress value={curriculum.progress} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="modules">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="active">Active Module</TabsTrigger>
        </TabsList>
        <TabsContent value="modules" className="space-y-4 pt-4">
          {curriculum.modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <Badge
                    variant={
                      module.priority === "High"
                        ? "destructive"
                        : module.priority === "Medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {module.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{module.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Estimated duration: {module.duration}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveModule(module)}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Study This Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4 pt-4">
          {activeModule ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{activeModule.title}</h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">{activeModule.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Estimated duration: {activeModule.duration}</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {activeModule.steps.map((step, stepIndex) => (
                  <AccordionItem key={step.id} value={step.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium dark:bg-gray-700">
                          {stepIndex + 1}
                        </span>
                        {step.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-gray-500 dark:text-gray-400">{step.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-medium">Checkpoints</h4>
                        {step.checkpoints.map((checkpoint, checkpointIndex) => (
                          <Card key={checkpoint.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">
                                <div className="flex items-center">
                                  <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium dark:bg-gray-700">
                                    {checkpointIndex + 1}
                                  </span>
                                  {checkpoint.title}
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-sm text-gray-500 dark:text-gray-400">{checkpoint.description}</p>

                              <div className="space-y-2">
                                <h5 className="text-sm font-medium">Learning Resources</h5>
                                {checkpoint.resources.map((resource) => (
                                  <div
                                    key={resource.id}
                                    className="flex items-center justify-between rounded-md border p-3"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                        {getResourceIcon(resource.type)}
                                      </div>
                                      <div>
                                        <p className="font-medium">{resource.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id={`resource-${resource.id}`} checked={resource.completed} />
                                      <Button variant="ghost" size="icon" asChild>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-4 w-4" />
                                        </a>
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">No module selected</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select a module from the Modules tab to start learning
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

