import React from "react";
import { useUser } from "../../context/UserContext";

interface AvatarProps {
  username?: string;
  avatarDataUri?: string;
  size?: number;
  showUsername?: boolean;
}

const Avatar = ({
  username,
  avatarDataUri,
  size = 120,
  showUsername = false,
}: AvatarProps) => {
  const user = useUser();
  const finalUsername = username ?? user.username;
  const finalAvatar = avatarDataUri ?? user.avatarDataUri;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          background: "#222",
          boxShadow: "0 0 0 4px #111",
        }}
      >
        <img
          src={finalAvatar}
          alt="avatar"
          width={size}
          height={size}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {showUsername && (
        <div
          style={{ color: "#fff", fontWeight: 600, fontSize: 22, marginTop: 8 }}
        >
          {finalUsername}
        </div>
      )}
    </div>
  );
};

export default Avatar;
