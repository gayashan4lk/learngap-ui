"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserInfo = {
  name: string
  email: string
  education: {
    degree: string
    institution: string
    year: string
  }[]
  professional: {
    title: string
    company: string
    years: string
  }[]
  skills: string[]
  socialMedia: {
    linkedin?: string
    github?: string
  }
}

export type LearningGoal = {
  description: string
  documents: File[]
}

export type CurriculumModule = {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  duration: string
  order: number
  steps: {
    id: string
    title: string
    description: string
    checkpoints: {
      id: string
      title: string
      description: string
      resources: {
        id: string
        title: string
        type: "Course" | "Video" | "Article"
        url: string
        completed: boolean
      }[]
    }[]
  }[]
}

export type Curriculum = {
  id: string
  title: string
  description: string
  createdAt: Date
  modules: CurriculumModule[]
  progress: number
}

type OnboardingContextType = {
  step: number
  setStep: (step: number) => void
  userInfo: UserInfo
  setUserInfo: (info: UserInfo) => void
  learningGoal: LearningGoal
  setLearningGoal: (goal: LearningGoal) => void
  curriculum: Curriculum | null
  setCurriculum: (curriculum: Curriculum | null) => void
  curriculums: Curriculum[]
  addCurriculum: (curriculum: Curriculum) => void
}

const defaultUserInfo: UserInfo = {
  name: "",
  email: "",
  education: [{ degree: "", institution: "", year: "" }],
  professional: [{ title: "", company: "", years: "" }],
  skills: [],
  socialMedia: {},
}

const defaultLearningGoal: LearningGoal = {
  description: "",
  documents: [],
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo)
  const [learningGoal, setLearningGoal] = useState<LearningGoal>(defaultLearningGoal)
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])

  const addCurriculum = (newCurriculum: Curriculum) => {
    setCurriculums((prev) => [...prev, newCurriculum])
  }

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        userInfo,
        setUserInfo,
        learningGoal,
        setLearningGoal,
        curriculum,
        setCurriculum,
        curriculums,
        addCurriculum,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}

