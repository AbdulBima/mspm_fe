import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { SprintProvider } from "@/lib/sprint-context";

export const metadata: Metadata = {
  title: "Bima Ops",
  description: "Sprint coordination and team tracking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased questrial-regular">
        <AuthProvider>
          <SprintProvider>{children}</SprintProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
