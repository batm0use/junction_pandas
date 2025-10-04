from fastapi import FastAPI
from router import *
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import Request

app = FastAPI(title="Backend API")

# Mount the frontend build (Vite -> dist) at root if present. This lets the SPA handle client-side routes.
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"

# Include API routes first so they take precedence over static files mounted at '/'
app.include_router(router)

if FRONTEND_DIST.exists():
    # Mount static assets so files like /assets/xxx.js are served directly
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")

    # Explicitly serve index.html only at the root path '/'. Other paths (e.g. /api/...) will be
    # handled by FastAPI routes; unknown paths will return 404 instead of the SPA.
    @app.get("/", include_in_schema=False)
    async def serve_index():
        index = FRONTEND_DIST / "index.html"
        return FileResponse(index)


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
