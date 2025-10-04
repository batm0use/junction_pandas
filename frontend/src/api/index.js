import axios from "axios";

/*
  Frontend API helper

  API_BASE: set via Vite env `VITE_API_BASE` or defaults to http://localhost:8000/api

  Endpoints used by the frontend (expected shapes):


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

/**
 * GET /api/health
 * Request: none
 * Response: object - health/status info from the server. Example: { status: 'ok' }
 * Notes: lightweight health check used by the frontend to verify the backend is reachable.
 */
export async function getHealth() {
  const res = await axios.get(`${API_BASE}/health`);
  return res.data;
}

/**
 * POST /api/assistant
 * Request: { message: string }
 *   - message: the user text to send to the assistant
 * Response (frontend expectation):
 *   - Preferred: { response: string }
 *   - Accepts: server may also return a plain string or other object with a text response
 * Example request body: { "message": "Hello" }
 * Example response: { "response": "I got the Hello" }
 */
export async function sendMessageToAssistant(message) {
  const res = await axios.post(`${API_BASE}/assistant`, { "message": message });
  return res.data;
}

// New API placeholders
/**
 * GET /api/my_location
 * Request: none
 * Response (frontend expectation):
 *   - { lat: number, lng: number }
 *   - Example: { "lat": 51.9995, "lng": 4.3625 }
 *   - May also return null/empty if server cannot determine a location
 */
export async function getMyLocation() {
  const res = await axios.get(`${API_BASE}/my_location`);
  return res.data;
}

/**
 * GET /api/nearby_places  (deprecated for the primary workflow)
 * Request: none
 * Response (frontend expectation): Array of place objects in flexible shapes. Examples supported:
 *   - { id, lat, lng, name }
 *   - { id, x, y, name }   (x -> lng, y -> lat)
 *   - Minimal coordinate tuple inside object (uncommon)
 * Example response: [{ "id": 1, "lat": 51.9991, "lng": 4.3620, "name": "Cafe" }]
 * Notes: prefer POST /api/nearby_places with client's location for more accurate results.
 */
export async function getNearbyPlaces() {
  const res = await axios.get(`${API_BASE}/nearby_places`);
  return res.data;
}

// Send current location to backend and receive nearby places
// Request: { lat: number, lng: number }
// Response: [{ id, lat, lng, name }, ...]
/**
 * POST /api/nearby_places
 * Request body: { lat: number, lng: number }
 *   - lat: latitude of the user's current location
 *   - lng: longitude of the user's current location
 * Response (frontend expectation): Array of nearby places, each with coordinates and a name. Preferred shape:
 *   - [{ id, lat, lng, name }, ...]
 * Example request body: { "lat": 51.9995, "lng": 4.3625 }
 * Example response: [ { "id": 101, "lat": 51.9996, "lng": 4.3626, "name": "Demo Spot" } ]
 */
export async function sendNearbyPlacesRequest(location){
  const res = await axios.post(`${API_BASE}/nearby_places`, location)
  return res.data
}

/**
 * GET /api/leaderboard
 * Request: none
 * Response: Array of leaderboard items: [ { id, name, score } ]
 * Example: [ { id: 1, name: 'Electra', score: 420 } ]
 */
export async function getLeaderboard() {
  const res = await axios.get(`${API_BASE}/leaderboard`);
  return res.data;
}

export default {
  getHealth,
  sendMessageToAssistant,
  getMyLocation,
  getNearbyPlaces,
  sendNearbyPlacesRequest,
  getLeaderboard,
};
