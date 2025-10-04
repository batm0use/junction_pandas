from fastapi import APIRouter
from controller.controller import get_health, greet_user
# TODO: import frontend here


router = APIRouter(prefix="/api", tags=["api"])


@router.get("/health")
async def health():
    return get_health()


@router.get("/greet/{name}")
async def greet(name: str):
    return greet_user(name)
