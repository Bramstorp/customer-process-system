from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from sqlalchemy import Column
from geoalchemy2.types import Geometry
from typing import Any


class Orderline(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(default=None, foreign_key="orders.id")
    productnumber: str
    productname: str
    amount: int
    unitprice: float
    totalprice: float