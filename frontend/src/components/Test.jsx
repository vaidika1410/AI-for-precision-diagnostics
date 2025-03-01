import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/test.css"; 

const Test = () => {
  const [features, setFeatures] = useState({ age: "", glucose: "", insulin: "", bmi: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: Object.values(features).map(Number) }),
      });

      const data = await response.json();
      setLoading(false);

      // Navigate back to dashboard with prediction result
      navigate("/dashboard", { state: { prediction: data.prediction } });

    } catch (error) {
      console.error("Prediction Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="test-container">
      <h2>Run a New Test</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age: <input type="number" name="age" value={features.age} onChange={handleChange} required />
        </label>
        <label>
          Glucose Level: <input type="number" name="glucose" value={features.glucose} onChange={handleChange} required />
        </label>
        <label>
          Insulin Level: <input type="number" name="insulin" value={features.insulin} onChange={handleChange} required />
        </label>
        <label>
          BMI: <input type="number" name="bmi" value={features.bmi} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Processing..." : "Get Prediction"}</button>
      </form>
    </div>
  );
};

export default Test;
