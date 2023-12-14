from app.schemas import response_schemas
from typing import List
from telegram.helpers import escape_markdown

def order_items_text(items: List[response_schemas.OrderItem]) -> str:
    # return string for MarkdownV2 telegram message
    result = ""
    for item in items:
        result += f"*{item.product_name}* - {item.price} руб. *x* {item.quantity} шт. = {item.price * item.quantity} руб.\n"
    return result

def change_text(user_cash: int, total_price: int) -> str:
    # return string for MarkdownV2 telegram message
    if user_cash is None:
        return ""
    return f"*Сдача:* {user_cash - total_price} руб.\n (c {user_cash} руб.)\n)"

def order_text(order: response_schemas.FullOrder) -> str:
    # return string for MarkdownV2 telegram message
    text = f"""*Новый заказ!*
Заказ *№{order.id}*
*Имя:* {order.user_name}
*Телефон:* {order.user_phone}
*Email:* {order.user_email}
*Адрес:* {order.user_address}

*Сумма заказа:* {order.total_price} руб.
*Комментарий:* {order.comment if order.comment else "нет"}
{change_text(order.user_cash, order.total_price)}

*Заказ:*
{order_items_text(order.items)}
"""
    return text