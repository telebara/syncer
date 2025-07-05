"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthService, AuthServiceImpl } from "../../services/auth-service";
import { UserService, UserServiceImpl } from "../../services/user-service";
import { httpClient } from "../../services/http-client";
import { UserDTO } from "../../types/auth";
import { UserMeResponseDTO } from "../../types/user";

type AuthContextType = {
  user: UserDTO | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, image?: string) => Promise<void>;
  updateUser: (data: { username?: string; image?: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [authService] = useState<AuthService>(() => new AuthServiceImpl(httpClient));
  const [userService] = useState<UserService>(() => new UserServiceImpl(httpClient));

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await userService.getMe();
          const currentUser: UserDTO = {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            image: userData.image || undefined,
            created_at: userData.created_at,
          };
          authService.setCurrentUser(currentUser);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [authService, userService]);

  const login = async (email: string, password: string) => {
    try {
      await authService.login({ email, password });
      // После успешного логина получаем информацию о пользователе
      const userData = await userService.getMe();
      const currentUser: UserDTO = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        image: userData.image || undefined,
        created_at: userData.created_at,
      };
      authService.setCurrentUser(currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, username: string, password: string, image?: string) => {
    try {
      await authService.register({ email, username, password, image });
      const userData = await userService.getMe();
      const currentUser: UserDTO = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        image: userData.image || undefined,
        created_at: userData.created_at,
      };
      authService.setCurrentUser(currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const updateUser = async (data: { username?: string; image?: string }) => {
    try {
      const userData = await userService.updateMe({
        username: data.username,
        image: data.image,
      });
      const currentUser: UserDTO = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        image: userData.image || undefined,
        created_at: userData.created_at,
      };
      authService.setCurrentUser(currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    updateUser,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
