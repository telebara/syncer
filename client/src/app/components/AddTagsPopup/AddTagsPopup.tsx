'use client';

import React, { useState, useEffect } from 'react';
import { CardDTO } from '../../../types/cards';
import { TagDTO } from '../../../types/tags';
import { TagsService, TagsServiceImpl } from '../../../services/tags-service';
import { CardsService, CardsServiceImpl } from '../../../services/cards-service';
import { httpClient } from '../../../services/http-client';
import styles from './AddTagsPopup.module.css';

const tagsService: TagsService = new TagsServiceImpl(httpClient);
const cardsService: CardsService = new CardsServiceImpl(httpClient);

interface AddTagsPopupProps {
  card: CardDTO;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddTagsPopup: React.FC<AddTagsPopupProps> = ({
  card,
  onClose,
  onSuccess
}) => {
  const [availableTags, setAvailableTags] = useState<TagDTO[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadAvailableTags();
  }, []);

  useEffect(() => {
    const currentTagIds = card.tags.map(tag => tag.id);
    setSelectedTags(currentTagIds);
  }, [card.tags]);

  const loadAvailableTags = async () => {
    try {
      setInitialLoading(true);
      const tags = await tagsService.getTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Ошибка загрузки тегов:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await cardsService.updateCard(card.id, {
        tag_ids: selectedTags
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Ошибка сохранения тегов:', error);
      alert('Не удалось сохранить теги. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (initialLoading) {
    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.popup}>
          <div style={{ color: '#fff', textAlign: 'center' }}>
            Загрузка тегов...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>Добавить теги</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{card.name}</h3>
          <p className={styles.cardDescription}>
            {card.description || 'Описание отсутствует'}
          </p>
        </div>

        <div className={styles.currentTags}>
          <h4 className={styles.currentTagsTitle}>Текущие теги:</h4>
          <div className={styles.tagsList}>
            {card.tags.length === 0 ? (
              <span style={{ color: '#888', fontStyle: 'italic' }}>
                Теги не выбраны
              </span>
            ) : (
              card.tags.map(tag => (
                <span key={tag.id} className={styles.tag}>
                  {tag.name}
                </span>
              ))
            )}
          </div>
        </div>

        <div className={styles.availableTags}>
          <h4 className={styles.availableTagsTitle}>Доступные теги:</h4>
          <div className={styles.availableTagsList}>
            {availableTags.map(tag => (
              <button
                key={tag.id}
                className={`${styles.availableTag} ${
                  selectedTags.includes(tag.id) ? styles.selected : ''
                }`}
                onClick={() => handleTagToggle(tag.id)}
                style={{
                  backgroundColor: selectedTags.includes(tag.id) ? tag.color : undefined,
                  borderColor: tag.color,
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};
