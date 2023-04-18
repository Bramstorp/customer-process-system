from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from sqlalchemy import Column
from geoalchemy2.types import Geometry
from typing import Any


class Customers(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    address: str
    zipcode: int
    city: str
    country: str
    phone: str