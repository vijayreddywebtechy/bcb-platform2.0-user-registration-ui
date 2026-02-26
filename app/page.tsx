import { Suspense } from "react";
import AuthWelcome from "@/components/auth/AuthWelcome";

export default function Home() {
  return (
    <Suspense>
      <AuthWelcome />
    </Suspense>
  );
}
