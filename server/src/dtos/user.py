from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserMeResponseDTO(BaseModel):
    id: int
    email: EmailStr
    image: str | None
    username: str
    created_at: datetime


class UserUpdateRequestDTO(BaseModel):
    username: str | None = None
    image: str | None = None
