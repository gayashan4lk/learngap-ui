"use client"

import type React from "react"

import { useRef } from "react"
import { useOnboarding } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, X } from "lucide-react"

export function LearningGoalForm() {
  const { learningGoal, setLearningGoal, setStep } = useOnboarding()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLearningGoal({
      ...learningGoal,
      description: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setLearningGoal({
        ...learningGoal,
        documents: [...learningGoal.documents, ...newFiles],
      })
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...learningGoal.documents]
    newFiles.splice(index, 1)
    setLearningGoal({
      ...learningGoal,
      documents: newFiles,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, we would send the data to the server here
    // For now, we'll just simulate generating a curriculum
    generateCurriculum()
  }

  const generateCurriculum = () => {
    // Simulate API call delay
    setTimeout(() => {
      setStep(3)
    }, 1000)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Define Your Learning Goal</h2>

        <div className="space-y-2">
          <Label htmlFor="description">Describe your learning goal in detail</Label>
          <Textarea
            id="description"
            value={learningGoal.description}
            onChange={handleDescriptionChange}
            placeholder="I want to become a full-stack developer with expertise in React and Node.js..."
            className="min-h-[150px]"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Supporting Documents</h2>

        <div className="space-y-2">
          <Label htmlFor="documents">Upload job descriptions, project requirements, or other relevant documents</Label>
          <div
            className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-6 py-10 dark:border-gray-700"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-1 text-center">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>
        </div>

        {learningGoal.documents.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Documents</Label>
            <div className="space-y-2">
              {learningGoal.documents.map((file, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                      <FileUp className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit">Generate Curriculum</Button>
      </div>
    </form>
  )
}

