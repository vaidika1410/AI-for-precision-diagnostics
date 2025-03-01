import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase
cred = credentials.Certificate("backend/firebase_config/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
