from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint, DateTime, func
from sqlmodel import Field, Relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .card import Card
    from .user_tag import UserTag


class CardTag(BaseModel, table=True):
    __table_args__ = (UniqueConstraint('card_id', 'tag_id', name='uq_card_tag'),)

    card: 'Card' = Relationship(back_populates='card_tags')
    tag: 'UserTag' = Relationship(back_populates='card_tags')

    card_id: int = Field(
        sa_column=Column(
            Integer,
            ForeignKey('card.id'),
            nullable=False,
        )
    )
    tag_id: int = Field(
        sa_column=Column(
            Integer,
            ForeignKey('usertag.id'),
            nullable=False,
        )
    )
    created_at: datetime = Field(
        default_factory=datetime.now,
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
        ),
    )
