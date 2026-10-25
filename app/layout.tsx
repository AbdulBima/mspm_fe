import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { SprintProvider } from "@/lib/sprint-context";
import { Toaster } from "@/components/Toaster";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: { default: "Mently Sprint Ops", template: "%s · Mently Sprint Ops" },
  description: "Sprint coordination, daily reports and team tracking for Mently.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f0954",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <AuthProvider>
          <SprintProvider>{children}</SprintProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
