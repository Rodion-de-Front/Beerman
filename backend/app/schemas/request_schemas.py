from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr, validator
from decimal import Decimal


class UserCreate(BaseModel):
    """
    User create schema
    """

    email: EmailStr
    password: str
    username: str
    phone: str
    address: str


class UserLogin(BaseModel):
    """
    User login schema
    """

    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    """
    User update schema
    """

    email: Optional[EmailStr]
    password: Optional[str]
    username: Optional[str]
    phone: Optional[str]
    address: Optional[str]

class ItemCreate(BaseModel):
    """
    Item (product) create schema
    """

    name: str
    price: int
    description: str
    image: str
    available: bool

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Product 1",
                    "price": 100,
                    "description": "Product 1 description",
                    "image": "base64 image",
                    "available": True,
                },
                {
                    "name": "Product 2",
                    "price": 200,
                    "description": "Product 2 description",
                    "image": "base64 image",
                    "available": False,
                },
            ]
        }
    }

class ItemUpdate(BaseModel):
    """
    Item (product) update schema
    """

    name: str
    price: int
    description: str
    image: str
    available: bool

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Product 1",
                    "price": 100,
                    "description": "Product 1 description",
                    "image": "base64 image",
                    "available": True,
                },
                {
                    "name": "Product 2",
                    "price": 200,
                    "description": "Product 2 description",
                    "image": "base64 image",
                    "available": False,
                },
            ]
        }
    }

class ReactionCreate(BaseModel):
    """
    Reaction create schema
    """

    post_id: int
    reaction_type: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {"post_id": 1, "reaction_type": "like"},
                {"post_id": 1, "reaction_type": "dislike"},
            ]
        }
    }


class ReactionDelete(BaseModel):
    post_id: int
