from fastapi import APIRouter


demo_routes = APIRouter()


@demo_routes.get(f'api/test', tags=['demo'], status_code=201, description='demo api')
def demo():
    return {"hello": "world"}