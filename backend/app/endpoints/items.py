from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import CursorResult

from sqlalchemy.orm import Session

from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.config import settings
from app.utils.token import get_current_active_user

from fastapi_cache.decorator import cache

import time

router = APIRouter(
    prefix="/items",
    tags=["items"],
)


@router.get("/all", response_model=response_schemas.AllItems)
@cache(expire=settings.CACHE_EXPIRE)
async def get_items(
    db: Session = Depends(get_db),
):
    """
    Get all cams
    """
    items = crud.get_all_items(db=db)

    if items is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No items found",
        )

    return items


@router.post("/create", response_model=None)
async def create_item(
    item: request_schemas.ItemCreate,
    current_user: response_schemas.User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """
    Create a post
    """
    return crud.create_item(db=db, item=item)


@router.get("/get/{item_id}", response_model=response_schemas.FullItem)
async def get_cam(
    item_id: int,
    db: Session = Depends(get_db),
):
    """
    Get a post
    """
    item = crud.get_item(db=db, item_id=item_id)

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )

    return item

@router.delete("/delete/{item_id}", response_model=response_schemas.Item)
async def delete_item(
    item_id: int,
    current_user: response_schemas.User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """
    Delete a post
    """
    deleting_op = crud.del_item(
        db=db,
        item_id=item_id
    )

    if deleting_op is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No cam found",
        )


@router.put("/update", response_model=response_schemas.FullItem)
async def update_cam(
    item: request_schemas.ItemUpdate,
    current_user: response_schemas.User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """
    Update a post
    """
    return crud.item_update(db=db, item=item)
