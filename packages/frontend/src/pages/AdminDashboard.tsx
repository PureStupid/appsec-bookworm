import React from "react";
import Logout from "../components/Auth/Logout";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
      <Logout />
    </div>
  );
};

export default AdminDashboard;
