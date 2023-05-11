from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED
from sqlmodel import select

from app.db.database import session
from app.models.rerturn_case import ReturnCreate, Returns, ReturnCaseWithRelationship
from app.models.orders import Orders
from app.models.customer import Customers
from app.models.user import Users
from app.models.configuration import Configuration

from app.utils.email import send_email
from app.utils.zgl import print_label

from app.auth.auth import AuthHandler

return_case_router = APIRouter()
auth_handler = AuthHandler()


@return_case_router.post(
    "/create-return-case",
    tags=["return case"],
    status_code=201,
    description="New return case",
)
def create_return_case(retrurn: ReturnCreate, order: Orders, customer: Customers):
    statement = select(Returns).where(Returns.order_id == order.id)
    existing_returncase = session.exec(statement).first()
    if existing_returncase:
        return JSONResponse(
            status_code=HTTP_401_UNAUTHORIZED, content="Return case already exists"
        )

    existing_order = session.get(Orders, order.id)
    if existing_order:
        order = existing_order

    db_return_case = Returns(**retrurn.dict(), order=order, customer=customer)
    session.add(db_return_case)
    session.commit()
    session.refresh(db_return_case)
    
    if db_return_case and order and customer:
        send_email(
            source="returvare", orderid=order.id, company_name="test", customer=customer
        )
        print_label(ip_address="", data=order.id)

    return db_return_case


@return_case_router.get(
    "/return-case/{return_id}",
    response_model=ReturnCaseWithRelationship,
    tags=["return case"],
    status_code=201,
    description="Get return case",
)
def get_return_case(return_id: int):
    return_case = session.get(Returns, return_id)
    if not return_case:
        return JSONResponse(
            status_code=HTTP_404_NOT_FOUND, content="Return case not found"
        )

    return return_case


@return_case_router.get(
    "/return-case/order/{order_id}",
    response_model=ReturnCaseWithRelationship,
    tags=["return case"],
    status_code=201,
    description="Get return case",
)
def get_return_case_by_orderid(order_id: int):
    statement = select(Returns).where(Returns.order_id == order_id)
    existing_returncase = session.exec(statement).first()
    if not existing_returncase:
        return JSONResponse(
            status_code=HTTP_401_UNAUTHORIZED, content="No return case for by order id"
        )

    return existing_returncase


@return_case_router.get(
    "/return-cases",
    tags=["return case"],
    status_code=201,
    description="Get all return cases",
)
def get_return_cases():
    return_case = session.exec(select(Returns)).all()
    return return_case
