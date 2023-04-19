from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from sqlalchemy import Column
from geoalchemy2.types import Geometry
from typing import Any


class Orders(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: int = Field(default=None, foreign_key="customers.id")
    orderstate: str
    ordertype: str