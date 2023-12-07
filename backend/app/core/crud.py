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

def check_if_user_admin(db: Session, user: response_schemas.User) -> bool:
    try:
        result = (
            db.query(db_models.UserRoles)
            .filter_by(
                user_id=user.id,
                role=db_models.Roles.admin,
            ).first()
        )
        return result is not None
    except NoResultFound:
        return False

def create_user(db: Session, user: request_schemas.UserCreate, cart_id: int = None) -> response_schemas.User:
    db_user = db_models.Users(
        email=user.email,
        phone=user.phone,
        address=user.address,
        username=user.username,
        hashed_password=get_password_hash(user.password),
    )
    if cart_id is not None:
        db_user.cart_id = cart_id
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
                db_models.Products.available.label("available"),
                db_models.Products.color.label("color"),
                db_models.Products.aroma.label("aroma"),
                db_models.Products.combination.label("combination"),
                db_models.Products.taste.label("taste"),
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

def get_all_items(db: Session, category_id: int = None, type_id: int = None, country_id: int = None) -> Union[response_schemas.AllItems, None]:
    # get all itmes with category_id, type_id, country_id
    try:
        return response_schemas.AllItems(
            items=[
                response_schemas.Item.model_validate(item)
                for item in db.query(
                    db_models.Products.id.label("id"),
                    db_models.Products.name.label("name"),
                    db_models.Products.price.label("price"),
                    db_models.Products.available.label("available"),
                    db_models.Products.image.label("image"),
                ).join(
                    db_models.ProductCategories,
                    db_models.ProductCategories.product_id == db_models.Products.id,
                ).join(
                    db_models.ProductTypes,
                    db_models.ProductTypes.product_id == db_models.Products.id,
                ).join(
                    db_models.ProductCountries,
                    db_models.ProductCountries.product_id == db_models.Products.id,
                ).filter(
                    db_models.ProductCategories.category_id == category_id if category_id is not None else True,
                    db_models.ProductTypes.type_id == type_id if type_id is not None else True,
                    db_models.ProductCountries.country_id == country_id if country_id is not None else True,
                ).all()
            ],
        )
    except NoResultFound:
        return None

def create_category(db: Session, category: request_schemas.CategoryCreate) -> response_schemas.Category:
    db_category = db_models.Categories(
        name=category.name,
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)

    db_category = response_schemas.Category(
        id=db_category.id,
        name=db_category.name,
    )

    log.info(f"Created category: {db_category}")
    return db_category

def category_update(db: Session, category: request_schemas.CategoryUpdate) -> Union[response_schemas.Category, None]:
    try:
        db_category = (
            db.query(db_models.Categories)
            .filter(
                db_models.Categories.id == category.id,
            )
            .one()
        )
        db_category.name = category.name
        db.commit()
        db.refresh(db_category)

        db_category = response_schemas.Category(
            id=db_category.id,
            name=db_category.name,
        )

        log.info(f"Updated category: {db_category}")
        return db_category
    except NoResultFound:
        return None

def del_category(db: Session, category_id: int) -> Union[response_schemas.Category, None]:
    try:
        db_category = (
            db.query(db_models.Categories)
            .filter(
                db_models.Categories.id == category_id,
            )
            .one()
        )
        db.delete(db_category)
        db.commit()

        db_category = response_schemas.Category(
            id=db_category.id,
            name=db_category.name,
        )

        log.info(f"Deleted category: {db_category}")
        return db_category
    except NoResultFound:
        return None

def create_type(db: Session, type: request_schemas.TypeCreate) -> response_schemas.Type:
    db_type = db_models.Types(
        name=type.name,
        category_id=type.category_id,
    )
    db.add(db_type)
    db.commit()
    db.refresh(db_type)

    db_type = response_schemas.Type(
        id=db_type.id,
        name=db_type.name,
        category_id=db_type.category_id,
    )

    log.info(f"Created type: {db_type}")
    return db_type

def type_update(db: Session, type: request_schemas.TypeUpdate) -> Union[response_schemas.Type, None]:
    try:
        db_type = (
            db.query(db_models.Types)
            .filter(
                db_models.Types.id == type.id,
            )
            .one()
        )
        db_type.name = type.name
        db_type.category_id = type.category_id
        db.commit()
        db.refresh(db_type)

        db_type = response_schemas.Type(
            id=db_type.id,
            name=db_type.name,
            category_id=db_type.category_id,
        )

        log.info(f"Updated type: {db_type}")
        return db_type
    except NoResultFound:
        return None

def del_type(db: Session, type_id: int) -> Union[response_schemas.Type, None]:
    try:
        db_type = (
            db.query(db_models.Types)
            .filter(
                db_models.Types.id == type_id,
            )
            .one()
        )
        db.delete(db_type)
        db.commit()

        db_type = response_schemas.Type(
            id=db_type.id,
            name=db_type.name,
            category_id=db_type.category_id,
        )

        log.info(f"Deleted type: {db_type}")
        return db_type
    except NoResultFound:
        return None

def get_all_categories(db: Session) -> Union[response_schemas.AllCategories, None]:
    try:
        return response_schemas.AllCategories(
            categories=[
                response_schemas.Category.model_validate(category)
                for category in db.query(
                    db_models.Categories.id.label("id"),
                    db_models.Categories.name.label("name"),
                ).all()
            ],
        )
    except NoResultFound:
        return None

