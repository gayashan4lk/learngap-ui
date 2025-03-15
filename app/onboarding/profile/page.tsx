"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Profile</CardTitle>
        <CardDescription>
          Tell us about yourself so we can personalize your learning experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={() => {
            console.log("submit");
          }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  //   value={formData.name}
                  //   onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  //   value={formData.email}
                  //   onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Educational Background</Label>
              <Textarea
                id="education"
                name="education"
                placeholder="Describe your educational background, degrees, certifications, etc."
                // value={formData.education}
                // onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Professional Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                placeholder="Describe your work experience, roles, and responsibilities"
                // value={formData.experience}
                // onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="List your technical and soft skills (e.g., JavaScript, Python, Project Management)"
                // value={formData.skills}
                // onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect Your Accounts</h3>
            <p className="text-sm text-muted-foreground">
              Connecting your accounts helps us better understand your skills
              and experience
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                <span>Connect LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span>Connect GitHub</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
              >
                <Twitter className="h-4 w-4" />
                <span>Connect X.com</span>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/">
          <Button variant="outline" className="cursor-pointer">
            Back
          </Button>
        </Link>
        <Link href="/onboarding/objectives">
          <Button className="cursor-pointer">
            Continue to Learning Objectives
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
