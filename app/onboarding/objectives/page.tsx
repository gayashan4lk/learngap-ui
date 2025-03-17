import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Lightbulb, FileText } from "lucide-react";
import Link from "next/link";

export default function ObjectivesPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          Describe Your Learning Objectives
        </CardTitle>
        <CardDescription>
          Help us understand what you want to learn so we can create a
          personalized curriculum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="specific"
          //   onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="specific" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Specific Requirement</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>I Don't Know What to Learn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specific" className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requirement">
                Enter a specific requirement (e.g., job description, project
                requirements)
              </Label>
              <Textarea
                id="requirement"
                placeholder="Paste a job description or describe a project you want to build..."
                // value={specificRequirement}
                // onChange={(e) => setSpecificRequirement(e.target.value)}
                rows={8}
              />
            </div>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">
                <strong>Tip:</strong> The more details you provide, the better
                we can tailor your learning path. Include specific technologies,
                skills, or concepts you want to learn.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="discover" className="mt-6 space-y-6">
            <p className="text-sm text-muted-foreground">
              Based on your profile, we'll suggest learning paths that match
              your background and interests. Please select your preferred
              learning direction:
            </p>

            <RadioGroup
            //   value={learningPreference}
            //   onValueChange={setLearningPreference}
            >
              <div className="flex items-start space-x-2 mb-4">
                <RadioGroupItem
                  value="career-advancement"
                  id="career-advancement"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="career-advancement" className="font-medium">
                    Career Advancement
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Learn skills to progress in your current career path
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <RadioGroupItem value="career-change" id="career-change" />
                <div className="grid gap-1.5">
                  <Label htmlFor="career-change" className="font-medium">
                    Career Change
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Develop skills for transitioning to a new field
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <RadioGroupItem
                  value="specific-project"
                  id="specific-project"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="specific-project" className="font-medium">
                    Project-Based Learning
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Learn what you need to complete a specific project
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value="general-knowledge"
                  id="general-knowledge"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="general-knowledge" className="font-medium">
                    General Knowledge
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Expand your knowledge in trending technologies and concepts
                  </p>
                </div>
              </div>
            </RadioGroup>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/onboarding/profile">
          <Button variant="outline">Back</Button>
        </Link>
        <Link href="/onboarding/analysis">
          <Button>Continue to Skills Analysis</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
