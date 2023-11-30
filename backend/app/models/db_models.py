from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Enum,
    UniqueConstraint,
    TEXT,
    Numeric,
    Boolean
)
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import relationship
import enum

Base = declarative_base()


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(12), nullable=False)
    address = Column(String(500), nullable=False)
    cart_id = Column(Integer, ForeignKey("cart.id"), nullable=True)
    hashed_password = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    orders = relationship("Orders", backref="user", lazy="joined")

class Roles(enum.Enum):
    client = "client"
    admin = "admin"

class UserRoles(Base):
    __tablename__ = "user_roles"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(Enum(Roles), default=Roles.client)
    created_at = Column(DateTime, default=datetime.now())

class Products(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(TEXT, nullable=False)
    image = Column(TEXT, nullable=False)
    available = Column(Boolean, nullable=False)
    created_at = Column(DateTime, default=datetime.now())

    cart_items = relationship("CartItems", backref="product", lazy="joined", cascade="all, delete-orphan")


class Categories(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    types = relationship("Types", backref="category", lazy="joined")

class ProductCategories(Base):
    __tablename__ = "product_categories"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    created_at = Column(DateTime, default=datetime.now())

class Types(Base):
    __tablename__ = "types"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    created_at = Column(DateTime, default=datetime.now())

class ProductTypes(Base):
    __tablename__ = "product_types"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    type_id = Column(Integer, ForeignKey("types.id"))
    created_at = Column(DateTime, default=datetime.now())

class OrderStatus(enum.Enum):
    pending = "pending"
    processing = "processing"
    packed = "packed"
    shipped = "shipped"
    completed = "completed"
    cancelled = "cancelled"

class Orders(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_price = Column(Numeric(10,2), nullable=False)
    comment = Column(TEXT, nullable=True)
    user_cash = Column(Numeric(10,2), nullable=True)
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    created_at = Column(DateTime, default=datetime.now())
    items = relationship("OrderItems", backref="order", lazy="joined", cascade="all, delete-orphan")

class OrderItems(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now())

class Cart(Base):
    __tablename__ = "cart"
    id = Column(Integer, primary_key=True)
    total_price = Column(Numeric(10,2), default=0)
    created_at = Column(DateTime, default=datetime.now())
    items = relationship("CartItems", backref="cart", lazy="joined", cascade="all, delete-orphan")
    user = relationship("Users", backref="cart", lazy="joined", single_parent=True)

class CartItems(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("cart.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now())