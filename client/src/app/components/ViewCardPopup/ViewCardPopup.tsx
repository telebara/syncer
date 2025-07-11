import React, { useState } from "react";
import { generateRoomCode } from "../../../utils/room";
import { CardDTO } from "../../../types/cards";
import { useRouter } from "next/navigation";
import { CardsServiceImpl } from "../../../services/cards-service";
import { httpClient } from "../../../services/http-client";
import styles from "./ViewCardPopup.module.css";

const cardsService = new CardsServiceImpl(httpClient);

interface ViewCardPopupProps {
  card: CardDTO;
  onClose: () => void;
  onDelete?: () => void;
}

const ViewCardPopup = ({ card, onClose, onDelete }: ViewCardPopupProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleCreateRoom = () => {
    const roomCode = generateRoomCode();

    const roomData = {
      cardName: card.name,
      magnetLink: card.magnet_link,
      cardImageUrl: card.image_url
    };

    sessionStorage.setItem(`room-${roomCode}`, JSON.stringify(roomData));
    router.push(`/room/${roomCode}`);
  };

  const handleDelete = async () => {
    if (!confirm("Вы уверены, что хотите удалить эту карточку?")) {
      return;
    }

    setDeleting(true);
    try {
      await cardsService.deleteCard(card.id);
      onDelete?.();
      onClose();
    } catch (error) {
      console.error("Failed to delete card:", error);
      alert("Не удалось удалить карточку");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Закрыть"
        >
          ×
        </button>

        <h3 className={styles.title}>Просмотр карточки</h3>

        <div className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.left}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Название</label>
                <input
                  type="text"
                  value={card.name}
                  className={styles.input}
                  readOnly
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Описание</label>
                <textarea
                  value={card.description || ""}
                  className={styles.textarea}
                  rows={3}
                  readOnly
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>URL изображения</label>
                <input
                  type="url"
                  value={card.image_url || ""}
                  className={styles.input}
                  readOnly
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Magnet-ссылка</label>
                <input
                  type="text"
                  value={card.magnet_link}
                  className={styles.input}
                  readOnly
                />
              </div>

              {card.tags.length > 0 && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Теги</label>
                  <div className={styles.tagsContainer}>
                    {card.tags.map((tag) => (
                      <span key={tag.id} className={styles.tag}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.right}>
              <div className={styles.preview}>
                <div className={styles.previewTitle}>Предпросмотр</div>
                <div className={styles.previewCard}>
                  <img
                    src={card.image_url || "/file.svg"}
                    alt="Preview"
                    className={styles.previewImage}
                    onError={(e) => {
                      e.currentTarget.src = "/file.svg";
                    }}
                  />
                  <div className={styles.previewInfo}>
                    <div className={styles.previewName}>
                      {card.name}
                    </div>
                    {card.description && (
                      <div className={styles.previewDescription}>
                        {card.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteBtn}
              disabled={deleting}
            >
              {deleting ? "Удаляю..." : "Удалить карточку"}
            </button>
            <button
              type="button"
              onClick={handleCreateRoom}
              className={styles.createRoomBtn}
            >
              Создать комнату
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCardPopup;
