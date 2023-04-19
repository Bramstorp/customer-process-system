from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db.database import create_db_and_tables

from .routes.user import user_router
from .routes.configuration import configuration_router

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

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
