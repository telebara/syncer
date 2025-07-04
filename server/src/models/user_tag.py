from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint, String, DateTime, func
from sqlmodel import Field, Relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .user import User
    from .card_tag import CardTag


class UserTag(BaseModel, table=True):
    __table_args__ = (UniqueConstraint('user_id', 'name', name='uq_user_tag'),)

    user: 'User' = Relationship(back_populates='user_tags')
    card_tags: list['CardTag'] = Relationship(back_populates='tag')

    name: str = Field(sa_column=Column(String(100), nullable=False))
    color: str = Field(sa_column=Column(String(7), nullable=False))
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
