from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from api import router


def build_app() -> FastAPI:
    app = FastAPI(
        title=settings.app.TITLE,
        version=settings.app.VERSION,
        description=settings.app.DESCRIPTION,
        **settings.app.swagger_kwargs,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:6970",
            "http://127.0.0.1:6970",
            "*"
        ],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["*"],
        expose_headers=["*"],
    )

    return app


app: FastAPI = build_app()
app.include_router(router)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(
        'main:app',
        host=settings.app.HOST,
        port=settings.app.PORT,
        reload=settings.app.RELOAD,
        workers=settings.app.WORKERS,
        log_level=settings.app.LOG_LEVEL,
    )
