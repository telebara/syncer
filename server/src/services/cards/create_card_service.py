from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from daos import CardDAO
from dtos.cards import CardDTO
from common.database import get_async_session


@dataclass
class CreateCardService:
    _card_dao: CardDAO

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
    ) -> 'CreateCardService':
        return cls(
            _card_dao=CardDAO(session),
        )

    async def execute(
        self,
        name: str,
        description: str | None,
        image_url: str | None,
        rating: float | None,
        user_id: int,
        tag_ids: list[int] | None = None,
    ) -> CardDTO:
        if not name.strip():
            raise self.CardNameInvalidException

        if len(name) > 255:
            raise self.CardNameTooLongException

        if rating is not None:
            if not (0.0 <= rating <= 10.0):
                raise self.RatingInvalidException

        card_entity = await self._card_dao.create_card(
            name=name,
            description=description,
            image_url=image_url,
            rating=rating,
            user_id=user_id,
            tag_ids=tag_ids,
        )

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
