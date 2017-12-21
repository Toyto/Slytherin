from django.db import models


class ChatUser(models.Model):
    username = models.CharField(max_length=30, blank=False, unique=True)
    email = models.EmailField(max_length=30, blank=False)

    def __str__(self):
        return self.username


class Message(models.Model):
    text = models.TextField(blank=False)
    sender = models.ForeignKey(ChatUser)

