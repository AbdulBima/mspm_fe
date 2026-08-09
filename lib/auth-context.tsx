"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api, clearToken, getToken, setToken } from "./api";
import type { Manager } from "./types";

interface AuthContextValue {
  manager: Manager | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, inviteCode?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [manager, setManager] = useState<Manager | null>(null);
  const [loading, setLoading] = useState(() => Boolean(getToken()));
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    api.auth
      .me()
      .then(setManager)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const { token, manager } = await api.auth.login(email, password);
    setToken(token);
    setManager(manager);
    router.push("/");
  }

  async function signup(name: string, email: string, password: string, inviteCode?: string) {
    const { token, manager } = await api.auth.signup(name, email, password, inviteCode);
    setToken(token);
    setManager(manager);
    router.push("/");
  }

  function logout() {
    clearToken();
    setManager(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ manager, loading, login, signup, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
