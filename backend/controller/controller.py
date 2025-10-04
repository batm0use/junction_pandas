from database.query import position_by_id, what_you_need
from database.distances_calculation import nearest_merchants
from typing import Dict

PERCENTAGE = 0.25

def find_position(id: str) -> Dict[str, int]:
    return {"position" : position_by_id(id)}

def remaining_rides(id: str) -> Dict[str, int]:
    return {"remaining" : what_you_need(id, PERCENTAGE)}


def nearby_locations(lat: float, lng: float, count: int = 3):
    """Return a small list of demo nearby points around the provided lat/lng.
    This is intentionally simple and deterministic for testing.
    """
    list_merchants = nearest_merchants(lat, lng)
    # (id, float)

    # create small offsets (roughly ~100m per 0.001 degree) around the point
    offsets = [(-0.001, -0.001), (0.0, 0.001), (0.001, 0.0)]
    results = []
    for i, (dy, dx) in enumerate(offsets[:count], start=1):
        results.append({
            "id": i,
            "lat": round(lat + dy, 7),
            "lng": round(lng + dx, 7),
            "name": f"Nearby {i}"
        })
    return results
