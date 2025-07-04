"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useAuth } from "./context/AuthContext";
import { getMockVideos } from "../utils/common";
import { Avatar, Library } from "./components";
import { UserDTO } from "../types/auth";
import { UserVideoDTO } from "../types/cards";

const HomePage = ({ user }: { user: UserDTO }) => {
  const { logout, updateUser } = useAuth();
  const [newName, setNewName] = useState<string>("");
  const [nameLoading, setNameLoading] = useState<boolean>(false);
  const mockVideos: UserVideoDTO[] = getMockVideos();

  const handleNameChange = async () => {
    if (!newName.trim()) return;
    setNameLoading(true);
    try {
      await updateUser({ username: newName.trim() });
      setNewName("");
    } catch (error) {
      console.error('Failed to update username:', error);
      alert('Не удалось обновить имя пользователя');
    } finally {
      setNameLoading(false);
    }
  };

  return (
    <>
      <Avatar size={120} showUsername={true}/>
      <div style={{ color: "#fff", margin: 8, fontSize: 18 }}>
        Ваше имя: <b>{user.username}</b>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <input
          type="text"
          placeholder="Новое имя"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #444",
            minWidth: 0,
          }}
          disabled={nameLoading}
        />
        <button
          style={{
            padding: "8px 18px",
            borderRadius: 16,
            background: "#333",
            color: "#fff",
            border: "none",
            fontSize: 15,
            cursor: "pointer",
          }}
          onClick={handleNameChange}
          disabled={nameLoading || !newName.trim()}
        >
          {nameLoading ? "Сохраняю..." : "Сменить имя"}
        </button>
      </div>
      <button
        style={{
          marginTop: 8,
          padding: "10px 28px",
          borderRadius: 24,
          background: "#333",
          color: "#fff",
          border: "none",
          fontSize: 16,
          cursor: "pointer",
        }}
        onClick={logout}
      >
        Выйти
      </button>
      <Library loggedIn={true} videos={mockVideos} />
    </>
  );
};

const AuthPage = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: "100%",
        maxWidth: 320,
      }}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid #444",
          width: "100%",
        }}
      />
      {isRegister && (
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #444",
            width: "100%",
          }}
        />
      )}
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid #444",
          width: "100%",
        }}
      />
      <button
        style={{
          padding: "10px 28px",
          borderRadius: 24,
          background: "#333",
          color: "#fff",
          border: "none",
          fontSize: 16,
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() => {
          if (isRegister && (!email || !username || !password)) {
            alert('Пожалуйста, заполните все поля');
            return;
          }
          if (!isRegister && (!email || !password)) {
            alert('Пожалуйста, заполните email и пароль');
            return;
          }
          isRegister ? register(email, username, password) : login(email, password);
        }}
      >
        {isRegister ? "Зарегистрироваться" : "Войти"}
      </button>
      <button
        style={{
          background: "none",
          color: "#aaa",
          border: "none",
          cursor: "pointer",
          marginTop: 8,
        }}
        onClick={() => setIsRegister((v) => !v)}
      >
        {isRegister
          ? "Уже есть аккаунт? Войти"
          : "Нет аккаунта? Зарегистрироваться"}
      </button>
    </div>
  );
};

const Page = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>Загрузка...</main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {user ? <HomePage user={user} /> : <AuthPage />}
      </main>
    </div>
  );
};

export default Page;
