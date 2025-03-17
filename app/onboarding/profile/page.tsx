"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { useRouter } from "next/navigation";

// Define interface matching the Pydantic model
interface UserPersonaRequest {
  user_name: string;
  email?: string;
  educational_background?: string;
  professional_background?: string;
  skills?: string;
  linkedin?: string;
  github?: string;
  medium?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserPersonaRequest>();

  const submitPersona = useMutation({
    mutationFn: (data: UserPersonaRequest) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/persona-build/task`,
        data
      );
    },
    onSuccess: () => {
      toast.success("Analysing your profile...");
      router.push("/onboarding/objectives");
    },
    onError: (error) => {
      toast.error(`Error analysing profile: ${error.message}`);
    },
  });

  const onSubmit = (data: UserPersonaRequest) => {
    // Map form fields to match the Pydantic model
    const formData: UserPersonaRequest = {
      user_name: data.user_name,
      email: data.email,
      educational_background: data.educational_background,
      professional_background: data.professional_background,
      skills: data.skills,
      linkedin: data.linkedin,
      github: data.github,
      medium: data.medium,
    };

    submitPersona.mutate(formData);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself so we can personalize your learning
            experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user_name">Full Name</Label>
                  <Input
                    id="user_name"
                    {...register("user_name", { required: "Name is required" })}
                    placeholder="John Doe"
                    aria-invalid={errors.user_name ? "true" : "false"}
                  />
                  {errors.user_name && (
                    <p className="text-sm text-red-500">
                      {errors.user_name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="educational_background">
                  Educational Background
                </Label>
                <Textarea
                  id="educational_background"
                  {...register("educational_background")}
                  placeholder="Describe your educational background, degrees, certifications, etc."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professional_background">
                  Professional Experience
                </Label>
                <Textarea
                  id="professional_background"
                  {...register("professional_background")}
                  placeholder="Describe your work experience, roles, and responsibilities"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  {...register("skills")}
                  placeholder="List your technical and soft skills (e.g., JavaScript, Python, Project Management)"
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
                <div className="w-full sm:w-auto">
                  <Label htmlFor="linkedin" className="mb-2 block">
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin"
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="w-full sm:w-auto">
                  <Label htmlFor="github" className="mb-2 block">
                    GitHub URL
                  </Label>
                  <Input
                    id="github"
                    {...register("github")}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="w-full sm:w-auto">
                  <Label htmlFor="medium" className="mb-2 block">
                    Medium URL
                  </Label>
                  <Input
                    id="medium"
                    {...register("medium")}
                    placeholder="https://medium.com/@username"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Link href="/">
                <Button type="button" variant="outline">
                  Back
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitPersona.isPending}
                >
                  {isSubmitting || submitPersona.isPending
                    ? "Loading..."
                    : "Continue to Learning Objectives"}
                </Button>
                {/* <Link href="/onboarding/objectives">
                  <Button type="button" variant="secondary">
                    Continue to Learning Objectives
                  </Button>
                </Link> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
