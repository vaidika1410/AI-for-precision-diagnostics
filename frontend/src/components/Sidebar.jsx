import React, { useState } from "react";
import { FaBars, FaChartBar, FaFileAlt, FaCog } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <FaBars />
      </button>

      <ul className="menu">
        <li><FaChartBar /><span className={isCollapsed ? "hide" : ""}>Dashboard</span></li>
        <li><FaFileAlt /><span className={isCollapsed ? "hide" : ""}>Reports</span></li>
        <li><FaCog /><span className={isCollapsed ? "hide" : ""}>Settings</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;
