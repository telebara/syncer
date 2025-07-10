import { HttpClient } from './http-client';
import {
  CreateCardRequestDTO,
  UpdateCardRequestDTO,
  CardDTO,
  CardsListResponseDTO,
} from '../types/cards';

export interface CardsService {
  getCards(): Promise<CardDTO[]>;
  getCard(id: number): Promise<CardDTO>;
  createCard(data: CreateCardRequestDTO): Promise<CardDTO>;
  updateCard(id: number, data: UpdateCardRequestDTO): Promise<CardDTO>;
  deleteCard(id: number): Promise<boolean>;
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
}
