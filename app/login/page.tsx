import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./_components/LoginForm";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Suspense fallback={<SplashScreen label="Loading" />}>
      <LoginForm />
    </Suspense>
  );
}
