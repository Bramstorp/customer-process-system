from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder
from sqlmodel import select

from app.db.database import session
from app.models.customer import CustomerInDB, Customers
from app.models.orders import Orders, OrderCreate, OrderRead, OrderReadWithCustomer


order_routes = APIRouter()

@order_routes.post('/create-orders', tags=['orders'], status_code=201, description='Create new orders')
def create_order(order: OrderCreate, customer_id: int):        
    customer = session.get(Customers, customer_id)
    if not customer:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Customer not found')
    
    db_order = Orders(**order.dict(), customer_id=customer_id)
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
    statement = select(Orders)
    orders = session.exec(statement).all()    
    return {'orders': orders}

