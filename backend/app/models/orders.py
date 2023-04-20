from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy.orm import RelationshipProperty

from app.models.customer import Customers

class OrderBase(SQLModel):
    orderstate: str
    ordertype: str

class Order(OrderBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: Optional[int] = Field(default=None, foreign_key='customers.id')
    customer: Optional[Customers] = Relationship()
    
class OrderCreate(OrderBase):
    pass

class OrderRead(OrderBase):
    pass

class OrderReadWithOrderlines(OrderRead):
    orderlines: List["Orderline"] = []

class GetOrder(SQLModel):
    order_id: int
    customer_id: int