def get_all_category_types(db: Session, category_id: int) -> Union[response_schemas.AllTypes, None]:
    try:
        return response_schemas.AllTypes(
            types=[
                response_schemas.Type.model_validate(type)
                for type in db.query(
                    db_models.Types.id.label("id"),
                    db_models.Types.name.label("name"),
                    db_models.Types.category_id.label("category_id"),
                ).filter(
                    db_models.Types.category_id == category_id,
                ).all()
            ],
        )
    except NoResultFound:
        return None

def get_all_countries(db: Session) -> Union[response_schemas.AllCountries, None]:
    try:
        return response_schemas.AllCountries(
            countries=[
                response_schemas.Country.model_validate(country)
                for country in db.query(
                    db_models.Countries.id.label("id"),
                    db_models.Countries.name.label("name"),
                ).all()
            ],
        )
    except NoResultFound:
        return None

def get_user_cart_id(db: Session, user_id: int) -> Union[int, None]:
    try:
        return db.query(db_models.Users).filter(
                db_models.Users.id == user_id,
            ).one().cart_id
    except NoResultFound:
        return None

def get_cart(db: Session, cart_id: int) -> Union[response_schemas.Cart, None]:
    try:
        return response_schemas.Cart(
            cart_id=cart_id,
            items=[
                response_schemas.CartItem.model_validate(cart_item)
                for cart_item in db.query(
                    db_models.CartItems.id.label("id"),
                    db_models.CartItems.cart_id.label("cart_id"),
                    db_models.CartItems.product_id.label("product_id"),
                    db_models.Products.name.label("name"),
                    db_models.Products.price.label("price"),
                    db_models.CartItems.quantity.label("quantity"),
                ).join(
                    db_models.Products,
                    db_models.Products.id == db_models.CartItems.product_id,
                ).filter(
                    db_models.CartItems.cart_id == cart_id,
                ).all()
            ],
            items_price=
                db.query(db_models.Cart)
                .filter(
                    db_models.Cart.id == cart_id,
                )
                .one().total_price,
            delivery_price=300,
            total_price=
                db.query(db_models.Cart)
                .filter(
                    db_models.Cart.id == cart_id,
                )
                .one().total_price + 300,
        )
    except NoResultFound:
        return None

def create_cart(db: Session, user_id: int = None) -> int:
    db_cart = db_models.Cart()
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)

    if user_id is not None:
        db_user = (
            db.query(db_models.Users)
            .filter(
                db_models.Users.id == user_id,
            )
            .one()
        )
        db_user.cart_id = db_cart.id
        db.commit()
        db.refresh(db_user)

    log.info(f"Created cart: {db_cart}")
    return db_cart.id

def add_to_cart(db: Session, cartItem: request_schemas.AddCartItem) -> Union[response_schemas.CartItem, None]:
    try:
        if (
            db.query(db_models.CartItems)
            .filter(
                db_models.CartItems.cart_id == cartItem.cart_id,
                db_models.CartItems.product_id == cartItem.product_id,
            )
            .first()
        ):
            return None
        db_cart_item = db_models.CartItems(
            cart_id=cartItem.cart_id,
            product_id=cartItem.product_id,
            quantity=cartItem.quantity,
        )
        db.add(db_cart_item)
        db.commit()
        db.refresh(db_cart_item)
        db_cart_item.cart.total_price += db_cart_item.product.price * db_cart_item.quantity
        db.commit()
        db.refresh(db_cart_item)

        cart_item = response_schemas.CartItem(
            id=db_cart_item.id,
            cart_id=db_cart_item.cart_id,
            product_id=db_cart_item.product_id,
            name=db_cart_item.product.name,
            price=db_cart_item.product.price,
            quantity=db_cart_item.quantity,
        )

        log.info(f"Added to cart: {cart_item}")
        return cart_item
    except NoResultFound:
        return None

def del_from_cart (db: Session, cart_item_id: int) -> Union[response_schemas.CartItem, None]:
    try:
        db_cart_item = (
            db.query(db_models.CartItems)
            .filter(
                db_models.CartItems.id == cart_item_id,
            )
            .one()
        )
        db_cart_item.cart.total_price -= db_cart_item.product.price * db_cart_item.quantity
        cart_item = response_schemas.CartItem(
            id=db_cart_item.id,
            cart_id=db_cart_item.cart_id,
            product_id=db_cart_item.product_id,
            name=db_cart_item.product.name,
            price=db_cart_item.product.price,
            quantity=db_cart_item.quantity,
        )
        db.delete(db_cart_item)
        db.commit()

        log.info(f"Deleted from cart: {cart_item}")
        return cart_item
    except NoResultFound:
        return None

def update_cart_item(db: Session, cart_item_id: int, cart_item: request_schemas.UpdateCartItem) -> Union[response_schemas.CartItem, None]:
    try:
        db_cart_item = (
            db.query(db_models.CartItems)
            .filter(
                db_models.CartItems.id == cart_item_id,
            )
            .one()
        )
        price_delta = db_cart_item.product.price * (cart_item.quantity - db_cart_item.quantity)
        db_cart_item.quantity = cart_item.quantity
        db_cart_item.cart.total_price += price_delta
        db.commit()
        db.refresh(db_cart_item)

        cart_item = response_schemas.CartItem(
            id=db_cart_item.id,
            cart_id=db_cart_item.cart_id,
            product_id=db_cart_item.product_id,
            name=db_cart_item.product.name,
            price=db_cart_item.product.price,
            quantity=db_cart_item.quantity,
        )

        log.info(f"Updated cart item: {cart_item}")
        return cart_item
    except NoResultFound:
        return None
