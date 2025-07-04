from datetime import datetime, timedelta
from enum import IntEnum, auto
from typing import ClassVar, NamedTuple

from jose import jwt, JWTError
from jose.exceptions import ExpiredSignatureError as JWTExpiredSignatureError
from passlib.context import CryptContext

from config import settings


class DecodeTokenStatusEnum(IntEnum):
    VALID = auto()
    INVALID = auto()
    EXPIRED = auto()


class AuthTokensDTO(NamedTuple):
    access_token: str
    refresh_token: str


class DecodedTokenDTO(NamedTuple):
    user_id: int | None
    status: DecodeTokenStatusEnum


class AuthDAO:
    _pwd_context: ClassVar[CryptContext] = CryptContext(
        schemes=['argon2'],
        argon2__time_cost=settings.auth.ARGON2_TIME_COST,
        argon2__memory_cost=settings.auth.ARGON2_MEMORY_COST,
        argon2__parallelism=settings.auth.ARGON2_PARALLELISM,
        argon2__hash_len=settings.auth.ARGON2_HASH_LENGTH,
        argon2__salt_len=settings.auth.ARGON2_SALT_LENGTH,
        deprecated='auto',
    )

    async def generate_hashed_password(self, password: str) -> str:
        return self._pwd_context.hash(password)

    async def verify_password(
        self,
        plain_password: str,
        hashed_password: str,
    ) -> bool:
        return self._pwd_context.verify(plain_password, hashed_password)

    async def generate_tokens(self, user_id: int) -> AuthTokensDTO:
        now = datetime.now()
        return AuthTokensDTO(
            access_token=await self._generate_access_token(user_id, now),
            refresh_token=await self._generate_refresh_token(user_id, now),
        )

    async def _generate_access_token(self, user_id: int, now: datetime) -> str:
        payload = {
            'iss': settings.app.TITLE,
            'sub': str(user_id),
            'iat': now,
            'exp': now + timedelta(seconds=settings.auth.JWT_ACCESS_TOKEN_EXPIRES_IN),
        }

        return jwt.encode(payload, settings.auth.SECRET_KEY.get_secret_value(), algorithm=settings.auth.ALGORITHM)

    async def _generate_refresh_token(self, user_id: int, now: datetime) -> str:
        payload = {
            'iss': settings.app.TITLE,
            'sub': str(user_id),
            'iat': now,
            'exp': now + timedelta(seconds=settings.auth.JWT_REFRESH_TOKEN_EXPIRES_IN),
        }

        return jwt.encode(
            payload,
            settings.auth.SECRET_KEY.get_secret_value(),
            algorithm=settings.auth.ALGORITHM,
        )

    async def decode_token(self, token: str) -> DecodedTokenDTO:
        try:
            payload: dict = jwt.decode(
                token=token,
                key=settings.auth.SECRET_KEY.get_secret_value(),
                algorithms=[settings.auth.ALGORITHM],
                issuer=settings.app.TITLE,
            )
        except JWTExpiredSignatureError:
            return DecodedTokenDTO(user_id=None, status=DecodeTokenStatusEnum.EXPIRED)
        except (JWTError, KeyError, ValueError):
            return DecodedTokenDTO(
                user_id=None,
                status=DecodeTokenStatusEnum.INVALID,
            )

        return DecodedTokenDTO(
            user_id=int(payload['sub']),
            status=DecodeTokenStatusEnum.VALID,
        )
