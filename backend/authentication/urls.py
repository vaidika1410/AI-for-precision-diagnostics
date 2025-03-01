from django.urls import path
from .views import signup_view  # Import your signup view
from .views import login_view

urlpatterns = [
    path("signup/", signup_view, name="signup"),  # Define the signup endpoint
    path("login/", login_view, name="login")
]

