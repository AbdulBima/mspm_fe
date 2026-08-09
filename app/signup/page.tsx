import Link from "next/link";
import { DayOneSignature } from "./_components/DayOneSignature";
import { SignupForm } from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9] lg:flex-row">
      <div className="h-48 shrink-0 lg:h-auto lg:w-[42%]">
        <DayOneSignature />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-semibold tracking-tight text-[#0B0C0F]">Create your account</h1>
          <p className="mt-1.5 text-sm text-[#84828C]">Creates the primary login for your team&apos;s workspace.</p>

          <div className="mt-7">
            <SignupForm />
          </div>

          <p className="mt-6 text-sm text-[#84828C]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#1D2B64] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}