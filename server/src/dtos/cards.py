from dataclasses import dataclass

from pydantic import BaseModel

from dtos.tags import TagShortDTO


class CreateCardRequestDTO(BaseModel):
    name: str
    description: str | None = None
    image_url: str | None = None
    magnet_link: str
    tag_ids: list[int] | None = None


class UpdateCardRequestDTO(BaseModel):
    name: str | None = None
    description: str | None = None
    image_url: str | None = None
    tag_ids: list[int] | None = None


class TagDTO(BaseModel):
    id: int
    name: str
    color: str


class CardResponseDTO(BaseModel):
    id: int
    name: str
    description: str | None
    image_url: str | None
    magnet_link: str
    created_at: str
    tags: list[TagDTO]


class CardsListResponseDTO(BaseModel):
    cards: list[CardResponseDTO]


@dataclass
class CardDTO:
    id: int
    name: str
    description: str | None
    image_url: str | None
    magnet_link: str
    user_id: int
    created_at: str
    tags: list[TagShortDTO]
