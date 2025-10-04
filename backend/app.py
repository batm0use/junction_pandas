from fastapi import FastAPI
from router import *

app = FastAPI(title="Backend API")

app.include_router(router)


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
