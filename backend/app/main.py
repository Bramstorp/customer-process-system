from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db.database import create_db_and_tables

from app.endpoints.user import user_router
from app.endpoints.configuration import configuration_router
from app.endpoints.rerturn_case import return_case_router
from app.endpoints.orders import order_routes
from app.endpoints.customer import customer_routes
from app.endpoints.click_and_collect import cnc_routes

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(configuration_router)
app.include_router(return_case_router)
app.include_router(order_routes)
app.include_router(customer_routes)
app.include_router(cnc_routes)

@app.get("/health")
async def is_alive():
    return "ok"

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
