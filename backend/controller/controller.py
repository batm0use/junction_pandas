from database.query import position_by_id
from typing import Dict


def get_health() -> Dict[str, str]:
    """Return a simple health check response."""
    return {"status": "ok", "service": "backend"}


def greet_user(name: str) -> Dict[str, str]:
    """Return a greeting response for the given name (example logic placeholder)."""
    return {"message": f"Hello, {name}!"}


def find_position(id: str) -> Dict[str, int]:
    return {"position" : position_by_id(id)}
