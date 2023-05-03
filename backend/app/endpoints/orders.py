from fastapi import APIRouter
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND
from sqlmodel import select
from fastapi import HTTPException

from app.db.database import session
from app.models.customer import Customers
from app.models.orders import Orders, OrderCreate, OrderReadWithCustomer


order_routes = APIRouter()

@order_routes.post('/create-orders', tags=['orders'], status_code=201, description='Create new orders')
def create_order(order: OrderCreate):  
    exist_order = session.query(Orders).filter(Orders.id == order.id).first()
    if exist_order:
        raise HTTPException(status_code=400, detail="Order already exists")
    
    customer = session.get(Customers, order.customer_id)
    if not customer:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Customer not found')

    db_order = Orders(**order.dict(), customer=customer)
    session.add(db_order)
    session.commit()
    session.refresh(db_order)
    return db_order

@order_routes.get('/order/{order_id}', response_model=OrderReadWithCustomer, tags=['orders'], status_code=201, description='Get new order')
def get_order(order_id: int):
    order = session.get(Orders, order_id)
    if not order:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Order not found')
    
    return order

@order_routes.get('/orders',  tags=['orders'], status_code=201, description='Get all orders')
def get_orders():
    orders = session.exec(select(Orders)).all()    
    return {'orders': orders}

