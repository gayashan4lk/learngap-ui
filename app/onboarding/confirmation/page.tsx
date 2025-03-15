import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, RefreshCw } from "lucide-react";

import { confirmationPageMockData as curriculum } from "@/mock_data/confirmation_page_mock_data";

export default function ConfirmationPage() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold">Your Curriculum is Ready!</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            We've created a personalized learning path based on your goals and
            background.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{curriculum.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{curriculum.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {curriculum.modules.length} modules • Estimated completion:{" "}
                {curriculum.modules.reduce((total, module) => {
                  const duration = module.duration.split(" ")[0];
                  return total + Number.parseInt(duration);
                }, 0)}{" "}
                weeks
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Not satisfied with this curriculum? You can try again with a
            different learning goal.
          </p>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 justify-between">
            <Link href="/onboarding/objectives">
              <Button variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </Link>

            <Link href="/onboarding/confirmation">
              <Button className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm and Proceed
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
