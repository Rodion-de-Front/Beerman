from fastapi import APIRouter

from app.endpoints.auth import router as auth_router
from app.endpoints.items import router as items_router
from app.endpoints.cart import router as cart_router


router = APIRouter(
    prefix="/api",
    responses={404: {"description": "Not found"}},
)

router.include_router(auth_router)
router.include_router(items_router)
router.include_router(cart_router)
