from fastapi import APIRouter
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED
from sqlmodel import select

from app.db.database import session
from app.models.click_and_collect import ClickAndCollects
from app.models.click_and_collect import (
    ClickAndCollectCreate,
    ClickAndCollectReadWithRelationship,
)
from app.models.orders import Orders
from app.models.customer import Customers

cnc_routes = APIRouter()


@cnc_routes.post(
    "/create-click-and-collect",
    response_model=ClickAndCollectReadWithRelationship,
    tags=["click and collect"],
    status_code=201,
    description="Create new click and collect orders",
)
def create_cnc_order(
    cnc_order: ClickAndCollectCreate, order: Orders, customer: Customers
):
    statement = select(ClickAndCollects).where(ClickAndCollects.order_id == order.id)
    existing_cnc_order = session.exec(statement).first()
    if existing_cnc_order:
        return JSONResponse(
            status_code=HTTP_401_UNAUTHORIZED,
            content="Click and collect order already exists",
        )

    existing_order = session.get(Orders, order.id)
    if existing_order:
        order = existing_order

    db_cnc_order = ClickAndCollects(**cnc_order.dict(), order=order, customer=customer)
    session.add(db_cnc_order)
    session.commit()
    session.refresh(db_cnc_order)
    return db_cnc_order


@cnc_routes.get(
    "/click-and-collect/order/{order_id}",
    response_model=ClickAndCollectReadWithRelationship,
    tags=["click and collect"],
    status_code=201,
    description="Get click and collect orders",
)
def get_cnc_order(order_id: int):
    statement = select(ClickAndCollects).where(ClickAndCollects.order_id == order_id)
    cnc_order = session.exec(statement).first()
    if not cnc_order:
        return JSONResponse(
            status_code=HTTP_404_NOT_FOUND, content="Click and collect order not found"
        )

    return cnc_order


@cnc_routes.get(
    "/click-and-collect/{cnc_orderid}",
    response_model=ClickAndCollectReadWithRelationship,
    tags=["click and collect"],
    status_code=201,
    description="Get click and collect orders",
)
def get_cnc_order(cnc_orderid: int):
    cnc = session.get(ClickAndCollects, cnc_orderid)
    if not cnc:
        return JSONResponse(
            status_code=HTTP_404_NOT_FOUND, content="Click and collect order not found"
        )

    return cnc


@cnc_routes.get(
    "/click-and-collect",
    tags=["click and collect"],
    status_code=201,
    description="Get all click and collect orders",
)
def get_cnc_orders():
    cnc = session.exec(select(ClickAndCollects)).all()
    return cnc
