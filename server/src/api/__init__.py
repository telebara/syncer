from fastapi import APIRouter

from .auth import router as auth_router
from .tags import router as tags_router
from .cards import router as cards_router
from .user import router as user_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(tags_router)
router.include_router(cards_router)
router.include_router(user_router)
