export type LoginRequestDTO = {
  email: string;
  password: string;
}

export type RegisterRequestDTO = {
  email: string;
  username: string;
  password: string;
  image?: string;
}

export type LoginResponseDTO = {
  access_token: string;
  refresh_token: string;
}

export type VerifyTokenRequestDTO = {
  access_token: string;
}

export type RefreshTokenRequestDTO = {
  refresh_token: string;
}

export type RefreshTokenResponse = {
    access_token: string;
    refresh_token: string;
}

export type UserDTO = {
  id: number;
  email: string;
  username: string;
  image?: string;
  created_at: string;
}
