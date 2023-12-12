from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy import CursorResult

from sqlalchemy.orm import Session

from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.config import settings
from app.utils.token import get_current_active_user, get_current_active_admin

from fastapi_cache.decorator import cache
from typing import List

import time

router = APIRouter(
    prefix="/items",
    tags=["items"],
)


# get all items with possible category and type filters
@router.get("/all", response_model=response_schemas.AllItems)
@cache(expire=settings.CACHE_EXPIRE)
async def get_all_items(
    category_ids: List[int] = Query(None),
    brewing_type_ids: List[int] = Query(None),
    type_ids: List[int] = Query(None),
    country_ids: List[int] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get all items
    """
    print(f"category_id: {category_ids}, type_id: {type_ids}, country_id: {country_ids}, brewing_type_id: {brewing_type_ids}")
    items = crud.get_all_items(db=db, category_ids=category_ids, type_ids=type_ids, country_ids=country_ids, brewing_type_ids=brewing_type_ids)

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

@router.post("/category/create", response_model=response_schemas.Category)
async def create_category(
    category: request_schemas.CategoryCreate,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Create a category
    """
    return crud.create_category(db=db, category=category)

@router.delete("/category/{category_id}", response_model=response_schemas.Category)
async def delete_category(
    category_id: int,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Delete a category
    """
    deleting_op = crud.del_category(
        db=db,
        category_id=category_id
    )

    if deleting_op is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No category found",
        )

@router.put("/category/{category_id}", response_model=response_schemas.Category)
async def update_category(
    category_id: int,
    category: request_schemas.CategoryUpdate,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Update a category
    """
    result = crud.category_update(
        db=db,
        category_id=category_id,
        category=category
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No category found",
        )
    return result

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

@router.post("/type/create", response_model=response_schemas.Type)
async def create_type(
    type: request_schemas.TypeCreate,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Create a type
    """
    return crud.create_type(db=db, type=type)

@router.delete("/type/{type_id}", response_model=response_schemas.Type)
async def delete_type(
    type_id: int,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Delete a type
    """
    deleting_op = crud.del_type(
        db=db,
        type_id=type_id
    )

    if deleting_op is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No type found",
        )

@router.put("/type/{type_id}", response_model=response_schemas.Type)
async def update_type(
    type_id: int,
    type: request_schemas.TypeUpdate,
    current_user: response_schemas.User = Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    """
    Update a type
    """
    result = crud.type_update(
        db=db,
        type_id=type_id,
        type=type
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No type found",
        )
    return result

@router.get("/countries", response_model=response_schemas.AllCountries)
@cache(expire=settings.CACHE_EXPIRE)
async def get_countries(
    db: Session = Depends(get_db),
):
    """
    Get all countries
    """
    countries = crud.get_all_countries(db=db)

    if countries is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No countries found",
        )

    return countries

@router.get("/brewing_types", response_model=response_schemas.AllBrewingTypes)
@cache(expire=settings.CACHE_EXPIRE)
async def get_brewing_types(
    db: Session = Depends(get_db),
):
    """
    Get all brewing types
    """
    brewing_types = crud.get_all_brewing_types(db=db)

    if brewing_types is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No brewing types found",
        )

    return brewing_types

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
