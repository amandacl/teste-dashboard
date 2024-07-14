'use client'

import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean
  login: (email:string,password:string) => Promise<void>
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, password: string) => {
    try {      
      const response = await axios.post('http://requisitions-api-git-dev-desenvolvimento-gimi.vercel.app/api/token/', { email, password })
      
      const token = response.data.token
     
      localStorage.setItem('token', token)

      setIsAuthenticated(true)
    } catch (error) {
      console.error('Erro ao fazer login:', error);   
      throw new Error('Erro ao fazer login')
    }
  };

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
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
