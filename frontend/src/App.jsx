import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages//LandingPage";  // Ensure this file exists
import Dashboard from "./components/Dashboard";
import LoginModal from "./components/LoginModal";
import TestPage from "./pages/TestPage"; 
// import TestPage from "./components/Test"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* Restore Landing Page */}
        <Route path="/login" element={<LoginModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
