from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

from app.models.customer import Customers
from app.models.orders import Orders

class Returns(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: Optional[Customers] = Field(default=None, foreign_key='customers.id')
    customer: Optional[Customers] = Relationship()   
    order_id: Optional[Orders] = Field(default=None, foreign_key='orders.id')
    order: Optional[Orders] = Relationship() 
    return_date: datetime
    kolli_amount: int