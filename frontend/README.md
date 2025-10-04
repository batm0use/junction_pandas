Frontend (Vite + React)

Install and run:

cd frontend
npm install
npm run dev

Notes:
- Map uses react-leaflet. When running in the browser, Leaflet will request tiles from the OpenStreetMap tile server.
- API calls are pointed to http://localhost:8000/api by default. Set VITE_API_BASE to override.
