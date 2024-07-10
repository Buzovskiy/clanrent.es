from rest_framework import serializers
from telegram import Bot
from asgiref.sync import async_to_sync

from django.conf import settings


class CallBackSerializer(serializers.Serializer):
    phone_number = serializers.CharField()

    def send_notification(self):
        phone_number = self.validated_data.get('phone_number')
        bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
        text = f"*Callback request:* {phone_number}"
        async_to_sync(bot.send_message)(
            chat_id=settings.TELEGRAM_GROUP_CHAT_ID,
            text=text,
            parse_mode='markdown',
        )
