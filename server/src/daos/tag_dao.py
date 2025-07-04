from dataclasses import dataclass
from datetime import datetime
from typing import NamedTuple

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models import UserTag


class TagEntity(NamedTuple):
    id: int
    name: str
    color: str
    user_id: int
    created_at: datetime


@dataclass
class TagDAO:
    _session: AsyncSession

    async def _convert_obj_to_entity(self, obj: UserTag) -> TagEntity:
        return TagEntity(
            id=obj.id,
            name=obj.name,
            color=obj.color,
            user_id=obj.user_id,
            created_at=obj.created_at,
        )

    async def create_tag(
        self,
        name: str,
        color: str,
        user_id: int,
    ) -> TagEntity:
        tag = UserTag(
            name=name,
            color=color,
            user_id=user_id,
        )

        self._session.add(tag)
        await self._session.commit()
        await self._session.refresh(tag)

        return await self._convert_obj_to_entity(tag)

    async def get_user_tags(self, user_id: int) -> list[TagEntity]:
        query = select(UserTag).where(UserTag.user_id == user_id)
        result = await self._session.execute(query)
        tags = result.scalars().all()

        return [await self._convert_obj_to_entity(tag) for tag in tags]

    async def get_tag_by_id(self, tag_id: int, user_id: int) -> TagEntity | None:
        query = select(UserTag).where(
            UserTag.id == tag_id,
            UserTag.user_id == user_id
        )
        result = await self._session.execute(query)
        tag_obj: UserTag | None = result.scalar_one_or_none()

        return await self._convert_obj_to_entity(tag_obj) if tag_obj else None

    async def is_tag_exists(self, name: str, user_id: int) -> bool:
        query = select(UserTag).where(
            UserTag.name == name,
            UserTag.user_id == user_id
        )
        result = await self._session.execute(query)
        return result.scalar_one_or_none() is not None

    async def delete_tag(self, tag_id: int, user_id: int) -> bool:
        query = select(UserTag).where(
            UserTag.id == tag_id,
            UserTag.user_id == user_id
        )
        result = await self._session.execute(query)
        tag_obj: UserTag | None = result.scalar_one_or_none()

        if not tag_obj:
            return False

        await self._session.delete(tag_obj)
        await self._session.commit()

        return True
