// app/context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/lib/api";
import { APP_CONFIG } from "@/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(APP_CONFIG.AUTH.TOKEN_KEY);
      if (token) {
        // Verify token and get user data
        try {
          const userData = await apiService.get('/api/auth/me');
          if (userData.success && userData.user) {
            setUser(userData.user);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem(APP_CONFIG.AUTH.TOKEN_KEY);
          }
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem(APP_CONFIG.AUTH.TOKEN_KEY);
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      // Clear invalid token
      localStorage.removeItem(APP_CONFIG.AUTH.TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.put('/api/auth', { email, password });
      
      // Store token securely
      localStorage.setItem(APP_CONFIG.AUTH.TOKEN_KEY, response.token);
      
      // Update user state
      setUser(response.user);
      
      // Don't redirect here - let the component handle it
      
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
      
      const response = await apiService.post('/api/auth', { name, email, password });
      
      // Store token securely
      localStorage.setItem(APP_CONFIG.AUTH.TOKEN_KEY, response.token);
      
      // Update user state
      setUser(response.user);
      
      // Don't redirect here - let the component handle it
      
      return { success: true, user: response.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear auth data
    localStorage.removeItem(APP_CONFIG.AUTH.TOKEN_KEY);
    setUser(null);
    setError(null);
    
    // Don't redirect here - let the component handle it
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  }), [user, loading, error, login, register, logout, clearError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
