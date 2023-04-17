from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session

from .database import engine, create_db_and_tables
from .order.model import Orders

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/add-order/")
async def add_order(order: Orders):
    with Session(engine) as session:
        session.add(order)
        session.commit()
        session.refresh(order)
        
        return order
    
@app.get("/get-orders")
async def get_order():
    with Session(engine) as session:
        return session.query(Orders).all()

@app.get("/")
def read_root():
    return {"Hello": "World"}
