"use client"

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatRoomCode } from "../../../utils/room";
import { Avatar, Navbar, Chat } from "../../components";
import styles from "../page.module.css";

// Моковые пользователи для списка справа
const mockUsers = [
  { id: 1, name: "Смешной Кролик", avatar: undefined },
  { id: 2, name: "Зелёный Ёж", avatar: undefined },
  { id: 3, name: "Пушистый Кот", avatar: undefined },
  { id: 4, name: "Весёлый Лис", avatar: undefined },
  { id: 5, name: "Грозный Тигр", avatar: undefined },
];

const RoomPage = ({ params }: { params: Promise<{ code: string }> }) => {
  const { code } = use(params) as { code: string };
  const router = useRouter();
  const roomCode = formatRoomCode(code);

  // WebSocket соединение (заглушка)
  useEffect(() => {
    // const ws = new WebSocket("wss://example.com/room/" + code);
    // return () => ws.close();
  }, [code]);

  // Чат
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { user: "Вы", text: input }]);
    setInput("");
    // Здесь отправка через WebSocket
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Назад
        </button>
        <div className={styles.roomCode}>{roomCode}</div>
        <Avatar size={48} showUsername={false} />
      </Navbar>
      <div className={styles.roomMain}>
        {/* Левая часть: видео плеер */}
        <div style={{ flex: 1, background: "#181818", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "90%", height: 400, background: "#222", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: 22 }}>
              Видео плеер (заглушка)
            </div>
          </div>
        </div>
        {/* Правая часть: чат */}
        <Chat
          users={mockUsers}
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default RoomPage;
