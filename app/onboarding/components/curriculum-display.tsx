"use client"

import { useEffect } from "react"
import { useOnboarding, type Curriculum, type CurriculumModule } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"

// Mock curriculum generation function
function generateMockCurriculum(): Curriculum {
  const modules: CurriculumModule[] = [
    {
      id: "m1",
      title: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming",
      priority: "High",
      duration: "2 weeks",
      order: 1,
      steps: [
        {
          id: "s1",
          title: "JavaScript Basics",
          description: "Learn variables, data types, and control structures",
          checkpoints: [
            {
              id: "c1",
              title: "Variables and Data Types",
              description: "Understand how to declare variables and work with different data types",
              resources: [
                {
                  id: "r1",
                  title: "JavaScript Variables - MDN",
                  type: "Article",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
                  completed: false,
                },
                {
                  id: "r2",
                  title: "JavaScript Fundamentals",
                  type: "Course",
                  url: "https://www.udemy.com/course/javascript-fundamentals/",
                  completed: false,
                },
              ],
            },
            {
              id: "c2",
              title: "Functions and Scope",
              description: "Learn how to define and use functions, and understand variable scope",
              resources: [
                {
                  id: "r3",
                  title: "JavaScript Functions - MDN",
                  type: "Article",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "React Basics",
      description: "Learn the fundamentals of React.js",
      priority: "High",
      duration: "3 weeks",
      order: 2,
      steps: [
        {
          id: "s2",
          title: "React Components",
          description: "Understand React components and their lifecycle",
          checkpoints: [
            {
              id: "c3",
              title: "Component Basics",
              description: "Learn about functional and class components",
              resources: [
                {
                  id: "r4",
                  title: "React Components - Official Docs",
                  type: "Article",
                  url: "https://reactjs.org/docs/components-and-props.html",
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Node.js and Express",
      description: "Build server-side applications with Node.js and Express",
      priority: "Medium",
      duration: "4 weeks",
      order: 3,
      steps: [
        {
          id: "s3",
          title: "Node.js Basics",
          description: "Learn the fundamentals of Node.js",
          checkpoints: [
            {
              id: "c4",
              title: "Node.js Runtime",
              description: "Understand the Node.js runtime and its features",
              resources: [
                {
                  id: "r5",
                  title: "Introduction to Node.js",
                  type: "Video",
                  url: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  return {
    id: "curr1",
    title: "Full-Stack Web Development Path",
    description: "A comprehensive curriculum to become a full-stack web developer",
    createdAt: new Date(),
    modules,
    progress: 0,
  }
}

export function CurriculumDisplay() {
  const { curriculum, setCurriculum, setStep } = useOnboarding()

  useEffect(() => {
    if (!curriculum) {
      // In a real application, we would generate the curriculum based on the user's information and learning goal
      const generatedCurriculum = generateMockCurriculum()
      setCurriculum(generatedCurriculum)
    }
  }, [curriculum, setCurriculum])

  const handleBack = () => {
    setStep(2)
  }

  const handleNext = () => {
    setStep(4)
  }

  if (!curriculum) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔄</div>
          <h3 className="text-lg font-medium">Generating your curriculum...</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This may take a moment as we analyze your profile and learning goals.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{curriculum.title}</h2>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{curriculum.description}</p>
      </div>

      <div className="space-y-4">
        {curriculum.modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <Badge
                  variant={
                    module.priority === "High" ? "destructive" : module.priority === "Medium" ? "default" : "secondary"
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
                <div className="text-sm font-medium">
                  Module {module.order} of {curriculum.modules.length}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

