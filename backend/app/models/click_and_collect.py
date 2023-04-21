from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

from app.models.customer import Customers
from app.models.orders import Orders

class ClickAndCollectBase(SQLModel):
    pickup_date: Optional[datetime] = Field(default="")
    orderstate: Optional[str] = Field(default="")

class ClickAndCollects(ClickAndCollectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: Optional[int] = Field(default=None, foreign_key='orders.id')
    order: Optional[Orders] = Relationship()
    customer_id: Optional[int] = Field(default=None, foreign_key='customers.id')
    customer: Optional[Customers] = Relationship()

class ClickAndCollectCreate(ClickAndCollectBase):
    pass

class ClickAndCollectRead(ClickAndCollectBase):
    pass

class ClickAndCollectReadWithRelationship(ClickAndCollectRead):
    customer: Optional[Customers] = None
    order: Optional[Orders] = None
