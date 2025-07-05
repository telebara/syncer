import { TagDTO } from './tags';

export type CreateCardRequestDTO = {
  name: string;
  description?: string;
  image_url?: string;
  magnet_link: string;
  tag_ids?: number[];
}

export type UpdateCardRequestDTO = {
  name?: string;
  description?: string;
  image_url?: string;
  rating?: number;
  magnet_link?: string
  tag_ids?: number[];
}

export type CardDTO = {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  rating?: number;
  magnet_link: string;
  created_at: string;
  tags: TagDTO[];
}

export type CardsListResponseDTO = {
  cards: CardDTO[];
}

// Для совместимости с существующим кодом
export type UserVideoDTO = {
  id: number;
  title: string;
  thumb: string;
  description: string;
  rating: number;
  ratingCount: number;
  tag: string;
}
