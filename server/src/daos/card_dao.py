from dataclasses import dataclass
from datetime import datetime
from typing import NamedTuple, cast

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models import Card, CardTag, UserTag
from dtos.tags import TagShortDTO


class CardEntity(NamedTuple):
    id: int
    name: str
    description: str | None
    image_url: str | None
    magnet_link: str
    user_id: int
    created_at: datetime


class CardWithTagsEntity(NamedTuple):
    id: int
    name: str
    description: str | None
    image_url: str | None
    magnet_link: str
    user_id: int
    created_at: datetime
    tags: list[TagShortDTO]


@dataclass
class CardDAO:
    _session: AsyncSession

    async def _convert_obj_to_entity(self, obj: Card) -> CardEntity:
        return CardEntity(
            id=obj.id,
            name=obj.name,
            description=obj.description,
            image_url=obj.image_url,
            magnet_link=obj.magnet_link,
            user_id=obj.user_id,
            created_at=obj.created_at,
        )

    async def _convert_obj_to_entity_with_tags(self, obj: Card) -> CardWithTagsEntity:
        query = select(UserTag).join(CardTag).where(CardTag.card_id == obj.id)
        result = await self._session.execute(query)
        tags = result.scalars().all()

        tags_data = [
            TagShortDTO(
                id=tag.id,
                name=tag.name,
                color=tag.color,
            )
            for tag in tags
        ]

        return CardWithTagsEntity(
            id=obj.id,
            name=obj.name,
            description=obj.description,
            image_url=obj.image_url,
            user_id=obj.user_id,
            magnet_link=obj.magnet_link,
            created_at=obj.created_at,
            tags=tags_data,
        )

    async def create_card(
        self,
        name: str,
        description: str | None,
        image_url: str | None,
        user_id: int,
        magnet_link: str,
        tag_ids: list[int] | None = None,
    ) -> CardWithTagsEntity:
        card = Card(
            name=name,
            description=description,
            image_url=image_url,
            user_id=user_id,
            magnet_link=magnet_link,
        )

        self._session.add(card)
        await self._session.commit()
        await self._session.refresh(card)

        if tag_ids:
            for tag_id in tag_ids:
                card_tag = CardTag(
                    card_id=card.id,
                    tag_id=tag_id,
                )
                self._session.add(card_tag)

            await self._session.commit()

        return await self._convert_obj_to_entity_with_tags(card)

    async def get_user_cards(self, user_id: int) -> list[CardWithTagsEntity]:
        query = select(Card).where(Card.user_id == user_id)
        result = await self._session.execute(query)
        cards = result.scalars().all()

        return [await self._convert_obj_to_entity_with_tags(card) for card in cards]

    async def get_card_by_id(self, card_id: int, user_id: int) -> CardWithTagsEntity | None:
        query = select(Card).where(
            Card.id == card_id,
            Card.user_id == user_id
        )
        result = await self._session.execute(query)
        card_obj: Card | None = result.scalar_one_or_none()

        return await self._convert_obj_to_entity_with_tags(card_obj) if card_obj else None

    async def update_card(
        self,
        card_id: int,
        user_id: int,
        name: str | None = None,
        description: str | None = None,
        image_url: str | None = None,
        magnet_link: str | None = None,
        tag_ids: list[int] | None = None,
    ) -> CardWithTagsEntity | None:
        query = select(Card).where(
            Card.id == card_id,
            Card.user_id == user_id
        )
        result = await self._session.execute(query)
        card_obj: Card | None = result.scalar_one_or_none()

        if not card_obj:
            return None

        if name is not None:
            card_obj.name = name
        if description is not None:
            card_obj.description = description
        if image_url is not None:
            card_obj.image_url = image_url
        if magnet_link is not None:
            card_obj.magnet_link = magnet_link

        if tag_ids is not None:
            delete_query = select(CardTag).where(CardTag.card_id == card_id)
            delete_result = await self._session.execute(delete_query)
            old_card_tags = delete_result.scalars().all()

            for old_card_tag in old_card_tags:
                await self._session.delete(old_card_tag)

            await self._session.commit()

            for tag_id in tag_ids:
                card_tag = CardTag(
                    card_id=card_id,
                    tag_id=tag_id,
                )
                self._session.add(card_tag)

        self._session.add(card_obj)
        await self._session.commit()
        await self._session.refresh(card_obj)

        return await self._convert_obj_to_entity_with_tags(card_obj)

    async def delete_card(self, card_id: int, user_id: int) -> bool:
        query = select(Card).where(
            Card.id == card_id,
            Card.user_id == user_id
        )
        result = await self._session.execute(query)
        card_obj: Card | None = result.scalar_one_or_none()

        if not card_obj:
            return False

        delete_query = select(CardTag).where(CardTag.card_id == card_id)
        delete_result = await self._session.execute(delete_query)
        card_tags = delete_result.scalars().all()

        for card_tag in card_tags:
            await self._session.delete(card_tag)

        await self._session.delete(card_obj)
        await self._session.commit()

        return True
