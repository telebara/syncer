const adjectives: string[] = ["Пушистый", "Весёлый", "Смешной", "Быстрый", "Могучий", "Зелёный", "Солнечный", "Грозный", "Ленивый", "Шустрый"];
const animals: string[] = ["Гиппо", "Кот", "Лис", "Медведь", "Ёж", "Волк", "Заяц", "Слон", "Тигр", "Пёс", "Кролик"];

export const getRandomUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${animal}`;
}


export const getDiceBearAvatarSvg = (username: string) => {
  const seed = encodeURIComponent(username);
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
}


export const formatRoomCode = (code: string) => {
  if (!code) return "";
  const up = code.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return up.length > 4 ? `${up.slice(0, 4)}-${up.slice(4, 8)}` : up;
}