from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.orm import declared_attr
from sqlmodel import Field, Relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .card import Card
    from .user_tag import UserTag


class User(BaseModel, table=True):
    cards: list['Card'] = Relationship(back_populates='user')
    user_tags: list['UserTag'] = Relationship(back_populates='user')

    email: str = Field(
        sa_column=Column(
            String(255),
            nullable=False,
            unique=True,
        )
    )
    username: str = Field(
        sa_column=Column(
            String(50),
            nullable=False,
        )
    )
    password: str = Field(
        sa_column=Column(
            String(255),
            nullable=False,
        )
    )
    image: str | None
    created_at: datetime = Field(
        default_factory=datetime.now,
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
        ),
    )

    @declared_attr  # type: ignore
    def __tablename__(cls) -> str:  # type: ignore
        return 'app_user'
