import React from "react";
import Logout from "../components/Auth/Logout";

const ParentDashboard: React.FC = () => {
  return (
    <div>
      <h2>Parent Dashboard</h2>
      <p>Welcome to the parent dashboard!</p>
      <Logout />
    </div>
  );
};

export default ParentDashboard;
