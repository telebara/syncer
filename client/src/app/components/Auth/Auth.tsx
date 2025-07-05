import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

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
      }}>
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
            alert("Пожалуйста, заполните все поля");
            return;
          }
          if (!isRegister && (!email || !password)) {
            alert("Пожалуйста, заполните email и пароль");
            return;
          }
          isRegister
            ? register(email, username, password)
            : login(email, password);
        }}>
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
        onClick={() => setIsRegister((v) => !v)}>
        {isRegister
          ? "Уже есть аккаунт? Войти"
          : "Нет аккаунта? Зарегистрироваться"}
      </button>
    </div>
  );
};

export default AuthPage;
