import { HttpClient } from './http-client';
import {
  CreateCardRequestDTO,
  UpdateCardRequestDTO,
  CardDTO,
  CardsListResponseDTO,
  UserVideoDTO
} from '../types/cards';

export interface CardsService {
  getCards(): Promise<CardDTO[]>;
  getCard(id: number): Promise<CardDTO>;
  createCard(data: CreateCardRequestDTO): Promise<CardDTO>;
  updateCard(id: number, data: UpdateCardRequestDTO): Promise<CardDTO>;
  deleteCard(id: number): Promise<boolean>;
  // Метод для конвертации CardDTO в UserVideoDTO для совместимости
  convertToUserVideoDTO(card: CardDTO): UserVideoDTO;
}

export class CardsServiceImpl implements CardsService {
  constructor(private httpClient: HttpClient) {}

  async getCards(): Promise<CardDTO[]> {
    const response = await this.httpClient.get<CardsListResponseDTO>('/api/cards');
    return response.data.cards;
  }

  async getCard(id: number): Promise<CardDTO> {
    const response = await this.httpClient.get<CardDTO>(`/api/cards/${id}`);
    return response.data;
  }

  async createCard(data: CreateCardRequestDTO): Promise<CardDTO> {
    const response = await this.httpClient.post<CardDTO>('/api/cards', data);
    return response.data;
  }

  async updateCard(id: number, data: UpdateCardRequestDTO): Promise<CardDTO> {
    const response = await this.httpClient.put<CardDTO>(`/api/cards/${id}`, data);
    return response.data;
  }

  async deleteCard(id: number): Promise<boolean> {
    await this.httpClient.delete(`/api/cards/${id}`);
    return true;
  }

  convertToUserVideoDTO(card: CardDTO): UserVideoDTO {
    return {
      id: card.id,
      title: card.name,
      thumb: card.image_url || '/file.svg',
      description: card.description || 'Описание отсутствует',
      rating: card.rating || 0,
      ratingCount: 0, // Это поле не хранится в базе, поэтому ставим 0
      tag: card.tags.length > 0 ? card.tags[0].name : 'К просмотру',
    };
  }
}
