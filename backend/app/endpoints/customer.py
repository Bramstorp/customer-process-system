from fastapi import APIRouter, HTTPException
from starlette.responses import JSONResponse
from starlette.status import (
    HTTP_404_NOT_FOUND,
    HTTP_401_UNAUTHORIZED,
    HTTP_204_NO_CONTENT,
)
from fastapi.encoders import jsonable_encoder
from sqlmodel import select
from app.db.database import session
from app.models.customer import Customers, CustomerCreate, CustomerRead


customer_routes = APIRouter()


@customer_routes.post(
    "/create-customer",
    tags=["customers"],
    status_code=201,
    description="Create new orders",
)
def create_customer(customer: CustomerCreate):
    exist_customer = (
        session.query(Customers).filter(Customers.id == customer.id).first()
    )
    if exist_customer:
        raise HTTPException(status_code=400, detail="Customer already exists")

    db_customer = Customers(**customer.dict())
    session.add(db_customer)
    session.commit()
    session.refresh(db_customer)
    return db_customer


@customer_routes.get(
    "/customer/{customer_id}",
    response_model=CustomerRead,
    tags=["customers"],
    status_code=201,
    description="Get customer by id",
)
def get_customer(customer_id: int):
    customer = session.get(Customers, customer_id)
    if not customer:
        return JSONResponse(
            status_code=HTTP_404_NOT_FOUND, content="Constumer not found"
        )

    return customer


@customer_routes.get(
    "/customer", tags=["customers"], status_code=201, description="Get customers"
)
def get_customer():
    customer = session.exec(select(Customers)).all()
    return customer
