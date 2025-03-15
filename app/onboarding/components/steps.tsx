"use client"

import { useOnboarding } from "@/app/context/onboarding-context"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Learning Goal" },
  { id: 3, name: "Curriculum" },
  { id: 4, name: "Confirmation" },
]

export function Steps() {
  const { step } = useOnboarding()

  return (
    <div className="mx-auto w-full max-w-3xl">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((s, stepIdx) => (
            <li key={s.name} className={cn(stepIdx !== steps.length - 1 ? "flex-1" : "", "relative")}>
              {s.id < step ? (
                <div className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="ml-4 text-sm font-medium text-primary">{s.name}</span>
                  </span>
                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute right-0 top-0 hidden h-full w-5 md:block">
                      <svg
                        className="h-full w-full text-gray-300 dark:text-gray-700"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ) : s.id === step ? (
                <div className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-primary">{s.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary">{s.name}</span>
                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute right-0 top-0 hidden h-full w-5 md:block">
                      <svg
                        className="h-full w-full text-gray-300 dark:text-gray-700"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">{s.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">{s.name}</span>
                  </span>
                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute right-0 top-0 hidden h-full w-5 md:block">
                      <svg
                        className="h-full w-full text-gray-300 dark:text-gray-700"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

