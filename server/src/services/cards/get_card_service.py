from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import CardDAO
from dtos.cards import CardDTO
from common.database import get_async_session


@dataclass
class GetCardService:
    _card_dao: CardDAO

    class CardNotFoundException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'GetCardService':
        return cls(
            _card_dao=CardDAO(session),
        )

    async def execute(
        self,
        card_id: int,
        user_id: int,
    ) -> CardDTO:
        card_entity = await self._card_dao.get_card_by_id(card_id, user_id)

        if not card_entity:
            raise self.CardNotFoundException

        return CardDTO(
            id=card_entity.id,
            name=card_entity.name,
            description=card_entity.description,
            image_url=card_entity.image_url,
            rating=card_entity.rating,
            user_id=card_entity.user_id,
            created_at=card_entity.created_at.isoformat(),
            tags=card_entity.tags,
        )
