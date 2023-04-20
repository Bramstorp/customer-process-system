from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

from app.models.customer import Customers
from app.models.orders import Orders

class ClickAndCollects(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: Optional[int] = Field(default=None, foreign_key='order.id')
    order: Optional[Orders] = Relationship()
    customer_id: Optional[int] = Field(default=None, foreign_key='customers.id')
    customer: Optional[Customers] = Relationship()
    pickup_date: datetime
    orderstate: str
    time_to_pickup: int