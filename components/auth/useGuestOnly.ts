"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { homeFor, useAuth } from "@/lib/auth-context";

export function useGuestOnly() {
  const { status, role } = useAuth();
  const router = useRouter();
  const signedInOnArrival = useRef<boolean | null>(null);

  useEffect(() => {
    if (signedInOnArrival.current === null && status !== "loading") {
      signedInOnArrival.current = status === "authenticated";
    }
    if (signedInOnArrival.current && status === "authenticated" && role) router.replace(homeFor(role));
  }, [status, role, router]);

  return status;
}
