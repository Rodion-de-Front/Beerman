from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks

from sqlalchemy.orm import Session

from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.config import settings
from app.utils.token import get_current_active_user, get_current_soft_client
import asyncio
import os

router = APIRouter(
    prefix="/cart",
    tags=["cart"],
)

@router.get("/all", response_model=response_schemas.Cart)
async def get_cart(
    db: Session = Depends(get_db),
    user: response_schemas.User = Depends(get_current_soft_client),
    cart_id: int = None,
):
    """
    Get cart
    """
    if user is None and cart_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No cart details provided",
        )
    if user is not None and cart_id is None:
        cart_id = crud.get_user_cart_id(db=db, user_id=user.id)
        if cart_id is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No cart found",
            )
    cart = crud.get_cart(db=db, cart_id=cart_id)

    if cart is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No cart found",
        )

    return cart

@router.post("/add", response_model=response_schemas.CartItem)
async def add_to_cart(
    cartItem: request_schemas.AddCartItem,
    db: Session = Depends(get_db),
    user: response_schemas.User = Depends(get_current_soft_client),
):
    """
    Add to cart
    """
    if user is not None:
        cartItem.cart_id = crud.get_user_cart_id(db=db, user_id=user.id)
        if cartItem.cart_id is None:
            cartItem.cart_id = crud.create_cart(db=db, user_id=user.id)
    elif cartItem.cart_id is None:
        cartItem.cart_id = crud.create_cart(db=db)
    cart_item = crud.add_to_cart(db=db, cartItem=cartItem)

    if cart_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not add to cart",
        )

    return cart_item

@router.delete("/delete/{cart_item_id}", response_model=response_schemas.CartItem)
async def delete_from_cart(
    cart_item_id: int,
    db: Session = Depends(get_db),
    user: response_schemas.User = Depends(get_current_soft_client),
):
    """
    Delete from cart
    """
    cart_item = crud.del_from_cart(db=db, cart_item_id=cart_item_id)

    if cart_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not delete from cart",
        )

    return cart_item

@router.put("/update/{cart_item_id}", response_model=response_schemas.CartItem)
async def update_cart_item(
    cart_item_id: int,
    cartItem: request_schemas.UpdateCartItem,
    db: Session = Depends(get_db),
    user: response_schemas.User = Depends(get_current_soft_client),
):
    """
    Update cart item
    """
    cart_item = crud.update_cart_item(db=db, cart_item_id=cart_item_id, cart_item=cartItem)

    if cart_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not update cart item",
        )

    return cart_item
