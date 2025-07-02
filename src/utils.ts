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

export const TAGS = {
  'К просмотру': { color: '#3b82f6', bg: '#1e293b' },
  'Просмотрено': { color: '#22c55e', bg: '#14532d' },
  'В процессе': { color: '#f59e42', bg: '#78350f' },
  'Отложено': { color: '#f43f5e', bg: '#881337' },
};

export type TagType = keyof typeof TAGS;

export type UserVideoDTO = {
  id: number;
  title: string;
  thumb: string;
  description: string;
  rating: number;
  ratingCount: number;
  tags: TagType[];
};

export const getMockVideos = (): UserVideoDTO[] => {
  return [
    {
      id: 1,
      title: "Торрент 1",
      thumb: "/file.svg",
      description: "Захватывающий приключенческий фильм.",
      rating: 8.5,
      ratingCount: 123,
      tags: ["К просмотру"],
    },
    {
      id: 2,
      title: "Торрент 2",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg-cdn.tinkoffjournal.ru%2Fbest-movies-2023__fb.ruoqx4ylzc6l..png&f=1&nofb=1&ipt=67076eed2a37e3cd5f543da37c4f1e0607ae6e05f1f631aba1021471e3bda42d",
      description: "Драма о жизни и выборе.",
      rating: 7.2,
      ratingCount: 87,
      tags: ["Просмотрено"],
    },
    {
      id: 3,
      title: "Торрент 3",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.hdrezka.ac%2Fi%2F2019%2F10%2F14%2Fd25de11a92173xg72o53f.jpg&f=1&nofb=1&ipt=0390e0f9843c2972857e51807ee6d81851355e9a76b94e1ffce4f167bf621e68",
      description: "Комедия для всей семьи.",
      rating: 6.9,
      ratingCount: 45,
      tags: ["В процессе"],
    },
    {
      id: 4,
      title: "Торрент 4",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen-images-s.kinorium.com%2Fmovie%2F1080%2F752543.jpg%3F1673617573&f=1&nofb=1&ipt=2e75dcb7c0bd1f02bb2bf19625271c128c916ac5254eadbe819bfb64fbc04c40",
      description: "Фантастика с элементами триллера.",
      rating: 9.1,
      ratingCount: 201,
      tags: ["Отложено"],
    },
    {
      id: 5,
      title: "Ахуеть какое длинное название этого торрент файла аоаооаоао",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmetarankings.ru%2Fimages%2Fuploads%2F2024%2F01%2Fistrebitel-cover-art.jpg&f=1&nofb=1&ipt=35ed359383d7a820e9eddf403cafef7843c6f955e1f00f7480213ca9d141650c",
      description: "Мультфильм для детей и взрослых.",
      rating: 8.0,
      ratingCount: 99,
      tags: ["К просмотру", "В процессе"],
    },
  ];
};

export const generateRoomCode = (): string => {
  const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${part()}-${part()}`;
};

export const truncateLongString = (str: string, max: number) => {
  return str.length > max ? str.slice(0, max - 1) + "..." : str;
}
