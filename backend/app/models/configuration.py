from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

from app.models.user import UserRead, Users


class ConfigurationBase(SQLModel):
    location: Optional[str]
    company_name: Optional[str]
    company_logo: Optional[str]
    api_endpoint: Optional[str]
    api_token: Optional[str]
    zebra_printer_ip: Optional[str]
    enable_api_integration: Optional[bool] = False

class Configuration(ConfigurationBase, table=True):
    id: Optional[int] = Field(primary_key=True)
    company_user_id: Optional[int] = Field(default=None, foreign_key='users.id')
    company_user: Optional[Users] = Relationship()
    
class ConfigurationReadBase(ConfigurationBase):
    pass

class ConfigurationRead(ConfigurationBase):
    id: int
    
class ConfigurationReadWithUser(ConfigurationRead):
    company_user: Optional[UserRead] = None
    
class ConfigurationCreate(ConfigurationBase):
    pass

class ConfigurationUpdate(ConfigurationBase):
    pass