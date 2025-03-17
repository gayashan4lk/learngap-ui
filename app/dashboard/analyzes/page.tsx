import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationPreference } from "../components/notification-preference";
import { AccountSettingsForm } from "../components/account-settings-form";
import { ProfileForm } from "../components/profile-form";

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

        <ProfileForm />

        <AccountSettingsForm />

        <NotificationPreference />
      </Tabs>
    </div>
  );
}
