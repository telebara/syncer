from pydantic import BaseModel, EmailStr, SecretStr


class LoginRequestDTO(BaseModel):
    email: EmailStr
    password: SecretStr


class LoginResponseDTO(BaseModel):
    access_token: str
    refresh_token: str


class RegisterRequestDTO(BaseModel):
    email: EmailStr
    username: str
    image: str | None = None
    password: SecretStr


class VerifyTokenRequestDTO(BaseModel):
    access_token: str


class VerifyTokenResponseDTO(BaseModel):
    valid: bool
    user_id: int | None = None
    status: str


class RefreshTokenRequestDTO(BaseModel):
    refresh_token: str
