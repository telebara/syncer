from dataclasses import dataclass
from typing import List

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import CardDAO
from dtos.cards import CardDTO
from common.database import get_async_session


@dataclass
class GetUserCardsService:
    _card_dao: CardDAO

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'GetUserCardsService':
        return cls(
            _card_dao=CardDAO(session),
        )

    async def execute(self, user_id: int) -> List[CardDTO]:
        card_entities = await self._card_dao.get_user_cards(user_id)

        return [
            CardDTO(
                id=card.id,
                name=card.name,
                description=card.description,
                image_url=card.image_url,
                rating=card.rating,
                magnet_link=card.magnet_link,
                user_id=card.user_id,
                created_at=card.created_at.isoformat(),
                tags=card.tags,
            )
            for card in card_entities
        ]
