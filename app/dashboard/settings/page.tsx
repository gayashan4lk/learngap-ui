import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "../components/profile-form";
import { AccountSettingsForm } from "../components/account-settings-form";
import { NotificationPreference } from "../components/notification-preference";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <ProfileForm />

        <AccountSettingsForm />

        <NotificationPreference />
      </Tabs>
    </div>
  );
}
