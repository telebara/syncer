# TODO - Syncer MVP

Основной список задач по проекту, разделенный на backend и frontend части.

---

## 🔧 Backend (FastAPI + PostgreSQL)

### ✅ Завершено
- [x] Система аутентификации (JWT токены)
- [x] Модели пользователей и тегов
- [x] API для работы с тегами (CRUD)
- [x] Базовая структура базы данных
- [x] **API для карточек фильмов**
  - [x] Модель `Card` с полями: title, description, image_url, magnet_link
  - [x] CRUD операции для карточек
  - [x] Связь карточек с пользователями (user_id)
  - [x] Связь карточек с тегами через `CardTag`
  - [x] Исправлена логика обновления тегов (удаление старых связей, корректная работа с цветом)

### 🚧 В разработке
- [ ] **API для комнат просмотра**
  - [ ] Модель `Room` с полями: code, owner_id, card_id, status
  - [ ] Генерация уникальных кодов комнат
  - [ ] Управление участниками комнаты
  - [ ] WebSocket для синхронизации состояния

### 📋 Планируется
- [ ] Система комментариев
- [ ] Рейтинги фильмов
- [ ] WebSocket для real-time обновлений

---

## 🎨 Frontend (Next.js + React)

### ✅ Завершено
- [x] Главная страница с библиотекой
- [x] Система аутентификации (UI)
- [x] Базовые компоненты (Navbar, Library, LibraryItem, Sidebar)
- [x] Сайдбар с аватаркой, списком тегов и добавлением тегов
- [x] Получение и отображение реальных карточек с бэкенда
- [x] Поиск по названию карточек
- [x] Отображение тегов карточки с цветом из API
- [x] Добавление тегов к карточке через попап
- [x] Удаление и создание карточек
- [x] Единый стиль для просмотра/создания карточки
- [x] **WebTorrent видеоплеер**
  - [x] Поддержка форматов: MP4, WebM, MKV, AVI, MOV
  - [x] Отображение прогресса загрузки и скорости
  - [x] Красивый интерфейс с мета-информацией
  - [x] Скелетон-анимация при загрузке
  - [x] Утилиты для форматирования размеров файлов

### 🚧 В разработке
- [ ] **Страница создания карточки фильма**
  - [x] Форма с полями: название, описание, обложка, magnet-ссылка
  - [ ] Загрузка изображений
  - [ ] Валидация magnet-ссылок
  - [x] Выбор тегов из существующих

- [ ] **Детальная страница карточки**
  - [x] Отображение полной информации о фильме
  - [x] Кнопка "Создать комнату"
  - [x] Удаление карточки (для владельца)
  - [ ] Редактирование карточки (для владельца)

- [ ] **Страница комнаты просмотра**
  - [x] Видеоплеер с WebTorrent (базовый функционал)
  - [ ] Оптимизация для больших файлов (>200мб)
  - [ ] Система создания и присоединения к комнатам по коду
  - [ ] Список участников
  - [ ] Чат для участников
  - [ ] Синхронизация воспроизведения между пользователями
  - [ ] Управление воспроизведением (для владельца)

### 📋 Планируется
- [ ] Система комментариев
- [ ] Рейтинги и оценки
- [ ] Улучшенный UI/UX

---

## ⚠️ Текущие ограничения
- **Большие файлы**: WebTorrent в браузере имеет ограничения с файлами >2GB
- **Отсутствие комнат**: Нет системы создания и шаринга комнат
- **Нет синхронизации**: Каждый пользователь смотрит независимо

---

## 🎯 MVP Приоритеты

### Высокий приоритет (сделать в первую очередь)
1. **Backend**: API для комнат просмотра
2. **Frontend**: Система создания и присоединения к комнатам по коду
3. **Frontend**: Синхронизация воспроизведения между пользователями
4. **Frontend**: Оптимизация WebTorrent для больших файлов
5. **Frontend**: Загрузка изображений для карточки
6. **Frontend**: Валидация magnet-ссылок

### Средний приоритет
1. Чат в комнатах
2. Система комментариев
3. Улучшение UI/UX

### Низкий приоритет
1. Рейтинги
2. Расширенные настройки
3. Оптимизация производительности
