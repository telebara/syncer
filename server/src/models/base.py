from sqlmodel import Field, SQLModel


class BaseModel(SQLModel):
    __abstract__ = True

    id: int = Field(primary_key=True, index=True)
