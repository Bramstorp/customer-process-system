from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder

from app.db.database import session
from app.models.orders import Order, Orderline, OrderCreate

from app.routes.user import auth_handler

order_routes = APIRouter()

@order_routes.post('/create-order', tags=['orders'], status_code=201, description='Create new order')
def create_order(order: OrderCreate):        
    db_order = Order.from_orm(order)
    print(db_order)
    session.add(db_order)
    session.commit()
    session.refresh(db_order)

    return db_order

@order_routes.post('/create-orderline', tags=['orderlines'], status_code=201, description='Create new orderline')
def create_orderline(orderline: Orderline):        
    db_order = Orderline.from_orm(orderline)
    session.add(db_order)
    session.commit()
    session.refresh(db_order)

    return db_order