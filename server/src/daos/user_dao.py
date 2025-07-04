from dataclasses import dataclass
from datetime import datetime
from typing import NamedTuple, cast

from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select, exists

from models import User


class UserEntity(NamedTuple):
    id: int
    email: EmailStr
    image: str | None
    username: str
    created_at: datetime


@dataclass
class UserDAO:
    _session: AsyncSession

    async def _convert_obj_to_entity(self, obj: User) -> UserEntity:
        return UserEntity(
            id=obj.id,
            email=cast(EmailStr, obj.email),
            username=obj.username,
            image=obj.image,
            created_at=obj.created_at,
        )

    async def is_user_exists_by_email(self, email: EmailStr) -> bool:
        query = select(exists().where(User.email == email))
        result = await self._session.execute(query)
        return result.scalar()

    async def create_user(
        self,
        email: str,
        username: str,
        password: str,
        image: str | None = None,
    ) -> UserEntity:
        user = User(
            email=email,
            username=username,
            password=password,
            image=image,
        )

        self._session.add(user)
        await self._session.commit()
        await self._session.refresh(user)

        return await self._convert_obj_to_entity(user)

    async def get_user_by_email(
        self,
        email: EmailStr,
        with_hashed_password: bool = False,
    ) -> UserEntity | None | tuple[UserEntity | None, str | None]:
        query = select(User).where(User.email == email)
        result = await self._session.execute(query)
        user_obj: User | None = result.scalar_one_or_none()

        if not user_obj:
            return None if not with_hashed_password else (None, None)

        entity = await self._convert_obj_to_entity(user_obj)
        if with_hashed_password:
            return entity, user_obj.password

        return entity

    async def get_user_by_id(self, user_id: int) -> UserEntity | None:
        query = select(User).where(User.id == user_id)
        result = await self._session.execute(query)
        user_obj: User | None = result.scalar_one_or_none()
        return await self._convert_obj_to_entity(user_obj) if user_obj else None

    async def update_user(
        self,
        user_id: int,
        username: str | None = None,
        image: str | None = None,
    ) -> UserEntity | None:
        query = select(User).where(User.id == user_id)
        result = await self._session.execute(query)

        user_obj: User | None = result.scalar_one_or_none()
        if not user_obj:
            return None

        if username is not None:
            user_obj.username = username

        if image is not None:
            user_obj.image = image

        self._session.add(user_obj)
        await self._session.commit()
        await self._session.refresh(user_obj)

        return await self._convert_obj_to_entity(user_obj)
