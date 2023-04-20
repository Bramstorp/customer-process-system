from sqlmodel import Session, select

from app.db.database import engine
from app.models.orders import Order

def get_order_by_orderid(orderid):
    with Session(engine) as session:
        statement = select(Order).where(Order.id == orderid)
        return session.exec(statement).first()
    
def get_order_by_customerid(customerid):
    with Session(engine) as session:
        statement = select(Order).where(Order.customer_id == customerid)
        return session.exec(statement).first()