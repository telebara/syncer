import { TAGS, TagType } from '../types/tags';
import { UserVideoDTO } from '../types/cards';

export { TAGS };
export type { TagType };

export const getMockVideos = (): UserVideoDTO[] => {
  return [
    {
      id: 1,
      title: "Торрент 1",
      thumb: "/file.svg",
      description: "Захватывающий приключенческий фильм.",
      rating: 8.5,
      ratingCount: 123,
      tag: "К просмотру",
    },
    {
      id: 2,
      title: "Торрент 2",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg-cdn.tinkoffjournal.ru%2Fbest-movies-2023__fb.ruoqx4ylzc6l..png&f=1&nofb=1&ipt=67076eed2a37e3cd5f543da37c4f1e0607ae6e05f1f631aba1021471e3bda42d",
      description: "Драма о жизни и выборе.",
      rating: 7.2,
      ratingCount: 87,
      tag: "Просмотрено",
    },
    {
      id: 3,
      title: "Торрент 3",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.hdrezka.ac%2Fi%2F2019%2F10%2F14%2Fd25de11a92173xg72o53f.jpg&f=1&nofb=1&ipt=0390e0f9843c2972857e51807ee6d81851355e9a76b94e1ffce4f167bf621e68",
      description: "Комедия для всей семьи.",
      rating: 6.9,
      ratingCount: 45,
      tag: "В процессе",
    },
    {
      id: 4,
      title: "Торрент 4",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen-images-s.kinorium.com%2Fmovie%2F1080%2F752543.jpg%3F1673617573&f=1&nofb=1&ipt=2e75dc7c0bd1f02bb2bf19625271c128c916ac5254eadbe819bfb64fbc04c40",
      description: "Фантастика с элементами триллера.",
      rating: 9.1,
      ratingCount: 201,
      tag: "Отложено",
    },
    {
      id: 5,
      title: "Ахуеть какое длинное название этого торрент файла аоаооаоао",
      thumb: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmetarankings.ru%2Fimages%2Fuploads%2F2024%2F01%2Fistrebitel-cover-art.jpg&f=1&nofb=1&ipt=35ed359383d7a820e9eddf403cafef7843c6f955e1f00f7480213ca9d141650c",
      description: "МультфийвлдцйвлщтйцвтшйцМультфии взрослых.",
      rating: 8.0,
      ratingCount: 99,
      tag: "К просмотру",
    },
  ];
};

export const truncateLongString = (str: string, max: number) => {
  return str.length > max ? str.slice(0, max - 1) + "..." : str;
}
