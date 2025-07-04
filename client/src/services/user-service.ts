import { HttpClient } from './http-client';
import { UserMeResponseDTO, UserUpdateRequestDTO } from '../types/user';

export interface UserService {
  getMe(): Promise<UserMeResponseDTO>;
  updateMe(data: UserUpdateRequestDTO): Promise<UserMeResponseDTO>;
}

export class UserServiceImpl implements UserService {
  constructor(private httpClient: HttpClient) {}

  async getMe(): Promise<UserMeResponseDTO> {
    const response = await this.httpClient.get<UserMeResponseDTO>('/api/user/me');
    return response.data;
  }

  async updateMe(data: UserUpdateRequestDTO): Promise<UserMeResponseDTO> {
    const response = await this.httpClient.patch<UserMeResponseDTO>('/api/user/me', data);
    return response.data;
  }
}
