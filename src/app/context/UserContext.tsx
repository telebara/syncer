"use client"

import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { getRandomUsername } from "../../utils";
import { useFirebaseAuth } from "./FirebaseAuthContext";

interface UserContextType {
  username: string;
  avatarDataUri: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUserProfile } = useFirebaseAuth();
  const [localUsername] = useState(() => getRandomUsername());

  useEffect(() => {
    if (user && !user.displayName) {
      updateUserProfile(localUsername);
    }
  }, [user]);

  let username = localUsername;
  let avatarSeed = localUsername;

  if (user) {
    username = user.displayName || user.email || "Пользователь";
    avatarSeed = user.email || user.uid;
  }

  const avatarDataUri = useMemo(() => {
    return createAvatar(identicon, { seed: avatarSeed }).toDataUri();
  }, [avatarSeed]);

  const value = useMemo(() => ({ username, avatarDataUri }), [username, avatarDataUri]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}; 