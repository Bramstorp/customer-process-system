from sqlmodel import SQLModel, create_engine, Session
import os

from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(DATABASE_URL)
session = Session(bind=engine)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)