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
        allow_origins=settings.app.ALLOW_ORIGINS,
        allow_credentials=True,
        allow_methods=settings.app.ALLOW_METHODS,
        allow_headers=settings.app.ALLOW_HEADERS,
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
