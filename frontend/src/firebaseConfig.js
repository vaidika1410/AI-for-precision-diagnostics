// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Ensure this is correctly imported

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq3D9vohlxIl5aNLgIZAtRo6LDujpJsaw",
  authDomain: "AI for precision diagnostics",
  projectId: "ai-for-precision-diagnostics",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Export the Firebase Auth instance

export { auth }; // Export `auth` correctly
