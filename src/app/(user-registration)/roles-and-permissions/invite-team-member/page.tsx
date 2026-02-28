import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import InviteTeamMemberPage from "@/shared/components/roles-permissions/invite/InviteTeamMemberPage";

export default function Page() {
  return (
    <DashboardLayout>
      <InviteTeamMemberPage />
    </DashboardLayout>
  );
}
