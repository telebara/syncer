export type CreateTagRequestDTO = {
  name: string;
  color: string;
}

export type UpdateTagRequestDTO = {
  name?: string;
  color?: string;
}

export type TagDTO = {
  id: number;
  name: string;
  color: string;
  created_at: string;
}

export type TagsListResponseDTO = {
  tags: TagDTO[];
}

export const TAGS = {
  'К просмотру': { color: '#3b82f6', bg: '#1e293b' },
  'Просмотрено': { color: '#22c55e', bg: '#14532d' },
  'В процессе': { color: '#f59e42', bg: '#78350f' },
  'Отложено': { color: '#f43f5e', bg: '#881337' },
} as const;

export type TagType = keyof typeof TAGS;
