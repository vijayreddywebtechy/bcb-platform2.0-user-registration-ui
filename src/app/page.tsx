import { Suspense } from "react";
import AuthWelcome from "@/features/auth/components/auth/AuthWelcome";

export default function Home() {
  return (
    <Suspense>
      <AuthWelcome />
    </Suspense>
  );
}
