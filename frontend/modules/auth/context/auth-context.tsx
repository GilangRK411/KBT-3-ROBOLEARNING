'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { AuthResponse, User } from "@/modules/auth/auth";
import { login as apiLogin, logout as apiLogout, me as apiMe, register as apiRegister } from "@/modules/auth/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (payload: { identifier: string; password: string }) => Promise<void>;
  register: (payload: {
    name: string;
    username: string;
    birthdate: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const bootstrap = async () => {
      try {
        const data = await apiMe();
        if (mounted) setUser(data.user);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (payload: { identifier: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data: AuthResponse = await apiLogin(payload);
      setUser(data.user);
    } catch (err: any) {
      setError(err?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: {
    name: string;
    username: string;
    birthdate: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data: AuthResponse = await apiRegister(payload);
      setUser(data.user);
    } catch (err: any) {
      setError(err?.message || "Register failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const data = await apiMe();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({ user, loading, error, login, register, logout, refreshProfile }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
