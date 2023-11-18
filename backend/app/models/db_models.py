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
    hashed_password = Column(String(100), nullable=False)
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
    items = relationship("OrderItems", backref="order", lazy="joined")

class OrderItems(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    __table_args__ = (
        UniqueConstraint("order_id", "product_id", name="unique_product_id_for_order"),
    )

class Cart(Base):
    __tablename__ = "cart"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_price = Column(Numeric(10,2), nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    items = relationship("CartItems", backref="cart", lazy="joined")
    __table_args__ = (
        UniqueConstraint("user_id", "id", name="unique_user_id_for_cart"),
    )

class CartItems(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("cart.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    __table_args__ = (
        UniqueConstraint("cart_id", "product_id", name="unique_product_id_for_cart"),
    )