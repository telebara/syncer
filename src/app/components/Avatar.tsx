import React, { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";

interface AvatarProps {
  username: string;
  size?: number;
}

const Avatar = ({ username, size = 120 }: AvatarProps) => {
  const avatarDataUri = useMemo(() => {
    return createAvatar(identicon, { seed: username }).toDataUri();
  }, [username]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", background: "#222", boxShadow: "0 0 0 4px #111" }}>
        <img src={avatarDataUri} alt="avatar" width={size} height={size} style={{ width: "100%", height: "100%" }} />
      </div>
      <div style={{ color: "#fff", fontWeight: 600, fontSize: 22, marginTop: 8 }}>{username}</div>
    </div>
  );
};

export default Avatar;
