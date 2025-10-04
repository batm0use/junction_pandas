import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";


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
 * Deprecated compatibility helper
 * GET /api/my_location
 * Request: none
 * Response: { lat:number, lng:number }  or null
 */
export async function getMyLocation() {
  const res = await axios.get(`${API_BASE}/my_location`);
  return res.data;
}

/**
 * Deprecated compatibility helper
 * GET /api/nearby_places
 * Request: none
 * Response: array of places (see POST /api/nearby_places for preferred contract)
 */
export async function getNearbyPlaces() {
  const res = await axios.get(`${API_BASE}/nearby_places`);
  return res.data;
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
  sendMessageToAssistant,
  sendNearbyPlacesRequest,
  getLeaderboard,
};
