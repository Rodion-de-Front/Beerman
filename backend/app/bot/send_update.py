import telegram
from telegram.constants import ParseMode
from app.config import settings

TOKEN = settings.TELEGRAM_BOT_TOKEN
CHAT_ID = settings.TELEGRAM_BOT_CHAT_ID

async def send_update(message: str):
    return await telegram.Bot(token=TOKEN).send_message(chat_id=CHAT_ID, text=message, parse_mode=ParseMode.MARKDOWN)