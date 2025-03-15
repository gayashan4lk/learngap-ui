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
import { Badge } from "@/components/ui/badge";

import { analysisMockData as mockData } from "@/mock_data/analysis_mock_data";

export default function AnalysisPage() {
  const getSkillGapStatus = (skillName: string) => {
    const userSkill = mockData.userSkills.find(
      (skill) => skill.name === skillName
    );
    const requiredSkill = mockData.requiredSkills.find(
      (skill) => skill.name === skillName
    );

    if (!userSkill) return "missing";
    if (userSkill.level < requiredSkill!.level) return "gap";
    return "sufficient";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Skills Gap Analysis</CardTitle>
          <CardDescription>
            Based on your profile and learning objectives, we've identified the
            following skills gaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Skills Comparison</h3>

            <div className="space-y-4">
              {mockData.requiredSkills.map((skill) => {
                const userSkill = mockData.userSkills.find(
                  (s) => s.name === skill.name
                );
                const userLevel = userSkill ? userSkill.level : 0;
                const status = getSkillGapStatus(skill.name);

                return (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        {status === "missing" && (
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 border-red-200"
                          >
                            Missing
                          </Badge>
                        )}
                        {status === "gap" && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 border-yellow-200"
                          >
                            Needs Improvement
                          </Badge>
                        )}
                        {status === "sufficient" && (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            Sufficient
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {userLevel}% / {skill.level}% Required
                      </span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-full">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${userLevel}%` }}
                          />
                        </div>
                      </div>
                      {/* <div className="h-2 w-2 rounded-full bg-primary" /> */}
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-muted-foreground"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Your Personalized Curriculum
          </CardTitle>
          <CardDescription>
            Based on your skills gap analysis, we've created a tailored learning
            path for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockData.curriculum.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority} Priority
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Estimated duration: {item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/onboarding/objectives">
            <Button className="cursor-pointer" variant="outline">
              Try Again
            </Button>
          </Link>
          <Link href="/onboarding/confirmation">
            <Button className="cursor-pointer">
              Proceed with This Curriculum
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
