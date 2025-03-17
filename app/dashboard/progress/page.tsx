import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, BookOpen } from "lucide-react";

export default function ProgressPage() {
  // Static data instead of dynamic data
  const curriculums = [
    {
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
          duration: "2 weeks",
        },
        {
          id: "m2",
          title: "React Basics",
          description: "Learn the fundamentals of React.js",
          duration: "3 weeks",
        },
        {
          id: "m3",
          title: "Node.js and Express",
          description:
            "Build server-side applications with Node.js and Express",
          duration: "4 weeks",
        },
      ],
    },
    {
      id: "curr2",
      title: "Data Science Fundamentals",
      description: "Learn the core concepts of data science and analysis",
      progress: 40,
      modules: [
        {
          id: "m4",
          title: "Python for Data Science",
          description: "Learn Python programming for data analysis",
          duration: "3 weeks",
        },
        {
          id: "m5",
          title: "Data Visualization",
          description: "Create effective visualizations with Python libraries",
          duration: "2 weeks",
        },
      ],
    },
  ];

  // Calculate overall progress across all curriculums
  const overallProgress = 30; // Static value

  // Calculate total learning time in weeks
  const totalLearningTime = 14; // Static value

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Learning Progress</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Curriculums
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Total Learning Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              <div className="text-2xl font-bold">
                {totalLearningTime} weeks
              </div>
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

                  <div className="grid gap-4 md:grid-cols-3">
                    {curriculum.modules.map((module) => (
                      <Card key={module.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            {module.title}
                          </CardTitle>
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
          ))}
        </TabsContent>

        <TabsContent value="skills" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>
                Track your progress in developing specific skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
