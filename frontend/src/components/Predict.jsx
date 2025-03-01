import React, { useState } from "react";

const Predict = () => {
  const [features, setFeatures] = useState(""); // User input for features
  const [predictionResult, setPredictionResult] = useState("");

  const sendPredictionRequest = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: [5.1, 3.5, 1.4, 0.2] }), // Replace with actual user input
      });

      const data = await response.json();
      console.log("Prediction:", data.prediction);
      setPredictionResult(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>AI Prediction</h2>
      <button onClick={sendPredictionRequest}>Get Prediction</button>
      {predictionResult && <p>Prediction: {predictionResult}</p>}
    </div>
  );
};

export default Predict;
