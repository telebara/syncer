const adjectives: string[] = [
  "Пушистый",
  "Весёлый",
  "Смешной",
  "Быстрый",
  "Могучий",
  "Зелёный",
  "Солнечный",
  "Грозный",
  "Ленивый",
  "Шустрый",
];
const animals: string[] = [
  "Гиппо",
  "Кот",
  "Лис",
  "Медведь",
  "Ёж",
  "Волк",
  "Заяц",
  "Слон",
  "Тигр",
  "Пёс",
  "Кролик",
];

export const getRandomUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${animal}`;
};

export const formatRoomCode = (code: string) => {
  if (!code) return "";
  const up = code.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return up.length > 4 ? `${up.slice(0, 4)}-${up.slice(4, 8)}` : up;
};

export const getMockVideos = (): {
  id: number;
  title: string;
  thumb: string;
}[] => {
  return [
    { id: 1, title: "Торрент 1", thumb: "/file.svg" },
    { id: 2, title: "Торрент 2", thumb: "/file.svg" },
    { id: 3, title: "Торрент 3", thumb: "/file.svg" },
    { id: 4, title: "Торрент 4", thumb: "/file.svg" },
    { id: 5, title: "Торрент 5", thumb: "/file.svg" },
    { id: 6, title: "Торрент 6", thumb: "/file.svg" },
    { id: 7, title: "Торрент 7", thumb: "/file.svg" },
    { id: 8, title: "Торрент 8", thumb: "/file.svg" },
    { id: 9, title: "Торрент 9", thumb: "/file.svg" },
    { id: 10, title: "Торрент 10", thumb: "/file.svg" },
    { id: 11, title: "Торрент 11", thumb: "/file.svg" },
    { id: 12, title: "Торрент 12", thumb: "/file.svg" },
    { id: 13, title: "Торрент 13", thumb: "/file.svg" },
    { id: 14, title: "Торрент 14", thumb: "/file.svg" },
    { id: 15, title: "Торрент 15", thumb: "/file.svg" },
    { id: 16, title: "Торрент 16", thumb: "/file.svg" },
    { id: 17, title: "Торрент 17", thumb: "/file.svg" },
  ];
};

export const generateRoomCode = (): string => {
  const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${part()}-${part()}`;
};
