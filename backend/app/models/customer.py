from typing import Optional
from sqlmodel import Field, SQLModel


class Customers(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    address: str
    zipcode: int
    city: str
    country: str
    phone: str