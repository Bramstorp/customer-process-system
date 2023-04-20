from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder

from app.db.database import session
from app.models.rerturn_case import Returns
from app.models.orders import Orders, GetOrder

from app.utils.orders import get_order_by_orderid, get_order_by_customerid

return_case_router = APIRouter()


@return_case_router.post('/create-return-case', tags=['return case'], status_code=201, description='New return case')
def create_return_case(return_case: Returns, order: GetOrder):
    found_order = get_order_by_orderid(order.order_id)
    found_customer = get_order_by_customerid(order.customer_id)
    
    if not found_customer and not found_order:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Order not found')
        
    
    print(return_case.responses)
    
    
    return found_order
