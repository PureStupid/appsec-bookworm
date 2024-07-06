import React from "react";
import Logout from "../components/Auth/Logout";

const StudentDashboard: React.FC = () => {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome to the student dashboard!</p>
      <Logout />
    </div>
  );
};

export default StudentDashboard;
