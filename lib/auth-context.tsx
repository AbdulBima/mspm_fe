"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api, clearToken, getToken, SESSION_EXPIRED_EVENT, setToken } from "./api";
import type { AuthSession, Manager, MemberProfile, Role, SessionUser } from "./types";

type AuthStatus = "loading" | "authenticated" | "guest" | "offline";
type EndReason = "logout" | "expired" | null;

interface AuthContextValue {
  status: AuthStatus;
  loading: boolean;
  endReason: EndReason;
  role: Role | null;
  user: SessionUser | null;
  manager: Manager | null;
  member: MemberProfile | null;
  login: (email: string, password: string, next?: string | null) => Promise<void>;
  signup: (name: string, email: string, password: string, inviteCode?: string) => Promise<void>;
  activate: (email: string, accessCode: string, password: string) => Promise<void>;
  logout: () => void;
  retry: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function homeFor(role: Role) {
  return role === "member" ? "/me" : "/";
}

function safeNext(next: string | null | undefined, role: Role) {
  if (!next || typeof window === "undefined") return homeFor(role);
  let url: URL;
  try {
    url = new URL(next, window.location.origin);
  } catch {
    return homeFor(role);
  }
  if (url.origin !== window.location.origin) return homeFor(role);
  const memberArea = url.pathname === "/me" || url.pathname.startsWith("/me/");
  if (role === "member" && !memberArea) return homeFor(role);
  if (role === "manager" && memberArea) return homeFor(role);
  return `${url.pathname}${url.search}`;
}

export function loginPathFor(pathname: string | null, reason: EndReason) {
  const params = new URLSearchParams();
  if (reason === "expired") params.set("expired", "1");
  if (pathname && pathname !== "/" && pathname !== "/me") params.set("next", pathname);
  const qs = params.toString();
  return `/login${qs ? `?${qs}` : ""}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [endReason, setEndReason] = useState<EndReason>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [attempt, setAttempt] = useState(0);

  const reset = useCallback((reason: EndReason) => {
    clearToken();
    setRole(null);
    setUser(null);
    setEndReason(reason);
    setStatus("guest");
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!getToken()) {
      queueMicrotask(() => !cancelled && setStatus("guest"));
      return () => {
        cancelled = true;
      };
    }
    api.auth
      .me()
      .then(({ role: sessionRole, ...profile }) => {
        if (cancelled) return;
        setRole(sessionRole);
        setUser(profile as SessionUser);
        setStatus("authenticated");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof api.ApiError && err.status === 0) setStatus("offline");
        else reset(null);
      });
    return () => {
      cancelled = true;
    };
  }, [reset, attempt]);

  useEffect(() => {
    const onExpired = () => reset("expired");
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, [reset]);

  const startSession = useCallback(
    (session: AuthSession, next?: string | null) => {
      setToken(session.token);
      setRole(session.role);
      setUser(session.user);
      setEndReason(null);
      setStatus("authenticated");
      router.replace(safeNext(next, session.role));
    },
    [router]
  );

  const login = useCallback(
    async (email: string, password: string, next?: string | null) => {
      startSession(await api.auth.login(email.trim(), password), next);
    },
    [startSession]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string, inviteCode?: string) => {
      startSession(await api.auth.signup(name.trim(), email.trim(), password, inviteCode?.trim() || undefined));
    },
    [startSession]
  );

  const activate = useCallback(
    async (email: string, accessCode: string, password: string) => {
      startSession(await api.auth.activate(email.trim(), accessCode.trim(), password));
    },
    [startSession]
  );

  const logout = useCallback(() => {
    reset("logout");
    router.replace("/login");
  }, [reset, router]);

  const retry = useCallback(() => {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      loading: status === "loading",
      endReason,
      role,
      user,
      manager: role === "manager" ? (user as Manager) : null,
      member: role === "member" ? (user as MemberProfile) : null,
      login,
      signup,
      activate,
      logout,
      retry,
    }),
    [status, endReason, role, user, login, signup, activate, logout, retry]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
