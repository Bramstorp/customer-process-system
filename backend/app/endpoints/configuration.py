from fastapi import APIRouter, Depends, HTTPException
from starlette.responses import JSONResponse
from starlette.status import (
    HTTP_404_NOT_FOUND,
    HTTP_401_UNAUTHORIZED,
    HTTP_204_NO_CONTENT,
    HTTP_409_CONFLICT,
)
from sqlmodel import select

from app.db.database import session
from app.models.configuration import (
    Configuration,
    ConfigurationReadBase,
    ConfigurationCreate,
    ConfigurationReadWithUser,
)
from app.models.customer import Customers
from app.models.click_and_collect import ClickAndCollects
from app.models.rerturn_case import Returns
from app.models.orders import Orders

from app.endpoints.user import auth_handler


from ..utils.email import send_email
from ..utils.zgl import print_label

configuration_router = APIRouter()


@configuration_router.post(
    "/create-company",
    tags=["company"],
    status_code=201,
    description="Configure new company",
)
def create_company(
    config: ConfigurationCreate, user=Depends(auth_handler.get_current_user)
):
    if not user:
        return JSONResponse(
            content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED
        )
        

    existing_company = session.exec(
        select(Configuration).where(Configuration.company_user_id == user.id)
    ).first()
    if existing_company:
        return JSONResponse(
            content="Company already exists", status_code=HTTP_409_CONFLICT
        )

    created_config = Configuration(
        **config.dict(), company_user=user
    )
    session.add(created_config)
    session.commit()

    return created_config


@configuration_router.get(
    "/company/{id}", response_model=ConfigurationReadWithUser, tags=["company"]
)
def get_company(id: int, user=Depends(auth_handler.get_current_user)):
    if not user:
        return JSONResponse(
            content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED
        )

    compnay = session.get(Configuration, id)
    if not compnay:
        return JSONResponse(content="Company not found", status_code=HTTP_404_NOT_FOUND)

    return compnay


@configuration_router.get(
    "/user/company", response_model=ConfigurationReadBase, tags=["company"]
)
def get_company_by_user(user=Depends(auth_handler.get_current_user)):
    statement = select(Configuration).where(Configuration.company_user_id == user.id)
    existing_company = session.exec(statement).first()
    if not existing_company:
        return JSONResponse(
            status_code=HTTP_401_UNAUTHORIZED, content="Company not found"
        )

    return existing_company


@configuration_router.put(
    "/update-company/{id}", response_model=Configuration, tags=["company"]
)
def update_company(
    id: int, config: ConfigurationCreate, user=Depends(auth_handler.get_current_user)
):
    if not user:
        raise HTTPException(status_code=401, detail="UNAUTHORIZED USER")

    company_found = session.query(Configuration).filter_by(id=id).first()
    if company_found.company_user_id != user.id:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this company"
        )

    for key, value in config.dict(exclude_unset=True).items():
        setattr(company_found, key, value)

    session.commit()
    return company_found


@configuration_router.put(
    "/user/update-company", response_model=Configuration, tags=["company"]
)
def update_company_by_userid(
    config: ConfigurationCreate, user=Depends(auth_handler.get_current_user)
):
    if not user:
        raise HTTPException(status_code=401, detail="UNAUTHORIZED USER")

    company_found = (
        session.query(Configuration).filter_by(company_user_id=user.id).first()
    )
    if company_found.company_user_id != user.id:
        raise HTTPException(
            status_code=401, detail="You don't have permission to update this company"
        )

    for key, value in config.dict(exclude_unset=True).items():
        setattr(company_found, key, value)

    session.commit()
    return company_found


@configuration_router.delete(
    "/delete-company/{id}", status_code=HTTP_204_NO_CONTENT, tags=["company"]
)
def delete_company(id: int, user=Depends(auth_handler.get_current_user)):
    if not user:
        return JSONResponse(
            content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED
        )

    company_found = session.get(Configuration, id)
    if company_found.company_user_id != user.id:
        return JSONResponse(
            content="U dont have permision to update this company",
            status_code=HTTP_401_UNAUTHORIZED,
        )

    if company_found:
        session.delete(company_found)

    session.commit()


@configuration_router.get("/get-cases", tags=["cases"])
def get_cases():
    cnc = session.exec(
        select(ClickAndCollects, Orders).where(ClickAndCollects.order_id == Orders.id)
    ).all()
    returns = session.exec(
        select(Returns, Orders).where(Returns.order_id == Orders.id)
    ).all()
    cnc_flat_map = [
        {
            "type": "cnc",
            "id": row[0].id,
            "date_of_action": row[0].pickup_date,
            "customer_id": row[0].customer_id,
            "order_id": row[0].order_id,
            "order": row[1],
        }
        for row in cnc
    ]
    returns_flat_map = [
        {
            "type": "returns",
            "id": row[0].id,
            "order_id": row[0].order_id,
            "date_of_action": row[0].return_date,
            "customer_id": row[0].customer_id,
            "order": row[1],
        }
        for row in returns
    ]

    return cnc_flat_map + returns_flat_map


@configuration_router.get(
    "/email", tags=["Email"], status_code=201, description="Test email"
)
def test_email(company_id: int, customer_id: int):
    company = session.get(Configuration, company_id)
    customer = session.get(Customers, customer_id)
    send_email("retursag", 1, company.name, customer)
    return "Email sent"


@configuration_router.get(
    "/labels", tags=["Labels"], status_code=201, description="Test label print"
)
def test_labelprint(ip_address: str):
    print_label(ip_address, kode=123)
    return "Printing label"
