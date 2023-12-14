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
    role: str | None = None


class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    name: str
    price: int
    available: bool
    image: str


class FullItem(Item):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    name: str
    price: int
    description: str | None = None
    color: str | None = None
    aroma: str | None = None
    combination: str | None = None
    taste: str | None = None
    image: str
    available: bool

class AllItems(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: List[Item]

class Category(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    name: str

class Type(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    name: str
    category_id: int

class AllCategories(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    categories: List[Category]

class AllTypes(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    types: List[Type]

class CartItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    cart_id: int
    product_id: int
    name: str
    price: int
    quantity: int
    image: str

class Cart(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    cart_id: int
    items_count: int
    items: List[CartItem]
    items_price: int
    delivery_price: int
    total_price: int

class Country(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str

class AllCountries(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    countries: List[Country]

class BrewingType(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str

class AllBrewingTypes(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    brewing_types: List[BrewingType]

class Order(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    user_id: int
    total_price: int
    comment: str | None = None
    user_cash: int | None = None
    status: str | None = None

class OrderItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    product_name: str
    quantity: int
    price: int

class FullOrder(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    user_name: str
    user_phone: str
    user_email: str
    user_address: str
    total_price: int
    comment: str | None = None
    user_cash: int | None = None
    items: List[OrderItem]
