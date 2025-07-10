"use client"

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { generateAvatarUrl, generateDefaultAvatarUrl } from "../../utils/avatar";

type UserContextType = {
  username: string | undefined;
  avatarDataUri: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const username = user?.username;
  const avatarSeed = user?.email;

  const avatarDataUri = useMemo(() => {
    if (user?.image) {
      return user.image;
    }

    if (avatarSeed) {
      return generateAvatarUrl(avatarSeed);
    }

    return generateDefaultAvatarUrl();
  }, [user?.image, avatarSeed]);

  const value = useMemo(() => ({ username, avatarDataUri }), [username, avatarDataUri]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
