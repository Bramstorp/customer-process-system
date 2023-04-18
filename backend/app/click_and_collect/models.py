from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from sqlalchemy import Column
from geoalchemy2.types import Geometry
from typing import Any


class ClickAndCollects(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(default=None, foreign_key="orders.id")
    customer_id: int = Field(default=None, foreign_key="customers.id")
    pickup_date: datetime
    orderstate: str
    time_to_pickup: int