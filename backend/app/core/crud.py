from sqlalchemy import update
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound

from typing import Union

from app.models import db_models, models
from app.schemas import response_schemas, request_schemas
from app.config import log
from app.utils.token import get_password_hash


def get_user(db: Session, email: Union[str, None]) -> Union[models.UserInDB, None]:
    try:
        return models.UserInDB.model_validate(
            db.query(
                db_models.Users.id.label("id"),
                db_models.Users.username.label("username"),
                db_models.Users.email.label("email"),
                db_models.Users.phone.label("phone"),
                db_models.Users.address.label("address"),
                db_models.Users.hashed_password.label("hashed_password"),
            )
            .filter(
                db_models.Users.email == email,
            )
            .one()
        )
    except NoResultFound:
        return None

def create_user(db: Session, user: request_schemas.UserCreate) -> response_schemas.User:
    db_user = db_models.Users(
        email=user.email,
        phone=user.phone,
        address=user.address,
        username=user.username,
        hashed_password=get_password_hash(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_user = response_schemas.User.model_validate(db_user)

    log.info(f"Created user: {db_user}")
    return db_user

def user_update(db: Session,
                user: request_schemas.UserUpdate,
                current_user: response_schemas.User
                ) -> Union[response_schemas.User, None]:
    try:
        db_user = (
            db.query(db_models.Users)
            .filter(
                db_models.Users.id == current_user.id,
            )
            .one()
        )
        if user.email:
            db_user.email = user.email
        if user.phone:
            db_user.phone = user.phone
        if user.address:
            db_user.address = user.address
        if user.username:
            db_user.username = user.username
        if user.password:
            db_user.hashed_password = get_password_hash(user.password)
        db.commit()
        db.refresh(db_user)

        db_user = response_schemas.User.model_validate(db_user)

        log.info(f"Updated user {db_user}")
        return db_user

    except NoResultFound:
        return None

def create_item(db: Session, item: request_schemas.ItemCreate) -> response_schemas.Item:
    db_item = db_models.Products(
        name=item.name,
        price=item.price,
        description=item.description,
        image=item.image,
        available=item.available,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    db_item = response_schemas.Item.model_validate(db_item)

    log.info(f"Created item: {db_item}")
    return db_item

def get_item(db: Session, item_id: int) -> Union[response_schemas.FullItem, None]:
    try:
        return response_schemas.FullItem.model_validate(
            db.query(
                db_models.Products.id.label("id"),
                db_models.Products.name.label("name"),
                db_models.Products.price.label("price"),
                db_models.Products.description.label("description"),
                db_models.Products.image.label("image"),
            )
            .filter(
                db_models.Products.id == item_id,
            )
            .one()
        )
    except NoResultFound:
        return None

def del_item(db: Session, item_id: int) -> Union[response_schemas.Item, None]:
    try:
        db_item = (
            db.query(db_models.Products)
            .filter(
                db_models.Products.id == item_id,
            )
            .one()
        )
        db.delete(db_item)
        db.commit()

        db_item = response_schemas.Item.model_validate(db_item)

        log.info(f"Deleted item {db_item}")
        return db_item
    except NoResultFound:
        return None

def item_update(db: Session, item: request_schemas.ItemUpdate) -> Union[response_schemas.Item, None]:
    try:
        db_item = (
            db.query(db_models.Products)
            .filter(
                db_models.Products.id == item.id,
            )
            .one()
        )
        db_item.name = item.name
        db_item.price = item.price
        db_item.description = item.description
        db_item.image = item.image
        db_item.available = item.available
        db.commit()
        db.refresh(db_item)

        db_item = response_schemas.Item.model_validate(db_item)

        log.info(f"Updated item {db_item}")
        return db_item
    except NoResultFound:
        return None

def get_all_items(db: Session) -> Union[response_schemas.AllItems, None]:
    try:
        return response_schemas.AllItems(
            items=[
                response_schemas.Item.model_validate(item)
                for item in db.query(
                    db_models.Products.id.label("id"),
                    db_models.Products.name.label("name"),
                    db_models.Products.price.label("price"),
                    db_models.Products.available.label("available"),
                    db_models.Products.image.label("image")
                ).all()
            ],
        )
    except NoResultFound:
        return None
