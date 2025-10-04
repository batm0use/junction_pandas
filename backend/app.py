from fastapi import FastAPI
from router import *
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import Request

app = FastAPI(title="Backend API")

# Mount the frontend build (Vite -> dist) at root if present. This lets the SPA handle client-side routes.
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if FRONTEND_DIST.exists():
  app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")

app.include_router(router)


# SPA fallback: if a route wasn't matched by API or a static file, serve index.html so the client router can handle it.
@app.middleware("http")
async def spa_fallback(request: Request, call_next):
  response = await call_next(request)
  # If not found (404) and it's a GET for a page, return the SPA index
  if response.status_code == 404 and request.method == "GET" and FRONTEND_DIST.exists():
    index = FRONTEND_DIST / "index.html"
    if index.exists():
      return FileResponse(index)
  return response


def run(host: str = "127.0.0.1", port: int = 8000, reload: bool = True):
    """Run the uvicorn server hosting this FastAPI `app`.

    Usage:
      from backend.app import run
      run()
    """
    import uvicorn
    uvicorn.run("app:app", host=host, port=port, reload=reload)


if __name__ == "__main__":
    run()
