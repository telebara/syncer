import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Avatar, FloatingActionButton, CreateCardPopup } from "..";
import { UserDTO } from "../../../types/auth";
import { UserVideoDTO } from "../../../types/cards";
import { getMockVideos } from "../../../utils/common";
import { Library } from "..";

const HomePage = ({ user }: { user: UserDTO }) => {
  const { logout, updateUser } = useAuth();
  const [newName, setNewName] = useState<string>("");
  const [nameLoading, setNameLoading] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const mockVideos: UserVideoDTO[] = getMockVideos();

  const handleNameChange = async () => {
    if (!newName.trim()) return;
    setNameLoading(true);
    try {
      await updateUser({ username: newName.trim() });
      setNewName("");
    } catch (error) {
      console.error("Failed to update username:", error);
      alert("Не удалось обновить имя пользователя");
    } finally {
      setNameLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    // Здесь можно добавить логику обновления списка карточек
    console.log("Карточка успешно создана");
  };

  return (
    <>
      <Avatar size={120} showUsername={true} />
      <div style={{ color: "#fff", margin: 8, fontSize: 18 }}>
        Ваше имя: <b>{user.username}</b>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}>
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
          disabled={nameLoading || !newName.trim()}>
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
        onClick={logout}>
        Выйти
      </button>
      <Library loggedIn={true} videos={mockVideos} />

      {/* Плавающая кнопка создания карточки */}
      <FloatingActionButton
        onClick={() => setShowCreateModal(true)}
        visible={true}
      />

      {/* Модальное окно создания карточки */}
      {showCreateModal && (
        <CreateCardPopup
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
};

export default HomePage;
