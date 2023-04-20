from sqlmodel import Session, select

from app.db.database import engine
from app.models.orders import Orders

def get_order_by_orderid(orderid):
    with Session(engine) as session:
        statement = select(Orders).where(Orders.id == orderid)
        return session.exec(statement).first()
    
def get_order_by_customerid(customerid):
    with Session(engine) as session:
        statement = select(Orders).where(Orders.customer_id == customerid)
        return session.exec(statement).first()