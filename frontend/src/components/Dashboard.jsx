import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";  
import "../styles/dashboard.css"; 
import Chatbot from "./Chatbot"; 
import Predict from "./Predict";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [largeText, setLargeText] = useState(false);
  const [username, setUsername] = useState("");  
  const [lastTestResult, setLastTestResult] = useState("No recent test"); // Store last test result

  const navigate = useNavigate();  
  const auth = getAuth();  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email.split("@")[0]); 
      } else {
        navigate("/"); 
      }
    });

    return () => unsubscribe(); 
  }, [auth, navigate]);

  useEffect(() => {
    // Fetch last test result from local storage (or backend if needed)
    const savedResult = localStorage.getItem("lastTestResult");
    if (savedResult) setLastTestResult(savedResult);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/");  
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
      });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === "English" ? "Hindi" : "English");
  const toggleLargeText = () => setLargeText(!largeText);

  // Sample test reports data
  const testReports = [
    { id: 1, date: "01 Feb 2025", result: "Normal", file: "test-report-01.pdf" },
    { id: 2, date: "15 Jan 2025", result: "Slight Risk", file: "test-report-02.pdf" },
    { id: 3, date: "02 Dec 2024", result: "High Risk", file: "test-report-03.pdf" }
  ];

  const downloadReport = (fileName) => {
    const link = document.createElement("a");
    link.href = `/reports/${fileName}`;  
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""} ${largeText ? "large-text" : ""}`}>
      <div className="sidebar">
        <h2>Dashboard</h2>
        <button onClick={toggleDarkMode}>🌙 Light/Dark Mode</button>
        <button onClick={toggleLanguage}>🌐 {language}</button>
        <button onClick={toggleLargeText}>🔠 Larger Text</button>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="main-content">
        <h1>Welcome back, {username}!</h1>
        <p>Your last test result: <strong><span>{lastTestResult}</span></strong></p>

        {/* Download Previous Reports Section */}
        <div className="tests-section">
          <h3>Previous Test Reports</h3>
          <input type="text" placeholder="Search reports..." className="search-bar" />
          <button>🔍 Search</button>

          <div className="test-list">
            {testReports.map((report) => (
              <div key={report.id} className="report-item">
                <p>📝 {report.date} - {report.result}</p>
                <button onClick={() => downloadReport(report.file)}>⬇️ Download</button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Doctor Reports Section */}
        <div className="upload-section">
          <h3>Upload Doctor Reports</h3>
          <input type="file" accept=".pdf,.jpg,.png" />
          <button>⬆️ Upload</button>
        </div>


      </div>

      {/* Floating "Run New Test" Button */}
      <button id="run-test-btn" onClick={() => navigate("/test")}>⚡ Run New Test</button>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
