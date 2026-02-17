import AppLayout from "@/components/layout/AppLayout";
import BusinessDetails from "@/components/business-profile/BusinessDetails";

export default function BusinessProfilePage() {
  return (
    <AppLayout backgroundColor="linear-gradient(180deg, #0033AA 0%, #00164E 100%)">
      <BusinessDetails />
    </AppLayout>
  );
}
