import { HttpClient } from './http-client';
import {
  CreateTagRequestDTO,
  UpdateTagRequestDTO,
  TagDTO,
  TagsListResponseDTO
} from '../types/tags';

export interface TagsService {
  getTags(): Promise<TagDTO[]>;
  getTag(id: number): Promise<TagDTO>;
  createTag(data: CreateTagRequestDTO): Promise<TagDTO>;
  updateTag(id: number, data: UpdateTagRequestDTO): Promise<TagDTO>;
  deleteTag(id: number): Promise<boolean>;
}

export class TagsServiceImpl implements TagsService {
  constructor(private httpClient: HttpClient) {}

  async getTags(): Promise<TagDTO[]> {
    const response = await this.httpClient.get<TagsListResponseDTO>('/api/tags');
    return response.data.tags;
  }

  async getTag(id: number): Promise<TagDTO> {
    const response = await this.httpClient.get<TagDTO>(`/api/tags/${id}`);
    return response.data;
  }

  async createTag(data: CreateTagRequestDTO): Promise<TagDTO> {
    const response = await this.httpClient.post<TagDTO>('/api/tags', data);
    return response.data;
  }

  async updateTag(id: number, data: UpdateTagRequestDTO): Promise<TagDTO> {
    const response = await this.httpClient.put<TagDTO>(`/api/tags/${id}`, data);
    return response.data;
  }

  async deleteTag(id: number): Promise<boolean> {
    await this.httpClient.delete(`/api/tags/${id}`);
    return true;
  }
}
