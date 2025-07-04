import React, { useRef, useEffect } from "react";
import { Avatar } from "../index";
import styles from "./Chat.module.css";

type User = { id: number; name: string; avatar?: string };
type Message = { user: string; text: string };

interface ChatProps {
  users: User[];
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}

const Chat = ({ users, messages, input, setInput, onSend }: ChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatRoot}>
      <div className={styles.users}>
        <div className={styles.usersTitle}>Участники</div>
        {users.map((u) => (
          <div key={u.id} className={styles.userRow}>
            <Avatar size={36} showUsername={false} />
            <span className={styles.userName}>{u.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.chatArea}>
        <div ref={chatRef} className={styles.messages}>
          {messages.length === 0 && <div className={styles.noMessages}>Нет сообщений</div>}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.user === "Вы" ? `${styles.message} ${styles.messageSelf}` : styles.message}
            >
              <b style={{ fontWeight: 600 }}>{msg.user}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.inputRow}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") onSend(); }}
            placeholder="Введите сообщение..."
            className={styles.input}
          />
          <button
            onClick={onSend}
            className={styles.sendBtn}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat; 