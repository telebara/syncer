"use client"

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatRoomCode } from "../../../utils/room";
import { Avatar, Navbar, VideoPlayer, Chat, WebTorrentLoader } from "../../components";
import { RoomCardData } from "../../../types/cards";
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
  const [roomData, setRoomData] = useState<RoomCardData | null>(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem(`room-${code}`);
    if (savedData) {
      try {
        const data: RoomCardData = JSON.parse(savedData);
        setRoomData(data);
        console.log('📦 Данные комнаты загружены:', data);
      } catch (error) {
        console.error('❌ Ошибка парсинга данных комнаты:', error);
      }
    } else {
      console.log('⚠️ Данные комнаты не найдены, возвращаемся назад');
      router.back();
    }
  }, [code]);

  useEffect(() => {
    // const ws = new WebSocket("wss://example.com/room/" + code);
    // return () => ws.close();
  }, [code]);

  const [messages, setMessages] = useState<{ id: string; user: string; text: string; timestamp: Date; isOwn?: boolean }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      user: "Вы",
      text: input,
      timestamp: new Date(),
      isOwn: true
    };
    setMessages((msgs) => [...msgs, newMessage]);
    setInput("");
    // Здесь отправка через WebSocket
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Назад
        </button>
        <div className={styles.roomInfo}>
          <div className={styles.roomCode}>{roomCode}</div>
          {roomData?.cardName && (
            <div className={styles.cardName}>{roomData.cardName}</div>
          )}
        </div>
        <Avatar size={48} showUsername={false} />
      </Navbar>
      <div className={styles.roomMain}>
        {/* Левая часть: видео плеер */}
        <div style={{ flex: 1, background: "#181818", display: "flex", flexDirection: "column" }}>
          {roomData && (
            <WebTorrentLoader>
              <VideoPlayer
                magnetUrl={roomData.magnetLink}
                cardName={roomData.cardName}
              />
            </WebTorrentLoader>
          )}
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
