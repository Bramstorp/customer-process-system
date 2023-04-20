from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder
from sqlmodel import select
from app.db.database import session
from app.models.orders import Order, Orderline, OrderCreate, OrderRead

from app.routes.user import auth_handler

order_routes = APIRouter()

@order_routes.post('/create-order', tags=['orders'], status_code=201, description='Create new order')
def create_order(order: OrderCreate):        
    db_order = Orderline.from_orm(order)
    session.add(db_order)
    session.commit()
    session.refresh(db_order)
    return db_order

@order_routes.post('/order/{order_id}', response_model=OrderRead, tags=['orders'], status_code=201, description='Create new order')
def get_order(order_id: int):
    order = session.get(Order, order_id)
    if not order:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Order not found')
    
    return order
