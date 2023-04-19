from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = 'postgresql://customer_process_system_dev:customer_process_system_dev@db/customer_process_system_db'

engine = create_engine(DATABASE_URL)
session = Session(bind=engine)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)