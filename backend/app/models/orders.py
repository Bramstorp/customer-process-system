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
    orderlines: List["Orderline"] = Relationship(back_populates="order", sa_relationship=RelationshipProperty("Orderline", primaryjoin="Order.id == Orderline.order_id", uselist=True))
    
class OrderCreate(OrderBase):
    pass

class Orderline(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order: List[Order] = Relationship(back_populates="orderline", sa_relationship=RelationshipProperty("Order", primaryjoin="foreign(Order.orderline_id) == Order.id", uselist=False))
    productnumber: str
    productname: str
    amount: int
    unitprice: float
    totalprice: float

class GetOrder(SQLModel):
    order_id: int
    customer_id: int