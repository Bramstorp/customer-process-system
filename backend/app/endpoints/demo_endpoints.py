from fastapi import APIRouter
import random
import string
import json
from datetime import datetime

demo_routes = APIRouter()


@demo_routes.get(f"/api/test", tags=["demo"], status_code=201, description="demo api")
def demo():
    return {"hello": "world"}


@demo_routes.get(
    "/api/test/order/{order_id}", tags=["demo"], status_code=201, description="demo api"
)
def demo_order(order_id):
    orderstate = random.choice(["ordered", "processing", "shipped", "delivered"])
    orderdata = datetime.now().isoformat()

    customer_id = random.randint(1, 1000)
    customer_name = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 15))
    )
    customer_email = (
        "".join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))
        + "@"
        + "".join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))
        + ".com"
    )
    customer_address = "".join(
        random.choices(
            string.ascii_uppercase + string.ascii_lowercase, k=random.randint(10, 20)
        )
    )
    customer_zipcode = random.randint(1000, 9999)
    customer_city = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 10))
    )
    customer_country = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 10))
    )
    customer_phone = "".join(random.choices(string.digits, k=8))

    customer = {
        "id": customer_id,
        "name": customer_name,
        "email": customer_email,
        "address": customer_address,
        "zipcode": customer_zipcode,
        "city": customer_city,
        "country": customer_country,
        "phone": customer_phone,
    }
    order = {
        "orderstate": orderstate,
        "ordertype": "click-and-collect" if (int(order_id) % 2) == 0 else orderstate,
        "orderdata": orderdata,
        "total_price": random.randint(1, 100000),
        "currency": "DKK",
        "customer": customer,
        "id": order_id,
    }
    return order

@demo_routes.get(
    "/api/test/customer", tags=["demo"], status_code=201, description="demo api"
)
def demo_order():
    customer_id = random.randint(1, 1000)
    customer_name = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 15))
    )
    customer_email = (
        "".join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))
        + "@"
        + "".join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))
        + ".com"
    )
    customer_address = "".join(
        random.choices(
            string.ascii_uppercase + string.ascii_lowercase, k=random.randint(10, 20)
        )
    )
    customer_zipcode = random.randint(1000, 9999)
    customer_city = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 10))
    )
    customer_country = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 10))
    )
    customer_phone = "".join(random.choices(string.digits, k=8))

    customer = {
        "id": customer_id,
        "name": customer_name,
        "email": customer_email,
        "address": customer_address,
        "zipcode": customer_zipcode,
        "city": customer_city,
        "country": customer_country,
        "phone": customer_phone,
    }
    return customer


@demo_routes.get(
    "/api/test/customers", tags=["demo"], status_code=201, description="demo api"
)
def demo_customers():
    customer_id = random.randint(1, 1000)
    customer_name = "".join(
        random.choices(string.ascii_uppercase, k=random.randint(5, 15))
    )
    customer_email = (
        "".join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))
        + "@"
        + "".join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))
        + ".com"
    )
    customer = [{
        "id": customer_id,
        "name": customer_name,
        "email": customer_email,
        "address": "spættevej 35",
        "zipcode": "8210",
        "city": "aarhus v",
        "country": "denmark",
        "phone": "12341234",
    }]
    return customer 

@demo_routes.get(
    "/api/test/order", tags=["demo"], status_code=201, description="demo api"
)
def demo_orders():
    return "order_id"
