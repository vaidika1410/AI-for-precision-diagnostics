from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .views import home_view 
from .views import signup_view, login_view, home_view, predict_diabetes
from django.urls import path
from backend.views import predict_diabetes  # Import the view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("authentication.urls")),  # ✅ Ensure authentication/urls.py exists
    path("", home_view, name="home"),
    path('auth/', include('auth_app.urls')),
    path("signup/", signup_view, name="signup"),
    path("login/", login_view, name="login"),
    path("predict-diabetes/", predict_diabetes, name="predict_diabetes"),
]


@csrf_exempt  # Disable CSRF for testing (Enable it properly in production)
def api_handler(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Get JSON data
            return JsonResponse({"message": "POST request received", "data": data}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"message": "Welcome to AI Precision Diagnostics Backend!"})
