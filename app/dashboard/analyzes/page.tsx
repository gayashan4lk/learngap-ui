import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DigitalPersona } from "./components/digital-persona";
import { LearningRequirement } from "./components/learning-requirement";
import { GapAnalysis } from "./components/gap-analysis";
import { PersonalizedCurriculum } from "./components/personalized-curriculum";

export default function AnalyzesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Analyzes</h1>

      <Tabs defaultValue="digital-persona">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="digital-persona">Digital Persona</TabsTrigger>
          <TabsTrigger value="learning-requirement">
            Learning Requirement
          </TabsTrigger>
          <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
          <TabsTrigger value="personalized-curriculum">
            Personalized Curriculum
          </TabsTrigger>
        </TabsList>

        <DigitalPersona />

        <LearningRequirement />

        <GapAnalysis />

        <PersonalizedCurriculum />
      </Tabs>
    </div>
  );
}
