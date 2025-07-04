from dataclasses import dataclass

from pydantic import BaseModel


class CreateTagRequestDTO(BaseModel):
    name: str
    color: str


class TagResponseDTO(BaseModel):
    id: int
    name: str
    color: str
    created_at: str


class TagsListResponseDTO(BaseModel):
    tags: list[TagResponseDTO]


@dataclass
class TagShortDTO:
    id: int
    name: str
    color: str


@dataclass
class TagDTO:
    id: int
    name: str
    color: str
    user_id: int
    created_at: str
