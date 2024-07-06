import React, { createContext, useState, ReactNode } from "react";
import { getCurrentUser, logout } from "../services/authService";
import { UserLoginBody, UserSignUpBody } from "../types/user.entity";
import { useNavigate } from "react-router-dom";

export interface AuthContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  authenticate: (user: UserLoginBody | UserSignUpBody) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  const authenticate = async (user: UserLoginBody | UserSignUpBody) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate(`/${user.role}`);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate: authenticate,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
