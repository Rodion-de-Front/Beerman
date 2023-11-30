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
    prefix="/items",
    tags=["items"],
)


# get all items with possible category and type filters
@router.get("/all", response_model=response_schemas.AllItems)
@cache(expire=settings.CACHE_EXPIRE)
async def get_all_items(
    category_id: int = None,
    type_id: int = None,
    db: Session = Depends(get_db),
):
    """
    Get all items
    """
    print(f"category_id: {category_id}, type_id: {type_id}")
    items = crud.get_all_items(db=db, category_id=category_id, type_id=type_id)

    if items is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No items found",
        )

    return items

@router.get("/categories", response_model=response_schemas.AllCategories)
@cache(expire=settings.CACHE_EXPIRE)
async def get_categories(
    db: Session = Depends(get_db),
):
    """
    Get all categories
    """
    categories = crud.get_all_categories(db=db)

    if categories is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No categories found",
        )

    return categories

@router.get("/category/{category_id}/types", response_model=response_schemas.AllTypes)
@cache(expire=settings.CACHE_EXPIRE)
def get_category_types(
    category_id: int,
    db: Session = Depends(get_db),
):
    """
    Get all types of a category
    """
    types = crud.get_all_category_types(db=db, category_id=category_id)

    if types is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No types found",
        )

    return types

@router.post("/create", response_model=None)
async def create_item(
    item: request_schemas.ItemCreate,
    current_user: response_schemas.User = Depends(get_current_active_admin),
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
    current_user: response_schemas.User = Depends(get_current_active_admin),
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
            detail="No item found",
        )


@router.put("/update", response_model=response_schemas.FullItem)
async def update_cam(
    item: request_schemas.ItemUpdate,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Update a post
    """
    return crud.item_update(db=db, item=item)
