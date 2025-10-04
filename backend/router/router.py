from fastapi import APIRouter
from backend.controller.controller import get_health, greet_user, find_position, remaining_rides, nearby_locations
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


class LocationPayload(BaseModel):
    lat: float
    lng: float


@router.post("/nearby_places")
async def nearby_places(payload: LocationPayload):
    # Generate demo nearby points relative to provided lat/lng
    return nearby_locations(payload.lat, payload.lng, count=5)


@router.get("/nearby_places")
async def nearby_places_get():
    # Backwards-compatible GET that returns sample data.
    return [
        {"id": 1, "lat": 51.9991, "lng": 4.3620, "name": "Cafe Delft"},
        {"id": 2, "lat": 51.9997, "lng": 4.3630, "name": "Delft Station"},
        {"id": 3, "lat": 51.9999, "lng": 4.3629, "name": "Prostitutes"},
    ]


@router.get("/leaderboard")
async def leaderboard():
    # Hardcoded leaderboard sample
    return [
        {"id": 1, "name": "Electra", "score": 420},
        {"id": 2, "name": "Gian", "score": 69},
        {"id": 3, "name": "Victor", "score": 50},
        {"id": 4, "name": "Oleg", "score": 10},
        {"id": 5, "name": "Kuba", "score": -1},

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
