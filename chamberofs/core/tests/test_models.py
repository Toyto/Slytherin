from django.test import TestCase
from core.models import User, Message


class TestUser(TestCase):

    def test_creation(self):
        User.objects.create(username='Andrew', email='me@gmail.com')
        self.assertEqual(User.objects.count(), 1)

    def test_deletion(self):
        user = User.objects.create(username='Andrew', email='me@gmail.com')
        self.assertEqual(User.objects.count(), 1)
        user.delete()
        self.assertEqual(User.objects.count(), 0)


class TestMessage(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='Paul', email='paul@gmail.com'
        )

    def test_creation(self):
        message = Message.objects.create(
            sender=self.user, text='Hello Everybody!'
        )
        self.assertEqual(message.text, 'Hello Everybody!')

    def test_deletion(self):
        message = Message.objects.create(
            sender=self.user, text='Hello Everybody!'
        )
        self.assertEqual(message.text, 'Hello Everybody!')
        message.delete()
        self.assertEqual(Message.objects.count(), 0)
