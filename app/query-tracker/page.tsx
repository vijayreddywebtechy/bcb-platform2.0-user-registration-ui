import AppLayout from "@/components/layout/AppLayout";
import QueryTrackerPage from "@/components/query-tracker/QueryTrackerPage";

export default function QueryTracker() {
  return (
    <AppLayout backgroundColor="#F2F6FF" showFooter={true}>
      <QueryTrackerPage hasQueries={true} />
    </AppLayout>
  );
}
