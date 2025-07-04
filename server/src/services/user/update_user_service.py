from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

from common.database import get_async_session
from daos.user_dao import UserDAO, UserEntity


@dataclass
class UpdateUserService:
    _dao: UserDAO

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'UpdateUserService':
        return cls(
            _dao=UserDAO(
                _session=session,
            ),
        )

    async def execute(
        self,
        user_id: int,
        username: str | None = None,
        image: str | None = None,
    ) -> UserEntity | None:
        return await self._dao.update_user(
            user_id=user_id,
            username=username,
            image=image,
        )
