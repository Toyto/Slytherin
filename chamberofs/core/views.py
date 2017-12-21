import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ChatUser

@csrf_exempt
def create_new_user(request):
    user_data = json.loads(request.body)
    ChatUser.objects.create(username=user_data.get('name'), email=user_data.get('email'))
    return JsonResponse({'success': True})