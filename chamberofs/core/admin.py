from django.contrib import admin
from core.models import ChatUser, Message


class ChatUserAdmin(admin.ModelAdmin):
    list_diplay = ['username', 'email']


class MessageAdmin(admin.ModelAdmin):
    list_diplay = ['text', 'sender']


admin.site.register(ChatUser, ChatUserAdmin)
admin.site.register(Message, MessageAdmin)
