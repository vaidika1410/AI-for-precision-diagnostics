import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import firebase_admin
from firebase_admin import auth


def login_view(request):
    return JsonResponse({"message": "Login endpoint working!"})


def signup_view(request):
    return JsonResponse({"message": "Signup endpoint working!"})

@csrf_exempt  # Disable CSRF for simplicity
def signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Create user in Firebase
            user = auth.create_user(email=email, password=password)
            return JsonResponse({"message": "User created successfully", "uid": user.uid}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Firebase does not directly verify passwords on the backend, so this needs client-side Firebase SDK
            return JsonResponse({"message": "Use Firebase client SDK to log in"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)
