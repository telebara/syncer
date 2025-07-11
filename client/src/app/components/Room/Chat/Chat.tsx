"use client"

import styles from "./Chat.module.css";

interface User {
  id: number;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isOwn?: boolean;
}

interface ChatProps {
  users: User[];
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  onTyping?: () => void;
  isTyping?: boolean;
}

const Chat = ({
  users,
  messages,
  input,
  setInput,
  onSend,
  onTyping,
  isTyping = false
}: ChatProps) => {
  const handleSend = () => {
    if (input.trim()) {
      onSend();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const onlineUsers = users.filter(user => user.isOnline !== false);

  return (
    <div className={styles.container}>
      {/* Список пользователей */}
      <div className={styles.usersList}>
        <div className={styles.usersTitle}>Участники</div>
        {users.map(user => (
          <div key={user.id} className={styles.userItem}>
            <div className={styles.userAvatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span>{user.name}</span>
            {user.isOnline !== false && <div className={styles.userStatus} />}
          </div>
        ))}
      </div>

      {/* Контейнер сообщений */}
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <div className={styles.emptyText}>
              Начните общение!<br />
              Отправьте первое сообщение
            </div>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={styles.message}>
              <div className={styles.messageHeader}>
                <span className={styles.messageAuthor}>
                  {message.isOwn ? 'Вы' : message.user}
                </span>
                <span className={styles.messageTime}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className={styles.messageText}>
                {message.text}
              </div>
            </div>
          ))
        )}

        {/* Индикатор печати */}
        {isTyping && (
          <div className={styles.typingIndicator}>
            Кто-то печатает...
          </div>
        )}
      </div>

      {/* Поле ввода */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.messageInput}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              onTyping?.();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Написать сообщение..."
            rows={1}
          />
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
