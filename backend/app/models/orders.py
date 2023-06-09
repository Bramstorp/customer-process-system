from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

from app.models.customer import Customers


class OrderBase(SQLModel):
    orderstate: str = Field(default="ordered")
    ordertype: str
    orderdata: datetime
    total_price: int
    currency: str = Field(default="DKK")


class Orders(OrderBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: Optional[int] = Field(default=None, foreign_key="customers.id")
    customer: Optional[Customers] = Relationship()


class OrderCreate(OrderBase):
    customer_id: int
    id: int


class OrderRead(OrderBase):
    pass


class OrderReadWithCustomer(OrderRead):
    customer: Optional[Customers] = None
    id: Optional[int] = None


class GetOrder(SQLModel):
    order_id: int
    customer_id: int
