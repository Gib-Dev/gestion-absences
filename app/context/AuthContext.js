// app/context/AuthContext.js
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import apiService from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const initializeAuth = useCallback(async () => {
    try {
      // Cookie is sent automatically — just check if we're authenticated
      const userData = await apiService.get("/api/auth/me");
      if (userData.success && userData.user) {
        setUser(userData.user);
      }
    } catch (error) {
      // Not authenticated or token expired — that's fine
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.put("/api/auth", { email, password });

      // Cookie is set by the server automatically
      setUser(response.user);

      return { success: true, user: response.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.post("/api/auth", {
        name,
        email,
        password,
      });

      // Cookie is set by the server automatically
      setUser(response.user);

      return { success: true, user: response.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiService.post("/api/auth/logout", {});
    } catch (error) {
      // Logout failed server-side, clear locally anyway
    }
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      clearError,
      isAuthenticated: !!user,
    }),
    [user, loading, error, login, register, logout, clearError]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
