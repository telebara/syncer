"use client"

import { useState } from "react";
import { getRandomUsername, getDiceBearAvatarSvg } from "../utils";
import styles from "./page.module.css";

const mockVideos = [
  { id: 1, title: "Торрент 1", thumb: "/file.svg" },
  { id: 2, title: "Торрент 2", thumb: "/file.svg" },
  { id: 3, title: "Торрент 3", thumb: "/file.svg" },
  { id: 4, title: "Торрент 4", thumb: "/file.svg" },
];

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username] = useState(() => getRandomUsername());
  const avatarUrl = getDiceBearAvatarSvg(username);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarCircle}>
            <img src={avatarUrl} alt="avatar" width={120} height={120} style={{ width: "100%", height: "100%" }} />
          </div>
          <div className={styles.username}>{username}</div>
        </div>
        <button
          style={{ marginTop: 16, padding: "12px 32px", borderRadius: 24, background: "#333", color: "#fff", border: "none", fontSize: 18, cursor: "pointer" }}
          onClick={() => setLoggedIn((v) => !v)}
        >
          Войти
        </button>
        <h2 style={{ color: "#fff", marginTop: 32, fontSize: 24, fontWeight: 700 }}>Библиотека</h2>
        {loggedIn ? (
          <div className={styles.libraryGrid}>
            {mockVideos.map((video) => (
              <div key={video.id} className={styles.card}>
                <img src={video.thumb} alt={video.title} width={80} height={80} style={{ borderRadius: 8, marginBottom: 12 }} />
                <div className={styles.cardTitle}>{video.title}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: "#aaa", margin: "32px 0", fontSize: 18 }}>
            Библиотека доступна только зарегистрированным пользователям
          </div>
        )}
        <a
          href={`/room/${generateRoomCode()}`}
          className={styles.createRoomBtn}
        >
          Создать комнату
        </a>
      </main>
    </div>
  );
}

function generateRoomCode() {
  // Generates a code like D5F7-J2L9
  const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${part()}-${part()}`;
}
