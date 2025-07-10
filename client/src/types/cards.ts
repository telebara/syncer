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
  magnet_link?: string;
  tag_ids?: number[];
}

export type CardDTO = {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  magnet_link: string;
  created_at: string;
  tags: TagDTO[];
}

export type CardsListResponseDTO = {
  cards: CardDTO[];
}
