export type UserMeResponseDTO = {
  id: number;
  email: string;
  image: string | null;
  username: string;
  created_at: string;
}

export type UserUpdateRequestDTO = {
  username?: string;
  image?: string;
}
