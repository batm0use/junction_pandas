from fastapi import APIRouter
from backend.controller.controller import get_health, greet_user, find_position, remaining_rides
from database.query import *


router = APIRouter(prefix="/api", tags=["api"])


@router.get("/health")
async def health():
    return get_health()


@router.get("/greet/{name}")
async def greet(name: str):
    return greet_user(name)
 
@router.get("/position/{id}")
async def position(id: str):
    return find_position(id)

@router.get("/remaining/{id}")
async def rides_left(id: str):
    return remaining_rides(id)
