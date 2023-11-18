from typing import Optional, List, Dict, Union
from pydantic import BaseModel, Field, EmailStr, validator, ConfigDict
from decimal import Decimal


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    phone: str
    address: str


class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    name: str
    price: int
    available: bool


class FullItem(Item):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    name: str
    price: int
    description: str
    image: str

class AllItems(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[Item]

class ShoppingCartItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    product_id: int
    name: str
    price: int
    quantity: int

class ShoppingCart(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[ShoppingCartItem]
    total_price: int
