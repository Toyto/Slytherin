from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30, blank=False, unique=True)
    email = models.EmailField(max_length=30, blank=False)


class Message(models.Model):
    text = models.TextField(blank=False)
    sender = models.ForeignKey(User)