from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder
from sqlmodel import select

from app.db.database import session
from app.models.rerturn_case import ReturnCreate, Returns, ReturnCaseWithRelationship
from app.models.orders import Orders
from app.models.customer import Customers


return_case_router = APIRouter()


@return_case_router.post('/create-return-case', tags=['return case'], status_code=201, description='New return case')
def create_return_case(retrurn: ReturnCreate, customerid: int, orderid: int):
    order = session.get(Orders, orderid)
    customer = session.get(Customers, customerid)
    if not order or not customer:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Order for customer not found')

    
    statement = select(Returns).where(Returns.order_id == orderid)
    existing_returncase = session.exec(statement).first()
    if existing_returncase:
        return JSONResponse(status_code=HTTP_401_UNAUTHORIZED, content='Return case already exists')

    db_return_case = Returns(**retrurn.dict(), customer_id=customerid, order_id=orderid)
    session.add(db_return_case)
    session.commit()
    session.refresh(db_return_case)
    return db_return_case

@return_case_router.get('/return-case/{returnid}', response_model=ReturnCaseWithRelationship, tags=['return case'], status_code=201, description='Get return case')
def get_return_case(returnid: int):
    return_case = session.get(Returns, returnid)
    if not return_case:
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content='Return case not found')
    return return_case

@return_case_router.get('/return-cases', tags=['return case'], status_code=201, description='Get all return cases')
def get_return_cases():
    return_case = session.exec(select(Returns)).all()
    return {'return cases': return_case}