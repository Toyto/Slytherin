import json
from .models import Message, ChatUser


def ws_message(message):
    # ASGI WebSocket packet-received and send-packet message types
    # both have a "text" key for their textual data.
    message_data = json.loads(message.content['text'])
    user = ChatUser.objects.get(username=message_data['username'])
    message_obj = Message.objects.create(sender=user, text=message_data['text'])
    message.reply_channel.send({
        "text": message_obj.text,
    })
