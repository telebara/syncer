from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import TagDAO
from common.database import get_async_session


@dataclass
class DeleteTagService:
    _tag_dao: TagDAO

    class TagNotFoundException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'DeleteTagService':
        return cls(
            _tag_dao=TagDAO(session),
        )

    async def execute(
        self,
        tag_id: int,
        user_id: int,
    ) -> bool:
        existing_tag = await self._tag_dao.get_tag_by_id(tag_id, user_id)
        if not existing_tag:
            raise self.TagNotFoundException

        success = await self._tag_dao.delete_tag(tag_id, user_id)

        if not success:
            raise self.TagNotFoundException

        return True
