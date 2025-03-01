import React, { useState } from "react";
import axios from "axios";
import "../styles/testpage.css";

const TestPage = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const [testResult, setTestResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict-diabetes/", formData);
      setTestResult(response.data.result);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  // Set color based on result
  const resultColor = testResult === "High Risk" ? "#dc3545" : "#28a745"; // Red for High Risk, Green for Normal

  return (
    <div className="test-container">
      <div className="test-box">
        <h2>Diabetes Prediction Test</h2>
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          {Object.keys(formData).map((key) => (
            <div className="input-group" key={key}>
              <label>{key.replace(/([A-Z])/g, " $1")}</label>
              <input type="number" name={key} value={formData[key]} onChange={handleChange} required />
            </div>
          ))}

          <button type="submit" className="submit-btn">🔍 Run New Test</button>
        </form>

        {/* Show the result with color */}
        {testResult && (
          <div>
          <h3 id="test-result">Test Result: </h3>
          <div className="test-result" style={{ color: resultColor, fontWeight: "bold", fontSize: "3vh", marginTop: "10px" }}>
            {testResult}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
