from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

from app.models.user import User


class Configuration(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    location: str
    company_name: str
    company_user_id: Optional[int] = Field(default=None, foreign_key='user.id')
    company_user: Optional[User] = Relationship()

