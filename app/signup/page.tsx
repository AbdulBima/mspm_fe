import type { Metadata } from "next";
import { SignupForm } from "./_components/SignupForm";

export const metadata: Metadata = { title: "Create manager account" };

export default function SignupPage() {
  return <SignupForm />;
}
