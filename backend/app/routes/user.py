from fastapi import APIRouter, HTTPException, Security, security, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_201_CREATED

from app.auth.auth import AuthHandler
from app.db.database import session
from app.models.user import UserInput, User, UserLogin
from app.crud.user import select_all_users, find_user

user_router = APIRouter()
auth_handler = AuthHandler()


@user_router.post('/signup', status_code=201, tags=['users'], description='Register new user')
def signup(user: UserInput):
    users = select_all_users()
    if any(x.username == user.username for x in users):
        raise HTTPException(status_code=400, detail='Username is taken')
    
    hashed_pwd = auth_handler.get_password_hash(user.password)
    created_user = User(username=user.username, password=hashed_pwd)
    session.add(created_user)
    session.commit()
    
    return JSONResponse(status_code=HTTP_201_CREATED)


@user_router.post('/login', tags=['users'])
def login(user: UserLogin):
    user_found = find_user(user.username)
    
    if not user_found:
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    verified = auth_handler.verify_password(user.password, user_found.password)
    
    if not verified:
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    token = auth_handler.encode_token(user_found.username)
    
    return {'token': token}


@user_router.get('/users/me', tags=['users'])
def get_current_user(user: User = Depends(auth_handler.get_current_user)):
    return user