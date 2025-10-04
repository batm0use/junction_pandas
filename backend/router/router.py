from fastapi import APIRouter
from backend.controller.controller import get_health, greet_user, find_position, remaining_rides
from database.query import *
from pydantic import BaseModel


router = APIRouter(prefix="/api", tags=["api"])

class Item(BaseModel):
    message : str


@router.post("/assistant")
async def chat(message: Item):
    text = message.message
    reply = f"I got the {text}"
    return {"response": reply}

@router.get("/health")
async def health():
    return get_health()


@router.get("/my_location")
async def my_location():
    # Hardcoded demo location (Delft)
    return {"lat": 51.9995, "lng": 4.3625}


@router.get("/nearby_places")
async def nearby_places():
    # Hardcoded demo nearby points (lat/lng)
    return [
        {"id": 1, "lat": 51.9991, "lng": 4.3620, "name": "Cafe Delft"},
        {"id": 2, "lat": 51.9997, "lng": 4.3630, "name": "Delft Station"},
        {"id": 3, "lat": 51.9999, "lng": 4.3629, "name": "TU Delft"},
    ]


@router.get("/leaderboard")
async def leaderboard():
    # Hardcoded leaderboard sample
    return [
        {"id": 1, "name": "Alice", "score": 120},
        {"id": 2, "name": "Bob", "score": 110},
        {"id": 3, "name": "Carol", "score": 95},
    ]


@router.get("/greet/{name}")
async def greet(name: str):
    return greet_user(name)
 
@router.get("/position/{id}")
async def position(id: str):
    return find_position(id)

@router.get("/remaining/{id}")
async def rides_left(id: str):
    return remaining_rides(id)
