import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ChatUser, Message


@csrf_exempt
def create_new_user(request):
    user_data = json.loads(request.body)
    ChatUser.objects.create(
        username=user_data.get('name'), email=user_data.get('email')
    )
    return JsonResponse({'success': True})


def messages(request):
    messages_data = []
    for m in Message.objects.all():
        messages_data.append({'user': m.sender.username, 'text': m.text})
    return JsonResponse({'messages': messages_data})
