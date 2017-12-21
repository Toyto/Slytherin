import json
from channels import Group
from .models import Message, ChatUser


def ws_message(message):
    # ASGI WebSocket packet-received and send-packet message types
    # both have a "text" key for their textual data.
    message_data = json.loads(message.content['text'])
    user = ChatUser.objects.get(username=message_data['username'])
    message_obj = Message.objects.create(sender=user, text=message_data['text'])
    Group('cozy_chat').send({
        "text": json.dumps({'text': message_obj.text, 'user': user.username}),
    })


def ws_connect(message):
    Group('cozy_chat').add(message.reply_channel)
    message.reply_channel.send({"accept": True})


def ws_disconnect(message):
    Group('cozy_chat').discard(message.reply_channel)
