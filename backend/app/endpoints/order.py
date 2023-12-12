from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import CursorResult

from sqlalchemy.orm import Session

from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.config import settings
from app.utils.token import get_current_active_user, get_current_active_admin

from fastapi_cache.decorator import cache

import time

router = APIRouter(
    prefix="/order",
    tags=["orders"],
)

# create order
@router.post("/create", response_model=response_schemas.Order)
async def create_order(
    order: request_schemas.CreateOrder,
    db: Session = Depends(get_db),
    current_user: response_schemas.User = Depends(get_current_active_user),
):
    """
    Create order
    """
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not authorized",
        )

    cart_id = crud.get_user_cart_id(db=db, user_id=current_user.id)

    if cart_id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found",
        )

    return crud.create_order(db=db, order=order, current_user_id=current_user.id, cart_id=cart_id)