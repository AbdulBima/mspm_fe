import type { Metadata } from "next";
import { Suspense } from "react";
import { ActivateForm } from "./_components/ActivateForm";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = { title: "Activate your account" };

export default function ActivatePage() {
  return (
    <Suspense fallback={<SplashScreen label="Loading" />}>
      <ActivateForm />
    </Suspense>
  );
}
