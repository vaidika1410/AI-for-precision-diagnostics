import joblib
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os

# Define the model path
MODEL_PATH = os.path.join(os.path.dirname(__file__), "logistic_regression_model.pkl")

# ✅ Debugging: Check if the model file exists
print("Model Path:", MODEL_PATH)
print("Does the model exist?", os.path.exists(MODEL_PATH))

# 🚨 Prevent crashing if the model is missing
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

# Load the trained model
model = joblib.load(MODEL_PATH)

@csrf_exempt
def predict(request):
    if request.method == "POST":
        try:
            # Parse input data
            data = json.loads(request.body)

            # ✅ Handle missing 'features' key
            if "features" not in data:
                return JsonResponse({"error": "Missing 'features' key in JSON"}, status=400)

            features = np.array(data["features"]).reshape(1, -1)  # Convert to NumPy array
            
            # Make prediction
            prediction = model.predict(features)[0]

            # Define output labels (adjust based on your model's output)
            outcome_map = {0: "Normal", 1: "Slight Risk", 2: "High Risk"}
            result = outcome_map.get(prediction, "Unknown")

            return JsonResponse({"prediction": result})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Send a POST request with 'features' data"})
