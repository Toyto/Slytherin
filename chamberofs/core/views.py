import json
from django.http.response import JsonResponse
from .models import ChatUser


def create_new_user(request):
    user_data = request.GET
    ChatUser.objects.create(username=user_data.get('name'), email=user_data.get('email'))
    return JsonResponse({'success': True})