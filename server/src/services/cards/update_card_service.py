from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import CardDAO
from dtos.cards import CardDTO
from common.database import get_async_session


@dataclass
class UpdateCardService:
    _card_dao: CardDAO

    class CardNotFoundException(Exception):
        pass

    class CardNameInvalidException(Exception):
        pass

    class CardNameTooLongException(Exception):
        pass

    class RatingInvalidException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'UpdateCardService':
        return cls(
            _card_dao=CardDAO(session),
        )

    async def execute(
        self,
        card_id: int,
        user_id: int,
        name: str | None = None,
        description: str | None = None,
        image_url: str | None = None,
        rating: float | None = None,
        tag_ids: list[int] | None = None,
    ) -> CardDTO:
        existing_card = await self._card_dao.get_card_by_id(card_id, user_id)
        if not existing_card:
            raise self.CardNotFoundException

        if name is not None:
            if not name.strip():
                raise self.CardNameInvalidException

            if len(name) > 255:
                raise self.CardNameTooLongException

        if rating is not None:
            if not (0.0 <= rating <= 10.0):
                raise self.RatingInvalidException

        updated_card = await self._card_dao.update_card(
            card_id=card_id,
            user_id=user_id,
            name=name,
            description=description,
            image_url=image_url,
            rating=rating,
            tag_ids=tag_ids,
        )

        if not updated_card:
            raise self.CardNotFoundException

        return CardDTO(
            id=updated_card.id,
            name=updated_card.name,
            description=updated_card.description,
            image_url=updated_card.image_url,
            rating=updated_card.rating,
            user_id=updated_card.user_id,
            created_at=updated_card.created_at.isoformat(),
            tags=updated_card.tags,
        )
