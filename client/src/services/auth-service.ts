import { HttpClient } from './http-client';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  LoginResponseDTO,
  VerifyTokenRequestDTO,
  RefreshTokenRequestDTO,
  UserDTO
} from '../types/auth';
import { storage } from '../utils/storage';

export interface AuthService {
  login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
  register(data: RegisterRequestDTO): Promise<LoginResponseDTO>;
  verifyToken(data: VerifyTokenRequestDTO): Promise<boolean>;
  refreshToken(data: RefreshTokenRequestDTO): Promise<LoginResponseDTO>;
  logout(): void;
  isAuthenticated(): boolean;
  getCurrentUser(): UserDTO | null;
  setCurrentUser(user: UserDTO): void;
}

export class AuthServiceImpl implements AuthService {
  constructor(private httpClient: HttpClient) {}

  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const response = await this.httpClient.post<LoginResponseDTO>('/api/auth/login', data);
    const tokens = response.data;

    storage.setItem('access_token', tokens.access_token);
    storage.setItem('refresh_token', tokens.refresh_token);

    return tokens;
  }

  async register(data: RegisterRequestDTO): Promise<LoginResponseDTO> {
    const response = await this.httpClient.post<LoginResponseDTO>('/api/auth/register', data);
    const tokens = response.data;

    storage.setItem('access_token', tokens.access_token);
    storage.setItem('refresh_token', tokens.refresh_token);

    return tokens;
  }

  async verifyToken(data: VerifyTokenRequestDTO): Promise<boolean> {
    try {
      await this.httpClient.post('/api/auth/verify', data);
      return true;
    } catch {
      return false;
    }
  }

  async refreshToken(data: RefreshTokenRequestDTO): Promise<LoginResponseDTO> {
    const response = await this.httpClient.post<LoginResponseDTO>('/api/auth/refresh', data);
    const tokens = response.data;

    storage.setItem('access_token', tokens.access_token);
    storage.setItem('refresh_token', tokens.refresh_token);

    return tokens;
  }

  logout(): void {
    storage.removeItem('access_token');
    storage.removeItem('refresh_token');
    storage.removeItem('current_user');
  }

  isAuthenticated(): boolean {
    return !!storage.getItem('access_token');
  }

  getCurrentUser(): UserDTO | null {
    const userStr = storage.getItem('current_user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  setCurrentUser(user: UserDTO): void {
    storage.setItem('current_user', JSON.stringify(user));
  }
}
