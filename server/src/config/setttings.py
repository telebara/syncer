import os
from dataclasses import dataclass
from enum import StrEnum
from functools import lru_cache
from typing import ClassVar

from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, Field, SecretStr


class EnvEnum(StrEnum):
    PROD = 'PROD'
    DEV = 'DEV'
    TEST = 'TEST'


class DatabaseSettings(BaseSettings):
    HOST: str = Field('syncer-db', alias='DB_HOST')
    PORT: int = Field(5432, alias='DB_PORT')
    USER: str = Field('syncer_user', alias='DB_USER')
    PASSWORD: str = Field('syncer_pass', alias='DB_PASSWORD')
    NAME: str = Field('syncer_db', alias='DB_NAME')
    DRIVER: str = Field('postgresql+asyncpg', alias='DB_DRIVER')

    DB_ECHO_LOG: bool = Field(False)

    @property
    def database_dsn(self) -> PostgresDsn:
        return PostgresDsn(f'{self.DRIVER}://syncer_user:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.NAME}')


class AuthSettings(BaseSettings):
    ARGON2_TIME_COST: int = Field(2)
    ARGON2_MEMORY_COST: int = Field(65536)
    ARGON2_PARALLELISM: int = Field(4)
    ARGON2_HASH_LENGTH: int = Field(32)
    ARGON2_SALT_LENGTH: int = Field(16)

    SECRET_KEY: SecretStr = Field(SecretStr('secret_key'))
    ALGORITHM: str = Field('HS256')

    JWT_ACCESS_TOKEN_EXPIRES_IN: int = Field(60 * 60)
    JWT_REFRESH_TOKEN_EXPIRES_IN: int = Field(60 * 60 * 24 * 30)


class ApplicationSettings(BaseSettings):
    TITLE: str = Field('syncer-service', alias='APP_TITLE')

    VERSION: str = Field('0.0.1')
    DESCRIPTION: str = Field('')

    HOST: str = Field('0.0.0.0', alias='APP_HOST')
    PORT: int = Field(8080, alias='APP_PORT')

    ALLOW_ORIGINS: list[str] = Field(['*'])
    ALLOW_METHODS: list[str] = Field(['*'])
    ALLOW_HEADERS: list[str] = Field(['*'])

    ENV: EnvEnum = Field(EnvEnum.DEV)
    LOG_LEVEL: str = Field('info')
    RELOAD: bool = Field(True)

    @property
    def WORKERS(self) -> int:
        cpu_count = os.cpu_count()
        if cpu_count is None:
            return 1
        return cpu_count - 1 if self.ENV == EnvEnum.PROD else 1

    SENTRY_DSN: str = Field('')

    @property
    def swagger_kwargs(self) -> dict:
        return {
            'openapi_url': '/openapi.json',
            'docs_url': '/docs',
            'redoc_url': None,
        }


@dataclass
class Settings:
    db: ClassVar[DatabaseSettings] = DatabaseSettings()  # type: ignore
    app: ClassVar[ApplicationSettings] = ApplicationSettings()  # type: ignore
    auth: ClassVar[AuthSettings] = AuthSettings()  # type: ignore


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
