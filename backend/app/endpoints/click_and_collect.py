from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder
from sqlmodel import select

from app.db.database import session
from app.models.click_and_collect import ClickAndCollects
from app.models.click_and_collect import ClickAndCollectCreate, ClickAndCollectRead, ClickAndCollectReadWithRelationship
from app.models.orders import Orders

cnc_routes = APIRouter()

@cnc_routes.post('/create-click-and-collect', tags=['click and collect'], status_code=201, description='Create new click and collect orders')
def create_cnc_order(cnc_order: ClickAndCollectCreate, customer_id: int, order_id: int):        
    customer = session.get(ClickAndCollects, customer_id)
    order = session.get(Orders, order_id)
    if not customer or not order:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='No order found for this customer')
    
    db_cnc_order = ClickAndCollects(**cnc_order.dict(), customer_id=customer_id, order_id=order_id)
    session.add(db_cnc_order)
    session.commit()
    session.refresh(db_cnc_order)
    return db_cnc_order

@cnc_routes.get('/click-and-collect/{cnc_orderid}', response_model=ClickAndCollectReadWithRelationship, tags=['click and collect'], status_code=201, description='Get click and collect orders')
def get_cnc_order(cnc_orderid: int):
    cnc = session.get(ClickAndCollects, cnc_orderid)
    if not cnc:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Click and collect order not found')
    
    return cnc

@cnc_routes.get('/click-and-collect',  tags=['click and collect'], status_code=201, description='Get all click and collect orders')
def get_cnc_orders():
    cnc = session.exec(select(ClickAndCollects)).all()    
    return cnc

