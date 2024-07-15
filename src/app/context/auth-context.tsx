"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const expiry = sessionStorage.getItem("tokenExpiry");
    if (token && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);
      if (now < expiryDate) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("tokenExpiry");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://requisitions-api-git-dev-desenvolvimento-gimi.vercel.app/api/token/",
        { email, password }
      );

      const token = response.data.access;
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", response.data.user_id);
      sessionStorage.setItem("tokenExpiry", expiryDate.toISOString());
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error("Erro ao fazer login");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiry");
    sessionStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

 
  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
