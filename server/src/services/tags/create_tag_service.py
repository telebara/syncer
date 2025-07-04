import re
from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import TagDAO
from dtos.tags import TagDTO
from common.database import get_async_session


@dataclass
class CreateTagService:
    _tag_dao: TagDAO

    class TagNameInvalidException(Exception):
        pass

    class TagNameTooLongException(Exception):
        pass

    class TagAlreadyExistsException(Exception):
        pass

    class ColorInvalidException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'CreateTagService':
        return cls(
            _tag_dao=TagDAO(session),
        )

    async def execute(
        self,
        name: str,
        color: str,
        user_id: int,
    ) -> TagDTO:
        if not name.strip():
            raise self.TagNameInvalidException

        if len(name) > 100:
            raise self.TagNameTooLongException

        if not re.match(r'^#[0-9A-Fa-f]{6}$', color):
            raise self.ColorInvalidException

        if await self._tag_dao.is_tag_exists(name, user_id):
            raise self.TagAlreadyExistsException

        tag_entity = await self._tag_dao.create_tag(
            name=name,
            color=color,
            user_id=user_id,
        )

        return TagDTO(
            id=tag_entity.id,
            name=tag_entity.name,
            color=tag_entity.color,
            user_id=tag_entity.user_id,
            created_at=tag_entity.created_at.isoformat(),
        )
