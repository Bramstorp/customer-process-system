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

from geopy.geocoders import Nominatim

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
    "/customers", tags=["customers"], status_code=201, description="Get customers"
)
def get_customers():
    customer = session.exec(select(Customers)).all()
    return customer


@customer_routes.get(
    "/customers-info", tags=["customers"], status_code=201, description="Get customers info"
)
def get_customers_info():
    all_customer = session.exec(select(Customers)).all()
    geolocator = Nominatim(user_agent="customer_info")
    
    customer_info_list = [
        {
            "id": customer.id,
            "name": customer.name,
            "address": customer.address,
            "latitude": geolocator.geocode(customer.address).latitude,
            "longitude": geolocator.geocode(customer.address).longitude,
            "phone": customer.phone,
        }   
        for customer in all_customer
    ]


    return customer_info_list

@customer_routes.get(
    "/customers-locations", tags=["customers"], status_code=201, description="Get customers info"
)
def get_customers_location():
    customers_info = get_customers_info()

    counts = {}
    for customer in customers_info:
        latlong = (customer["latitude"], customer["longitude"])
        first_digits = tuple(str(coord).split(".")[0] for coord in latlong)
        if first_digits in counts:
            counts[first_digits] += 1
        else:
            counts[first_digits] = 1

    result = []
    for customer in customers_info:
        latlong = (customer["latitude"], customer["longitude"])
        first_digits = tuple(str(coord).split(".")[0] for coord in latlong)
        address = customer["address"]
        count = counts.get(first_digits, 0)
        lat = customer["latitude"]
        long = customer["longitude"]
        result.append({"address": address, "count": count, "lat": lat, "long": long})

    return result

