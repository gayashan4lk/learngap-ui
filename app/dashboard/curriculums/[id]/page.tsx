import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  ExternalLink,
  Video,
  FileText,
  Layers,
} from "lucide-react";

export default function CurriculumDetail() {
  // Static data instead of dynamic data
  const curriculum = {
    id: "curr1",
    title: "Full-Stack Web Development Path",
    description:
      "A comprehensive curriculum to become a full-stack web developer",
    progress: 25,
    modules: [
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
                description:
                  "Understand how to declare variables and work with different data types",
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
                description:
                  "Learn how to define and use functions, and understand variable scope",
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
    ],
  };

  // Static active module
  const activeModule = curriculum.modules[0];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Article":
        return <FileText className="h-4 w-4" />;
      case "Course":
        return <Layers className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{curriculum.title}</h1>
        <p className="mt-1 text-gray-500 text-gray-500">
          {curriculum.description}
        </p>
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
                <p className="text-sm text-gray-500 text-gray-500">
                  {module.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Estimated duration: {module.duration}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Study This Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4 pt-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{activeModule.title}</h2>
              <p className="mt-1 text-gray-500 text-gray-500">
                {activeModule.description}
              </p>
              <div className="mt-2 flex items-center text-sm text-gray-500 text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                <span>Estimated duration: {activeModule.duration}</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {activeModule.steps.map((step, stepIndex) => (
                <AccordionItem key={step.id} value={step.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-500">
                        {stepIndex + 1}
                      </span>
                      {step.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="text-gray-500 text-gray-500">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-medium">Checkpoints</h4>
                      {step.checkpoints.map((checkpoint, checkpointIndex) => (
                        <Card key={checkpoint.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              <div className="flex items-center">
                                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-500">
                                  {checkpointIndex + 1}
                                </span>
                                {checkpoint.title}
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-gray-500 text-gray-500">
                              {checkpoint.description}
                            </p>

                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">
                                Learning Resources
                              </h5>
                              {checkpoint.resources.map((resource) => (
                                <div
                                  key={resource.id}
                                  className="flex items-center justify-between rounded-md border border-gray-300 p-3"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 bg-gray-100">
                                      {getResourceIcon(resource.type)}
                                    </div>
                                    <div>
                                      <p className="font-medium">
                                        {resource.title}
                                      </p>
                                      <p className="text-xs text-gray-500 text-gray-500">
                                        {resource.type}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`resource-${resource.id}`}
                                      checked={resource.completed}
                                    />
                                    <Button variant="ghost" size="icon" asChild>
                                      <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
