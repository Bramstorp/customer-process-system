from sqlmodel import Session, select

from app.db.database import engine
from app.models.user import Users


def select_all_users():
    with Session(engine) as session:
        statement = select(Users)
        res = session.exec(statement).all()
        return res


def find_user(name):
    with Session(engine) as session:
        statement = select(Users).where(Users.username == name)
        return session.exec(statement).first()
