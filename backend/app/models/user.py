import datetime
from typing import Optional

from pydantic import validator, EmailStr
from sqlmodel import SQLModel, Field


class UsersBase(SQLModel):
    username: str = Field(index=True)
    password: str = Field(max_length=256, min_length=6)
    created_at: datetime.datetime = datetime.datetime.now()

class Users(UsersBase, table=True):
    id: Optional[int] = Field(primary_key=True)

class UserInput(SQLModel):
    username: str
    password: str = Field(max_length=256, min_length=6)
    password2: str

    @validator('password2')
    def password_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords don\'t match')
        return v

class UserLogin(SQLModel):
    username: str
    password: str
    
class UserRead(SQLModel):
    id: int
    username: str
    created_at: datetime.datetime
