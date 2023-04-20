from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

from app.models.customer import Customers


class Orders(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: Optional[Customers] = Field(default=None, foreign_key='customers.id')
    customer: Optional[Customers] = Relationship()
    orderstate: str
    ordertype: str