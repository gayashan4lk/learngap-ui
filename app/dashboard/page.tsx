import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function Dashboard() {
  // Static data instead of dynamic data
  const curriculums = [
    {
      id: "curr1",
      title: "Full-Stack Web Development Path",
      description:
        "A comprehensive curriculum to become a full-stack web developer",
      progress: 25,
      modules: [
        { id: "m1", duration: "2 weeks" },
        { id: "m2", duration: "3 weeks" },
        { id: "m3", duration: "4 weeks" },
      ],
    },
    {
      id: "curr2",
      title: "Data Science Fundamentals",
      description: "Learn the core concepts of data science and analysis",
      progress: 40,
      modules: [
        { id: "m4", duration: "3 weeks" },
        { id: "m5", duration: "2 weeks" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {curriculums.map((curriculum) => (
          <Card key={curriculum.id} className="overflow-hidden">
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
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{curriculum.modules.length} modules</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>
                    {curriculum.modules.reduce((total, module) => {
                      const duration = module.duration.split(" ")[0];
                      return total + Number.parseInt(duration);
                    }, 0)}{" "}
                    weeks
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/curriculums/${curriculum.id}`}>
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
