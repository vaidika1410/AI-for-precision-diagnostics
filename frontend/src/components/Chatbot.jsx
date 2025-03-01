import React, { useState } from "react";
import "../styles/styles.css";

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showFAQ, setShowFAQ] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);
    const toggleFAQ = () => setShowFAQ(!showFAQ);

    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");

        // Simulating a chatbot response
        setTimeout(() => {
            setMessages((prev) => [...prev, { text: "I'm still learning! 😊", sender: "bot" }]);
        }, 1000);
    };

    return (
        <div>
            {/* Floating Chat Bubble */}
            <div className="chatbot-bubble" onClick={toggleChat}>💬</div>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>AI Assistant</h3>
                        <button className="close-btn-bot" onClick={toggleChat}>✖</button>
                    </div>

                    <div className="chatbot-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    {showFAQ && (
                        <div className="chatbot-faq">
                            <h2>👋🏻Hello! I'm FAQ bot</h2>
                            <h3>What brings you here today?</h3>
                            <ul>
                                <li><strong>Q. How does this app work without the internet?</strong>
                                    <br />●It stores key medical data locally and syncs when online.</li>
                                <li><strong>Q. What should I do if I get an error while testing?</strong>
                                    <br />●Ensure all required fields are filled correctly. If the issue persists, try again or contact support.</li>
                                <li><strong>Q. How do I perform the diabetes test?</strong>
                                    <br />●Simply click on 'Run New Test', follow the instructions, and upload any required data.
                                </li>
                                <li><strong>Q. Can I use the diabetes test feature offline?</strong>
                                    <br />●Yes, but results sync once online.</li>
                                <li><strong>Q. How do I update my medical reports offline?</strong>
                                    <br />●You can upload them, and they’ll be submitted when online.</li>
                            </ul>
                        </div>
                    )}

                    {/* Input Section */}
                    <div className="chatbot-footer">
                        <button className="faq-btn" onClick={toggleFAQ}>FAQs</button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button className="send-btn" onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
