from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
import pytz

tz = pytz.timezone('Europe/Copenhagen')


class CustomerBase(SQLModel):
    name: str
    email: str
    address: str
    zipcode: int
    city: str
    country: str
    phone: str
    created: datetime = datetime.now(tz)


class Customers(CustomerBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class CustomerCreate(CustomerBase):
    id: int


class CustomerUpdate(CustomerBase):
    pass


class CustomerInDB(CustomerBase):
    id: int


class CustomerRead(CustomerBase):
    id: int
