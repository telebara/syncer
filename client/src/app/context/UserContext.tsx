"use client"

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { useAuth } from "./AuthContext";

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
    return createAvatar(identicon, { seed: avatarSeed }).toDataUri();
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
