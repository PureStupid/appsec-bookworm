import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getValidUser, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/user.entity";

export interface AuthContextProps {
  user: UserData | null;
  authenticate: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const validUser = await getValidUser();
      setUser(validUser);
    };

    fetchUser();
  }, []);

  const authenticate = async () => {
    const user = await getValidUser();
    setUser(user);
    if (user.name !== "" && user.email !== "" && user.role !== "") {
      navigate(`/${user.role}`, { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const handleLogout = () => {
    logout();
    setUser({ name: "", email: "", role: "" } as UserData);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        authenticate: authenticate,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
