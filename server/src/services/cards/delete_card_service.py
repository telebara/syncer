from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import CardDAO
from common.database import get_async_session


@dataclass
class DeleteCardService:
    _card_dao: CardDAO

    class CardNotFoundException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'DeleteCardService':
        return cls(
            _card_dao=CardDAO(session),
        )

    async def execute(
        self,
        card_id: int,
        user_id: int,
    ) -> bool:
        existing_card = await self._card_dao.get_card_by_id(card_id, user_id)
        if not existing_card:
            raise self.CardNotFoundException

        success = await self._card_dao.delete_card(card_id, user_id)

        if not success:
            raise self.CardNotFoundException

        return True
