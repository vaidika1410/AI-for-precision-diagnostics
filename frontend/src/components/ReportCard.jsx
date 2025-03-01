import React from "react";

function ReportCard({ report }) {
  return (
    <div className="report-card">
      <p><strong>Date:</strong> {report.date}</p>
      <p><strong>Result:</strong> {report.result}</p>
      <p><strong>Doctor:</strong> {report.doctor}</p>
      <button className="delete-btn">🗑 Delete</button>
    </div>
  );
}

export default ReportCard;
