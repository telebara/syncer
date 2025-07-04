from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import TagDAO
from dtos.tags import TagDTO
from common.database import get_async_session


@dataclass
class GetUserTagsService:
    _tag_dao: TagDAO

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'GetUserTagsService':
        return cls(
            _tag_dao=TagDAO(session),
        )

    async def execute(self, user_id: int) -> list[TagDTO]:
        tag_entities = await self._tag_dao.get_user_tags(user_id)

        return [
            TagDTO(
                id=tag.id,
                name=tag.name,
                color=tag.color,
                user_id=tag.user_id,
                created_at=tag.created_at.isoformat(),
            )
            for tag in tag_entities
        ]
