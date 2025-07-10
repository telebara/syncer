'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { TagsService, TagsServiceImpl } from '../../../services/tags-service';
import { httpClient } from '../../../services/http-client';
import { TagDTO, CreateTagRequestDTO } from '../../../types/tags';
import styles from './Sidebar.module.css';

const tagsService: TagsService = new TagsServiceImpl(httpClient);

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { avatarDataUri } = useUser();
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    if (isAddingTag && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingTag]);

  const loadTags = async () => {
    try {
      const userTags = await tagsService.getTags();
      setTags(userTags);
    } catch (error) {
      console.error('Ошибка загрузки тегов:', error);
    }
  };

  const getRandomColor = (): string => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  const handleAddTag = () => {
    setIsAddingTag(true);
    setNewTagName('');
  };

  const handleCancelAdd = () => {
    setIsAddingTag(false);
    setNewTagName('');
  };

  const handleSaveTag = async () => {
    if (!newTagName.trim()) return;

    setIsLoading(true);
    try {
      const newTag: CreateTagRequestDTO = {
        name: newTagName.trim(),
        color: getRandomColor()
      };

      const createdTag = await tagsService.createTag(newTag);
      setTags(prev => [...prev, createdTag]);
      setIsAddingTag(false);
      setNewTagName('');
    } catch (error) {
      console.error('Ошибка создания тега:', error);
      // Можно добавить уведомление об ошибке
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTag();
    } else if (e.key === 'Escape') {
      handleCancelAdd();
    }
  };

  if (!user) return null;

  return (
    <div className={styles.sidebar}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarCircle}>
          <img
            src={avatarDataUri}
            alt={user.username}
            className={styles.avatarImage}
          />
        </div>
        <h3 className={styles.username}>{user.username}</h3>
      </div>

      <div className={styles.tagsSection}>
        <h4 className={styles.tagsTitle}>Теги:</h4>
        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <div key={tag.id} className={styles.tagItem}>
              <div
                className={styles.tagColor}
                style={{ backgroundColor: tag.color }}
              />
              <span className={styles.tagName}>{tag.name}</span>
            </div>
          ))}

          {isAddingTag ? (
            <div className={styles.addTagInput}>
              <div
                className={styles.tagColor}
                style={{ backgroundColor: getRandomColor() }}
              />
              <input
                ref={inputRef}
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Название тега"
                disabled={isLoading}
              />
              <div className={styles.addTagActions}>
                <button
                  className={styles.cancel}
                  onClick={handleCancelAdd}
                  disabled={isLoading}
                >
                  ✕
                </button>
                <button
                  className={styles.save}
                  onClick={handleSaveTag}
                  disabled={isLoading || !newTagName.trim()}
                >
                  ✓
                </button>
              </div>
            </div>
          ) : (
            <button className={styles.addTagButton} onClick={handleAddTag}>
              <div className={styles.addTagIcon}>+</div>
              <span>Добавить тег</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
