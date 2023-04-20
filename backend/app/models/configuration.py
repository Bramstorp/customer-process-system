from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

from app.models.user import UserRead, Users


class ConfigurationBase(SQLModel):
    location: str
    company_name: str
    api_endpoint: Optional[str]

class Configuration(ConfigurationBase, table=True):
    id: Optional[int] = Field(primary_key=True)
    company_user_id: Optional[int] = Field(default=None, foreign_key='users.id')
    company_user: Optional[Users] = Relationship()

class ConfigurationRead(ConfigurationBase):
    id: int
    
class ConfigurationReadWithUser(ConfigurationRead):
    company_user: Optional[UserRead] = None
    
class ConfigurationCreate(ConfigurationBase):
    pass

class ConfigurationUpdate(ConfigurationBase):
    pass