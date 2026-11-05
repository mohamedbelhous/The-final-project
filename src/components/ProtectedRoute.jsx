import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isAdminUser } from "../utils/auth";

// Component to protect private routes from unauthorized users
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged-in users who are not admins cannot open admin pages
  if (adminOnly && !isAdminUser(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
