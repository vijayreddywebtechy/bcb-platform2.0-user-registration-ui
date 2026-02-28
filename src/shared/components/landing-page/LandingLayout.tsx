import Footer from "@/shared/components/layout/Footer";
import MiniNavbar from "@/shared/components/layout/MiniNavbar";
import Header from "./Header";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <MiniNavbar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
