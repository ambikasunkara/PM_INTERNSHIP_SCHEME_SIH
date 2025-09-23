import React from "react";

const StudentDashboard = ({ student }) => {
  return (
    <div>
      <h2>Welcome, {student.fullName || "Student"}</h2>
      <p>Your matched internships will appear here.</p>
    </div>
  );
};

export default StudentDashboard;