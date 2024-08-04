import React from "react";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
