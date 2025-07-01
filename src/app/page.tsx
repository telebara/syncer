"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { getRandomUsername, getMockVideos, generateRoomCode } from "../utils";
import Avatar from "./components/Avatar";
import Library from "./components/Library";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username] = useState(() => getRandomUsername());
  const mockVideos = getMockVideos();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Avatar username={username} size={120} />
        <button
          style={{ marginTop: 16, padding: "12px 32px", borderRadius: 24, background: "#333", color: "#fff", border: "none", fontSize: 18, cursor: "pointer" }}
          onClick={() => setLoggedIn((v) => !v)}
        >
          Войти
        </button>
        <Library loggedIn={loggedIn} videos={mockVideos} />
        <a
          href={`/room/${generateRoomCode()}`}
          className={styles.createRoomBtn}
        >
          Создать комнату
        </a>
      </main>
    </div>
  );
};

export default Home;
