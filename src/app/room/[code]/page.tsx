"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import { getRandomUsername, getDiceBearAvatarSvg, formatRoomCode } from "../../../utils";

export default function RoomPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  const [username] = useState(() => getRandomUsername());
  const avatarUrl = getDiceBearAvatarSvg(username);
  const roomCode = formatRoomCode(params.code);

  return (
    <div>
      <nav className={styles.navbar}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Назад
        </button>
        <div className={styles.roomCode}>{roomCode}</div>
        <div className={styles.avatarCircle}>
          <img src={avatarUrl} alt="avatar" width={48} height={48} style={{ width: "100%", height: "100%" }} />
        </div>
      </nav>
      {/* Room content will go here */}
    </div>
  );
} 