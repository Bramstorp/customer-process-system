from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
from typing import List

from app.models.customer import Customers
from app.models.orders import Orders

class ReturnBase(SQLModel):
    return_date: datetime
    kolli_amount: int

class Returns(ReturnBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: Optional[int] = Field(default=None, foreign_key='customers.id')
    customer: Optional[Customers] = Relationship()   
    order_id: Optional[int] = Field(default=None, foreign_key='orders.id')
    order: Optional[Orders] = Relationship() 


class ReturnCreate(ReturnBase):
    pass

class ReturnRead(ReturnBase):
    pass

class ReturnCaseWithRelationship(ReturnRead):
    customer: Optional[Customers] = None
    order: Optional[Orders] = None
    