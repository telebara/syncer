from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Column, Float, String, Integer, ForeignKey, DateTime, func
from sqlmodel import Field, Relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .card_tag import CardTag
    from .user import User


class Card(BaseModel, table=True):
    user: 'User' = Relationship(back_populates='cards')
    card_tags: list['CardTag'] = Relationship(back_populates='card')

    name: str = Field(
        sa_column=Column(
            String(255),
            nullable=False,
        )
    )
    description: str | None
    image_url: str | None
    magnet_link: str
    rating: float | None = Field(
        sa_column=Column(
            Float(precision=2),
            nullable=True,
        )
    )
    user_id: int = Field(
        sa_column=Column(
            Integer,
            ForeignKey('app_user.id'),
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
