import React, { useState } from "react";
import "../styles/styles.css";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import Chatbot from "../components/Chatbot";

function LandingPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [language, setLanguage] = useState("English");

    // Toggle Dark/Light Mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("light-mode");
    };

    // Toggle Language
    const toggleLanguage = () => {
        setLanguage(language === "English" ? "हिन्दी" : "English");
    };

    return (
        <div className={`landing-container ${isDarkMode ? "dark" : "light"}`}>
            {/* Header Section */}
            <div className="top-bar">
                <button onClick={toggleTheme} className="toggle-btn">🌓</button>
                <button onClick={toggleLanguage} className="toggle-btn">{language}</button>
                <button onClick={() => setIsLoginOpen(true)} className="login-btn">Login</button>
                <button onClick={() => setIsSignupOpen(true)} className="signup-btn">Signup</button>
            </div>

            {/* Main Content */}
            <div className="content">
                <h1>AI Precision Diagnostics</h1>
                <p>
                    {language === "English"
                        ? "Diabetes is a growing concern, especially in rural areas where access to healthcare is limited. Early detection can help manage and prevent complications."
                        : "मधुमेह एक बढ़ती हुई समस्या है, विशेष रूप से ग्रामीण क्षेत्रों में जहां स्वास्थ्य सेवा की पहुंच सीमित है। जल्दी पता लगने से इसे नियंत्रित और रोका जा सकता है।"}
                </p>

                <img src="https://www.ainuindia.org/img/understanding-diabeties.jpg" alt="Diabetes Awareness" className="diabetes-image" />

                <div className="stats-box">
                    <h2>{language === "English" ? "India's Diabetes Statistics" : "भारत में मधुमेह के आंकड़े"}</h2>
                    <ul>
                        <li>77M+ people have diabetes in India.</li>
                        <li>50% of cases remain undiagnosed.</li>
                        <li>Lack of awareness leads to late diagnosis.</li>
                    </ul>
                </div>

                {/* Start Test Button Triggers Login Modal */}
                <button className="cta-button" onClick={() => setIsLoginOpen(true)}>
                    Start Your Diabetes Test
                </button>
            </div>

            {/* Floating Chatbot */}
            <div className="chatbot-bubble">💬</div>

            {/* Signup Modal */}
            {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}

            {/* Login Modal */}
            {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

            {/* Chatbot */}
            <Chatbot />
        </div>
    );
}

export default LandingPage;
