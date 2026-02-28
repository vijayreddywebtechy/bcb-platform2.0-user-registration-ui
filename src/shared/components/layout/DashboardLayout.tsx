import Footer from "./Footer";
import Header from "./Header";
import MiniNavbar from "./MiniNavbar";
import ContactBankerWidget from "@/shared/components/shared/ContactBankerWidget";

type Props = {};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <MiniNavbar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactBankerWidget />
    </div>
  );
}
