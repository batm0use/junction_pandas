from fastapi import APIRouter
from backend.controller.controller import find_position, remaining_rides, nearby_locations, leaderboard_scores, \
    get_percentage
# keep router focused; controller and DB helpers are imported where needed
from pydantic import BaseModel
from backend.controller.ai import ask_ai
from backend.controller.reverse_geolocation import reverse_geocode
from backend.controller.tts_controller import process_tts

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
    reply = ask_ai(text)
    return {"response": reply}

from backend.controller.controller import get_leaderboard_summary

@router.get("/leaderboard-summary/{id}")
async def leaderboard_summary(id: str):
    # GET /api/leaderboard-summary/{id}
    # Request: path param 'id' (string)
    # Response: { "remaining": int, "percentile": int }
    return get_leaderboard_summary(id)


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


@router.post("/deliveries")
async def deliveries(payload: LocationPayload):
    # POST /api/deliveries
    # Server receives: { lat: float, lng: float }
    # Response: an array of delivery objects with eta and pickup/drop coordinates.
    # For now return a hardcoded/demo list using small offsets from the provided coords.
    base_lat = payload.lat
    base_lng = payload.lng
    demo = [
        {
            "id": 101,
            "name": "Bistro A",
            "eta_food": 12,
            "eta_arrive": 25,
            "lat_pickup": base_lat + 0.0012,
            "lng_pickup": base_lng + 0.0008,
            "lat_drop": base_lat - 0.0006,
            "lng_drop": base_lng + 0.0014,
            "extra_info": "Main square, left of the fountain"
        },
        {
            "id": 102,
            "name": "Sushi Place",
            "eta_food": 8,
            "eta_arrive": 18,
            "lat_pickup": base_lat + 0.0004,
            "lng_pickup": base_lng - 0.0011,
            "lat_drop": base_lat + 0.0009,
            "lng_drop": base_lng - 0.0003,
            "extra_info": "Apartment block B, intercom 203"
        },
        {
            "id": 103,
            "name": "Pizzeria",
            "eta_food": 20,
            "eta_arrive": 35,
            "lat_pickup": base_lat - 0.0010,
            "lng_pickup": base_lng - 0.0007,
            "lat_drop": base_lat - 0.0015,
            "lng_drop": base_lng + 0.0002,
            "extra_info": "Behind the bakery, call on arrival"
        }
    ]
    return demo


@router.get("/leaderboard")
async def leaderboard():
    # GET /api/leaderboard
    # Request: none
    # Response: Array of leaderboard items: [ { id, name, score } ]
    # Example response: [ { "id": 1, "name": "Electra", "score": 420 } ]
    scores = leaderboard_scores()
    data = [
        {"id": 1, "name": "Electra", "score": "x"},
        {"id": 2, "name": "Gian", "score": "x"},
        {"id": 3, "name": "Victor", "score": "x"},
        {"id": 4, "name": "Oleg", "score": "x"},
        {"id": 5, "name": "Kuba", "score": "x"},
    ]

    for d, s in zip(data, scores):
        d["score"] = s
    return data


@router.get("/position/{id}")
async def position(id: str):
    # GET /api/position/{id}
    # Request: path param 'id' (string)
    # Response: position info for the id (implementation-specific)
    return find_position(id)

@router.get("/percentile/{id}")
async def percentile(id: str):
    # GET /api/position/{id}
    # Request: path param 'id' (string)
    # Response: position info for the id (implementation-specific)
    return get_percentage(id)

@router.get("/remaining/{id}")
async def rides_left(id: str):
    # GET /api/remaining/{id}
    # Request: path param 'id' (string)
    # Response: remaining rides/count info for the id (implementation-specific)
    return remaining_rides(id)

@router.post("/tts")
async def generate_tts(text: Item):
    text = text.message
    reply = process_tts(text)
    return reply

@router.get("/reverse_geocode/{lat}/{lon}")
async def reverse_geocode_router(lat: float, lon: float):
    return reverse_geocode(lat, lon)
