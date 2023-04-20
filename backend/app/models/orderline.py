from typing import Optional
from sqlmodel import Field, SQLModel, Relationship


from app.models.orders import Orders

class Orderline(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: Optional[Orders] = Field(default=None, foreign_key='Orders.id')
    order: Optional[Orders] = Relationship()
    productnumber: str
    productname: str
    amount: int
    unitprice: float
    totalprice: float