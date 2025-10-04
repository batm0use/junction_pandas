from fastapi import APIRouter
from backend.controller.controller import get_health, greet_user, find_position, remaining_rides, nearby_locations
from database.query import *
from pydantic import BaseModel


router = APIRouter(prefix="/api", tags=["api"])

class Item(BaseModel):
    message : str


@router.post("/assistant")
async def chat(message: Item):
    # POST /api/assistant
    # Server receives: Item { message: str }
    # Server responds: { response: str }
    # Example request: { "message": "Hello" }
    # Example response: { "response": "I got the Hello" }
    text = message.message
    reply = f"I got the {text}"
    return {"response": reply}

@router.get("/health")
async def health():
    # GET /api/health
    # Request: none
    # Response: server health/status object. Example: { "status": "ok" }
    return get_health()


class LocationPayload(BaseModel):
    lat: float
    lng: float


@router.post("/nearby_places")
async def nearby_places(payload: LocationPayload):
    # POST /api/nearby_places
    # Server receives: { lat: float, lng: float }
    #   - lat/lng: client's current coordinates
    # Server responds: Array of place objects. Example:
    # [ { "id": 1, "lat": 51.9996, "lng": 4.3626, "name": "Spot 1" }, ... ]
    # This route generates demo points around the provided coordinates.
    return nearby_locations(payload.lat, payload.lng, count=5)


@router.get("/leaderboard")
async def leaderboard():
    # GET /api/leaderboard
    # Request: none
    # Response: Array of leaderboard items: [ { id, name, score } ]
    # Example response: [ { "id": 1, "name": "Electra", "score": 420 } ]
    return [
        {"id": 1, "name": "Electra", "score": 420},
        {"id": 2, "name": "Gian", "score": 69},
        {"id": 3, "name": "Victor", "score": 50},
        {"id": 4, "name": "Oleg", "score": 10},
        {"id": 5, "name": "Kuba", "score": -1},

    ]


@router.get("/greet/{name}")
async def greet(name: str):
    # GET /api/greet/{name}
    # Request: path param 'name' (string)
    # Response: a greeting string or object as produced by greet_user
    return greet_user(name)
 
@router.get("/position/{id}")
async def position(id: str):
    # GET /api/position/{id}
    # Request: path param 'id' (string)
    # Response: position info for the id (implementation-specific)
    return find_position(id)

@router.get("/remaining/{id}")
async def rides_left(id: str):
    # GET /api/remaining/{id}
    # Request: path param 'id' (string)
    # Response: remaining rides/count info for the id (implementation-specific)
    return remaining_rides(id)

