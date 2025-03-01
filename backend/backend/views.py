import numpy as np
import os
import joblib
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Get the absolute path to the model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  
MODEL_PATH = os.path.join(BASE_DIR, 'auth_app', 'logistic_regression_model.pkl')

# Load the model if it exists
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully!")
    print(f"✅ Model saved at: {MODEL_PATH}")
else:
    model = None  
    print("⚠️ Warning: Diabetes model not found!")

# Test API Endpoints
def signup_view(request):
    return JsonResponse({"message": "Signup endpoint working!"})

def login_view(request):
    return JsonResponse({"message": "Login endpoint working!"})

def home_view(request):
    return JsonResponse({"message": "Welcome to AI Precision Diagnostics Backend!"})

# Diabetes Prediction API
@api_view(["POST"])
def predict_diabetes(request):
    if model is None:
        return JsonResponse({"error": "Diabetes model not found on the server."}, status=500)

    try:
        data = request.data  

        # Validate and convert inputs
        try:
            features = np.array([
                float(data.get("pregnancies", 0)),
                float(data.get("glucose", 0)),
                float(data.get("bloodPressure", 0)),
                float(data.get("skinThickness", 0)),
                float(data.get("insulin", 0)),
                float(data.get("bmi", 0)),
                float(data.get("diabetesPedigree", 0)),
                float(data.get("age", 0)),
            ]).reshape(1, -1)
        except ValueError:
            return JsonResponse({"error": "Invalid input. Please enter numeric values."}, status=400)

        # Make a prediction
        prediction = model.predict(features)[0]
        result = "High Risk" if prediction == 1 else "Normal"

        return JsonResponse({"result": result})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
