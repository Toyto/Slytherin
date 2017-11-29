from django.contrib import admin
from core.models import User, Message


class UserAdmin(admin.ModelAdmin):
    list_diplay = ['name', 'email']


class MessageAdmin(admin.ModelAdmin):
    list_diplay = ['text', 'sender']


admin.site.register(User, UserAdmin)
admin.site.register(Message, MessageAdmin)
