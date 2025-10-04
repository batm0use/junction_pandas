import axios from "axios";

/*
  Frontend API helper

  API_BASE: set via Vite env `VITE_API_BASE` or defaults to http://localhost:8000/api

  Endpoints used by the frontend (expected shapes):

  GET /api/health
    - Request: none
    - Response: { status: 'ok' }  (or any health object)

  POST /api/assistant
    - Request body: { message: string }
    - Response: { response: string }  OR a plain string

  GET /api/my_location
    - Request: none
    - Response (expected): { lat: number, lng: number }
      Example: { "lat": 51.9995, "lng": 4.3625 }
    - If server cannot provide location, it may return null or 204/empty.

  GET /api/nearby_places
    - Request: none (later we may include query params)
    - Response (expected): Array of places. Each place should contain coordinates and a name.
      Flexible shapes supported by the frontend mapper:
        - { id, lat, lng, name }
        - { id, x, y, name }  (x -> lng, y -> lat)
        - [lng, lat] tuple inside an object (less common)
      Example: [ { "id": 1, "lat": 51.9991, "lng": 4.3620, "name": "Cafe" } ]

  GET /api/leaderboard
    - Request: none
    - Response (expected): Array of leaderboard items:
      [ { id, name, score } ]

  Notes: The helpers below accept a few flexible shapes and normalize them where appropriate.
*/

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export async function getHealth() {
  const res = await axios.get(`${API_BASE}/health`);
  return res.data;
}

export async function sendMessageToAssistant(message) {
  // Request: { message: string }
  // Response: ideally { response: string } but server might return a plain string
  const res = await axios.post(`${API_BASE}/assistant`, { "message": message });
  return res.data;
}

// New API placeholders
export async function getMyLocation() {
  // Response expected: { lat: number, lng: number } or null
  // Example: { lat: 51.9995, lng: 4.3625 }
  const res = await axios.get(`${API_BASE}/my_location`);
  return res.data;
}

export async function getNearbyPlaces() {
  // Response expected: array of places. Supported shapes:
  //  - { id, lat, lng, name }
  //  - { id, x, y, name }  (frontend will map x->lng and y->lat)
  // Example: [ { id: 1, lat: 51.9991, lng: 4.3620, name: 'Cafe' } ]
  const res = await axios.get(`${API_BASE}/nearby_places`);
  return res.data;
}

export async function getLeaderboard() {
  // response: array like this: [ { id, name, score } ]
  const res = await axios.get(`${API_BASE}/leaderboard`);
  return res.data;
}

export default {
  getHealth,
  sendMessageToAssistant,
  getMyLocation,
  getNearbyPlaces,
};
