"use client"

import type React from "react"

import { useState } from "react"
import { useOnboarding } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserInfoForm() {
  const { userInfo, setUserInfo, setStep } = useOnboarding()
  const [skill, setSkill] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...userInfo.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setUserInfo({ ...userInfo, education: newEducation })
  }

  const handleProfessionalChange = (index: number, field: string, value: string) => {
    const newProfessional = [...userInfo.professional]
    newProfessional[index] = { ...newProfessional[index], [field]: value }
    setUserInfo({ ...userInfo, professional: newProfessional })
  }

  const handleSocialMediaChange = (field: string, value: string) => {
    setUserInfo({
      ...userInfo,
      socialMedia: { ...userInfo.socialMedia, [field]: value },
    })
  }

  const addEducation = () => {
    setUserInfo({
      ...userInfo,
      education: [...userInfo.education, { degree: "", institution: "", year: "" }],
    })
  }

  const removeEducation = (index: number) => {
    const newEducation = [...userInfo.education]
    newEducation.splice(index, 1)
    setUserInfo({ ...userInfo, education: newEducation })
  }

  const addProfessional = () => {
    setUserInfo({
      ...userInfo,
      professional: [...userInfo.professional, { title: "", company: "", years: "" }],
    })
  }

  const removeProfessional = (index: number) => {
    const newProfessional = [...userInfo.professional]
    newProfessional.splice(index, 1)
    setUserInfo({ ...userInfo, professional: newProfessional })
  }

  const addSkill = () => {
    if (skill.trim() && !userInfo.skills.includes(skill.trim())) {
      setUserInfo({
        ...userInfo,
        skills: [...userInfo.skills, skill.trim()],
      })
      setSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setUserInfo({
      ...userInfo,
      skills: userInfo.skills.filter((s) => s !== skillToRemove),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={userInfo.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={userInfo.email} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Education</h2>
          <Button type="button" variant="outline" size="sm" onClick={addEducation}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>

        {userInfo.education.map((edu, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree/Certificate</Label>
                  <Input
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`year-${index}`}>Year</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id={`year-${index}`}
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      required
                    />
                    {userInfo.education.length > 1 && (
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeEducation(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Professional Experience</h2>
          <Button type="button" variant="outline" size="sm" onClick={addProfessional}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>

        {userInfo.professional.map((prof, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Job Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={prof.title}
                    onChange={(e) => handleProfessionalChange(index, "title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={prof.company}
                    onChange={(e) => handleProfessionalChange(index, "company", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`years-${index}`}>Years of Experience</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id={`years-${index}`}
                      value={prof.years}
                      onChange={(e) => handleProfessionalChange(index, "years", e.target.value)}
                      required
                    />
                    {userInfo.professional.length > 1 && (
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeProfessional(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>

        <div className="space-y-2">
          <Label htmlFor="skills">Add Skills</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="skills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g., JavaScript, Project Management, Communication"
            />
            <Button type="button" onClick={addSkill}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {userInfo.skills.map((s) => (
            <Badge key={s} variant="secondary" className="flex items-center gap-1">
              {s}
              <button
                type="button"
                onClick={() => removeSkill(s)}
                className="ml-1 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Social Media</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={userInfo.socialMedia.linkedin || ""}
              onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={userInfo.socialMedia.github || ""}
              onChange={(e) => handleSocialMediaChange("github", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next: Learning Goal</Button>
      </div>
    </form>
  )
}

