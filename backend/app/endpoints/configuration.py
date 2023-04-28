from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from fastapi.encoders import jsonable_encoder

from app.db.database import session
from app.models.configuration import Configuration, ConfigurationUpdate, ConfigurationRead, ConfigurationCreate, ConfigurationReadWithUser
from app.models.customer import Customers

from app.endpoints.user import auth_handler


from ..utils.email import send_email

configuration_router = APIRouter()

@configuration_router.post('/create-company', tags=['company'], status_code=201, description='Configure new company')
def create_company(config: ConfigurationCreate, user=Depends(auth_handler.get_current_user)):    
    if not user:
        return JSONResponse(content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED)
    
    created_config = Configuration(
        location=config.location, company_name=config.company_name, 
        company_user=user, company_user_id=user.id, api_endpoint=config.api_endpoint
    )
    session.add(created_config)
    session.commit()
    
    return config

@configuration_router.get('/company/{id}', response_model=ConfigurationReadWithUser, tags=['company'])
def get_company(id: int, user=Depends(auth_handler.get_current_user)):
    if not user:
        return JSONResponse(content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED)
    
    compnay = session.get(Configuration, id)
    if not compnay:
        return JSONResponse(content="Company not found", status_code=HTTP_404_NOT_FOUND)
    
    return compnay

@configuration_router.put('/company/{id}', response_model=Configuration, tags=['company'])
def update_company(id: int, user=Depends(auth_handler.get_current_user)):
    if not user:
        return JSONResponse(content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED)
    
    company_found = session.get(Configuration, id)
    if company_found.company_user_id != user.id:
        return JSONResponse(content="U dont have permision to update this company", status_code=HTTP_401_UNAUTHORIZED)
    
    session.add(**company_found.dict())    
    session.commit()
    return company_found

@configuration_router.delete('/company/{id}', status_code=HTTP_204_NO_CONTENT, tags=['company'])
def delete_company(id:int, user=Depends(auth_handler.get_current_user)):
    if not user:
        return JSONResponse(content="UNAUTHORIZED USER", status_code=HTTP_401_UNAUTHORIZED)
    
    company_found = session.get(Configuration, id)
    if company_found.company_user_id != user.id:
        return JSONResponse(content="U dont have permision to update this company", status_code=HTTP_401_UNAUTHORIZED)
    
    session.delete(company_found)
    session.commit()



@configuration_router.get('/email', tags=['Email'], status_code=201, description='Test email')
def test_email(company_id: int, customer_id: int):
    company = session.get(Configuration, company_id)
    customer = session.get(Customers, customer_id)
    send_email("retursag", 1, company.name, customer)
    return "Email sent"