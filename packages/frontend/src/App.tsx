import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "./contexts/useAuth";
import FacultyDashboard from "./pages/FacultyDashboard";
import { UserRole } from "./types/user.role";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const auth = useAuth();
  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/student"
        element={
          auth.user?.role === UserRole.STUDENT ? (
            <StudentDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/faculty"
        element={
          auth.user?.role === UserRole.FACULTY ? (
            <FacultyDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/parent"
        element={
          auth.user?.role === UserRole.PARENT ? (
            <ParentDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin"
        element={
          auth.user?.role === UserRole.ADMIN ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
