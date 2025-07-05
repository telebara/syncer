import React, { useState } from "react";
import { CreateCardRequestDTO } from "../../../types/cards";
import { CardsServiceImpl } from "../../../services/cards-service";
import { httpClient } from "../../../services/http-client";
import styles from "./CreateCardPopup.module.css";

const cardsService = new CardsServiceImpl(httpClient);

interface CreateCardPopupProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateCardPopup = ({ onClose, onSuccess }: CreateCardPopupProps) => {
  const [formData, setFormData] = useState<CreateCardRequestDTO>({
    name: "",
    description: "",
    image_url: "",
    magnet_link: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof CreateCardRequestDTO, value: string | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Название обязательно";
    }

    if (!formData.magnet_link.trim()) {
      newErrors.magnet_link = "Magnet-ссылка обязательна";
    } else if (!formData.magnet_link.startsWith("magnet:?")) {
      newErrors.magnet_link = "Неверный формат magnet-ссылки";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await cardsService.createCard(formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to create card:", error);
      setErrors({ submit: "Не удалось создать карточку" });
    } finally {
      setLoading(false);
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

        <h3 className={styles.title}>Создать карточку фильма</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.left}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Название *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  placeholder="Введите название фильма"
                  disabled={loading}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>
                  Описание
                </label>
                <textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={styles.textarea}
                  placeholder="Введите описание фильма"
                  rows={3}
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="image_url" className={styles.label}>
                  URL изображения
                </label>
                <input
                  id="image_url"
                  type="url"
                  value={formData.image_url || ""}
                  onChange={(e) => handleInputChange("image_url", e.target.value)}
                  className={styles.input}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="magnet_link" className={styles.label}>
                  Magnet-ссылка *
                </label>
                <input
                  id="magnet_link"
                  type="text"
                  value={formData.magnet_link}
                  onChange={(e) => handleInputChange("magnet_link", e.target.value)}
                  className={`${styles.input} ${errors.magnet_link ? styles.inputError : ""}`}
                  placeholder="magnet:?xt=urn:btih:..."
                  disabled={loading}
                />
                {errors.magnet_link && <span className={styles.errorText}>{errors.magnet_link}</span>}
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.preview}>
                <div className={styles.previewCard}>
                  <img
                    src={formData.image_url || "/file.svg"}
                    alt="Preview"
                    className={styles.previewImage}
                    onError={(e) => {
                      e.currentTarget.src = "/file.svg";
                    }}
                  />
                  <div className={styles.previewInfo}>
                    <div className={styles.previewName}>
                      {formData.name || "Название фильма"}
                    </div>
                    {formData.description && (
                      <div className={styles.previewDescription}>
                        {formData.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className={styles.submitError}>
              {errors.submit}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || !formData.name.trim() || !formData.magnet_link.trim()}
            >
              {loading ? "Создаю..." : "Создать карточку"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardPopup;
